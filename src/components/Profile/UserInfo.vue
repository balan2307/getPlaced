<!-- Profile Card which will be displayed in the right side of the homepage ,it will show user info -->
<template>
  <div id="userprofile">
    <div id="header">
      <LoadingIcon :loading="loading" />
    </div>
    <div id="info">
      <b-img
        class="profile-image"
        :src="profileImage"
        fluid
        alt="Profile Image"
      ></b-img>
      <box-icon
        v-if="show"
        @click="removeProf"
        id="removeprofile"
        type="solid"
        name="message-alt-x"
      ></box-icon>

    

      <div v-if="!loading" id="user-info-header">
        <div id="user-info">
          <h4 id="fullname">{{ fullname }}</h4>
          <h5 id="username">@{{ username }}</h5>
          <p id="user-bio">
            {{ bio }}
          </p>
          <!-- <hr /> -->
          <!-- <p class="info-label"  v-if="fullname"><span>Name: </span>{{ fullname }}</p>
          <p class="info-label" v-if="collegename"><span>College: </span>{{ collegename }}</p>
          <p class="info-label" v-if="university"><span>University: </span>{{ university }}</p>
          <p class="info-label" v-if="yearofgraduation">
            <span>Year of Graduation: </span>{{ yearofgraduation }}
          </p> -->
          <p id="joined-info">  <span class="mr-1"><box-icon id="calendar-icon" type='solid' name='calendar'></box-icon> </span>Joined {{ joined }}</p>
          <p  id="grad-info" >  <span class="mr-1"><box-icon id="graduate-icon" type='solid' name='graduation'></box-icon> </span>{{ university }} ,{{ yearofgraduation }} </p>
        </div>
      </div>
    </div>
    <hr id="divider" />

    <div id="postBtn">
      <b-button variant="outline-success" size="md">Follow</b-button>
      <b-button
        variant="outline-secondary"
        id="follow-btn"
        style="color: black"
        size="md"
      >
        <router-link :to="`/user/profile/${uid}/edit`">Update</router-link>
      </b-button>
   
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import LoadingIcon from "../Utils/Loading.vue";
import {deleteUserProfileImage} from '@/services/user'

import axios from "axios";
export default {
  name: "UserProfileCard",
  components: { LoadingIcon },
  data() {
    return {
      fullname: "",
      username: "",
      collegename: "",
      university: "",
      bio:"",
      yearofgraduation: "",
      profileImage: null,
      uid: this.$route.params.id,
      joined: "",
      loading: false,
      show: false,
      showupdatebtn: this.$router.currentRoute,
      default_image:
        "https://res.cloudinary.com/esakki/image/upload/v1672415855/getPlaced/no-image_cwaz3f.jpg",
    };
  },
  methods: {
    async removeProf() {
      eventBus.$emit("removeProfileImage");

      this.show = false;
      this.profileImage = this.default_image;

      console.log("Remove profs");
      // axios
      //   .post(`http://localhost:3000/user/deleteImage/${this.$route.params.id}`)
      //   .then(
      //     () => {
      //       this.error = "";
      //     },
      //     (err) => {
      //       console.log("error", err.response);
      //       this.error = err.response.data.error;
      //     }
      //   );

        await deleteUserProfileImage(this.$route.params.id);
    },
  },
  created() {
    // console.log("UID check",this.uid)
    console.log("User Info created", this.showupdatebtn);
    this.loading = true;

    
    axios
      .get(`http://localhost:3000/user/profile/${this.$route.params.id}`)
      .then(
        (res) => {
          console.log("Data received", res.data.profile);
          const {
            name,
            username,
            yearofgrad,
            university,
            college,
            profileImage,
            joined,
            bio
          } = res.data.profile;

          Object.assign(this, {
            fullname: name,
            username,
            collegename: college,
            university,
            yearofgraduation: yearofgrad,
            joined,
            bio,
            profileImage: profileImage ? profileImage.url : this.default_image,
          });
          console.log("User Info check 2", this.show, this.profileImage);
          this.loading = false;
          if (profileImage && profileImage.url) this.show = true;
        },
        (err) => {
          console.log("error", err.response);
          // this.error = err.response.data.error;
        }
      );

    eventBus.$on("profileUpdated", (data) => {
      // console.log("Data from Bus",data);
      // this.username=data.username;
      // this.fullname=data.name;
      // this.collegename=data.collegename;
      // this.university=data.university;
      // this.yearofgraduation=data.yearofgraduation;

      const {
        name,
        username,
        collegename,
        university,
        yearofgraduation,
        profileImage,
        bio
      } = data;
      Object.assign(this, {
        fullname: name,
        username,
        collegename,
        university,
        yearofgraduation,
        bio,
        profileImage: profileImage
          ? profileImage
          : !this.profileImage
          ? this.default_image
          : this.profileImage,
      });
      if (profileImage) this.show = true;
    });
  },
};
</script>

