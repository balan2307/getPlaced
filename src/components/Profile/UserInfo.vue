<!-- Profile Card which will be displayed in the right side of the homepage ,it will show user info -->
<template>
  <div id="userprofile">
    <div id="header">
      <LoadingIcon :loading="loading" />
    </div>
    <div id="info">
      <b-img
        class="profile-image"
        :src="showProfileImage"
        fluid
        alt="Profile Image"
      ></b-img>
      <box-icon
        v-if="show && sameUser"
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

          <p id="joined-info">
            <span class="mr-1"
              ><box-icon
                id="calendar-icon"
                type="solid"
                name="calendar"
              ></box-icon> </span
            >Joined {{ joined }}
          </p>
          
          <p id="grad-info" v-if="university || yearofgraduation">
            <span class="mr-1"
             
              ><box-icon
                id="graduate-icon"
                type="solid"
                name="graduation"
              ></box-icon>
            </span>
            <span>{{ university ,}}</span> {{ yearofgraduation }}
          </p>
        </div>
      </div>
    </div>
    <hr id="divider" />

    <div id="postBtn">
      
      <!-- <b-button v-if="!sameUser" variant="outline-success" size="md">Follow</b-button> -->
      <b-button
        
        variant="outline-secondary"
        id="update-btn"
        style="color: black"
        size="md"
        v-if="sameUser && this.$route.name!='UserProfileEdit'"

      >
        <router-link  :to="`/user/profile/${uid}/edit`">Update</router-link>
      </b-button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
// deleteUserProfileImage
import { getUserProfile } from "@/services/user";
import {mapGetters} from 'vuex'


// import axios from "axios";
export default {
  name: "UserProfileCard",
  data() {
    return {
      fullname: "",
      username: "",
      collegename: "",
      university: "",
      bio: "",
      yearofgraduation: "",
      profileImage: null,
      uid: this.$route.params.id,
      joined: "",
      loading: false,
      show: false,
      showupdatebtn: this.$router.currentRoute,
      imageSelected:null,
      default_image:
        "https://res.cloudinary.com/esakki/image/upload/v1672415855/getPlaced/no-image_cwaz3f.jpg",
    };
  },
  methods: {
     removeProf() {
      eventBus.$emit("removeProfileImage");

   
      // this.profileImage = this.default_image;
      if(this.imageSelected) {
        this.imageSelected='';
        console.log("remove image selected")
        eventBus.$emit("removeImageSelected1")
        // if(this.profileImage==null) thi 
    
      }
      else if(this.profileImage) {
        this.profileImage=''
        console.log("profile image removed")
        eventBus.$emit("removeProfileImage1")
      }

      if(!this.profileImage && !this.imageSelected) {
       
        console.log("all false")
       this.show = false;
       eventBus.$emit("deleteProfileImage")
     }
     console.log("check image",this.profileImage,"check",this.imageSelected)



      // await deleteUserProfileImage(this.$route.params.id);
    },
 
    async getProfile(id) {
      this.loading = true;
  const res = await getUserProfile(id);
  // console.log("response from backend",res)
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
  // console.log("DATA profile",res.data.profile)

 
  Object.assign(this, {
    fullname: name,
    username,
    collegename: college,
    university,
    yearofgraduation: yearofgrad,
    joined,
    bio,
    profileImage: profileImage ? profileImage.url : null
  });
  this.loading = false;
  //to show remove profile pic icon
  if (profileImage && profileImage.url && this.$route.name=='UserProfileEdit') this.show = true;
}


  },
  computed:{
      ...mapGetters(['getUid']),

      showProfileImage()
    {
      
      if(this.imageSelected) return this.imageSelected;
      else if(this.profileImage) return this.profileImage;
      else return this.default_image;

    },

      sameUser()
      {
   
        return this.getUid==this.uid
      }
    },
  async created() {
  
    // console.log("User Info created", this.showupdatebtn);
    
   

 

    if (this.$route.matched[0].path == "/post/:id") {
      eventBus.$on("getProfileid", async (id) => {
        //to show the profile info in the details page of the post
        // console.log("If Profile")
    
        this.getProfile(id);
      });
    } else {
      //to show the profile info in the profile page of the user
      // console.log("Else Profile")

      this.getProfile(this.$route.params.id);
    }

    eventBus.$on("imagepreview", (data) => {
      // console.log("image bus",data)
      this.imageSelected=data;
      this.show=true;


    })

    eventBus.$on('removeImageSelected2',()=>{
      this.imageSelected=null;
      if(this.profileImage!=null){
        // console.log("check image",this.profileImage)
       this.show=true;
      }
      else this.show=false;
    })

    eventBus.$on('removeProfileImage2',()=>{
      this.profileImage=null;
      this.show=false;
    })



    eventBus.$on("profileUpdated", (data) => {


      const {
        name,
        username,
        collegename,
        university,
        yearofgraduation,
        profileImage,
        bio,
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
          : (!this.profileImage ? null : this.profileImage )
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

  /* width: 70%; */
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;

  position: fixed;
  width: 20%;
  top: 1;
  height: inherit;
  /* height: 70%; */
}

.info-label span {
  font-weight: 500;
  color: #838383;
}

#joined-info,
#grad-info {
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

#calendar-icon,
#graduate-icon {
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
  height: 35%;
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

#update-btn a {
  color: black !important;
}

#update-btn a:hover {
  color: rgb(247, 247, 247) !important;
}

#update-btn:hover{
  background-color: #838383;

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

#user-bio {
  font-size: 0.9em;
}

@media screen and (max-width: 1200px) {
  #userprofile {
    /* border: 1px solid red; */
    /* height: 85vh; */
  }
  #user-info-header {
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

#removeprofile {
    /* bottom: 90px; */
    left: -15px;

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
  }

  #postBtn .btn {
    border-radius: 1rem;
    width: 40%;
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