<style scoped>
#userprofile {
  /* border:1px solid #41ca25; */
  /* width: 50%; */
  /* height: 85vh; */

  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
}

.info-label span {
  font-weight: 500;
  color: #838383;
}

#joined-info ,#grad-info {
  color: #c53f00;
  font-size: 0.9em;
}

#removeprofile {
  color: white;
  position: relative;
  bottom: 98px;
  left: -15px;
}

#postBtn {
  /* border: 1px solid red; */
  height: 40%;
  /* display: flex;
    justify-content: center;
    align-items: center; */
  display: flex;
  justify-content: center;

  gap: 1em;
}

#postBtn .btn {
  border-radius: 1rem;
  width: 40%;
}

#postBtn .btn a {
  text-decoration: none;
  color: white;
}

#calendar-icon,#graduate-icon{
  position: relative;
  top: 5px;
}

#info {
  height: 60%;

  padding: 10px;
}

#info p span {
  /* font-weight: 400; */
}
/* #info p {
  font-size: 1rem;
} */

#divider {
  width: 90%;
  border: 1px solid #fafafa;
  border-top: 1px solid rgb(155 58 58 / 10%);

  position: relative;
  top: 35px;

  margin-top: 25px;
  margin-bottom: 25px;
}

#header {
  height:35%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  background-color: #33a8ff;
}

#user-info-header {
  position: relative;
  bottom: 60px;
  /* display: flex; */
  /* left: -40px; */
  justify-content: center;
  /* text-align: center; */
}

/* #user-info p {
  font-size: 1rem;
} */

#fullname {
  font-weight: 600;
  font-size: 20px;
  text-align: left;
}

#username {
  color: #979797;
  font-size: 1em;
}

#follow-btn a {
  color: black !important;
}

#follow-btn a:hover {
  color: rgb(247, 247, 247) !important;
}

.profile-image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 10px;
  left: 1%;
  bottom: 60px;
}

#user-bio
{
  font-size: 0.9em;
}

@media screen and (max-width: 1200px) {
  #userprofile {
    /* border: 1px solid red; */
    height: 85vh;
  }
  #user-info-header
  {
    left: 0px;
  }
}

@media only screen and (max-width: 1065px) {
  #postBtn .btn {
    font-size: 15px;
  }

 
}

/* @media only screen and (max-width: 1235px) {
  .profile-image {
    left: 1%;
  }
} */

@media only screen and (max-width: 900px) {
  /* #userprofile
 {s
   
     height: 59%;
 }
  */

  #userprofile {
    height: fit-content;
  }
}

@media only screen and (max-width: 1070px) {
  #postBtn {
    position: relative;
    top: 20px;
  }

  /* #user-info p {
    font-size: 1rem;
} */

  .profile-image {
    width: 100px;
    height: 100px;
    /* left: 31%; */
  }

  #userprofile {
    width: 40vh;
  }

  #rightsection {
    height: 90vh;
    border: 1px solid red;
  }

  #postBtn .btn {
    border-radius: 1rem;
    width: 40%;
  }

  #removeprofile {
    /* bottom: 90px; */
    left: -15px;
  }

  #divider {
    position: relative;
    top: 25px;
    margin-top: 15px;
  }

  /* #userprofile {
    border: 1px solid red;
  } */
}
</style>
