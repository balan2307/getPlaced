<!-- Profile Card which will be displayed in the right side of the homepage ,it will show user info -->
<template>
  <div v-if="!empty" id="userprofile">
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

      <img
        src="@/assets/cancel.svg"
        alt="Icon"
        v-if="show && sameUser"
        @click="removeProf"
        id="removeprofile"
      />

      <div v-if="!loading" id="user-info-header">
        <div id="user-info">
          <h4 id="fullname">{{ fullname }}</h4>
          <h5 id="username">@{{ username }}</h5>
          <p id="user-bio">
            {{ bio }}
          </p>

          <p id="joined-info">
            <span class="mr-1">
              <font-awesome-icon
                :icon="['fas', 'calendar-days']"
                id="calendar-icon"
              /> </span
            >Joined {{ joined }}
          </p>

          <p id="grad-info" v-if="university || yearofgraduation">
            <span class="mr-1">
              <font-awesome-icon
                :icon="['fas', 'graduation-cap']"
                id="graduation-cap"
              />
            </span>
            <span>{{ university ,}}</span> {{ yearofgraduation }}
          </p>
        </div>
      </div>
    </div>
    <hr id="divider" />

    <div id="postBtn">
      <b-button
        variant="outline-secondary"
        id="update-btn"
        style="color: black"
        size="md"
        v-if="sameUser && this.$route.name != 'UserProfileEdit'"
      >
        <router-link :to="`/user/profile/${uid}/edit`">Update</router-link>
      </b-button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

import { getUserProfile } from "@/services/user";
import { mapGetters } from "vuex";

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
      imageSelected: null,
      empty: false,
      default_image:
        "https://res.cloudinary.com/esakki/image/upload/v1672415855/getPlaced/no-image_cwaz3f.jpg",
    };
  },
  methods: {
    removeProf() {
      eventBus.$emit("removeProfileImage");

      if (this.imageSelected) {
        this.imageSelected = "";
        console.log("remove image selected");
        eventBus.$emit("removeImageSelected1");
      } else if (this.profileImage) {
        this.profileImage = "";
        console.log("profile image removed");
        eventBus.$emit("removeProfileImage1");
      }

      if (!this.profileImage && !this.imageSelected) {
        console.log("all false");
        this.show = false;
        eventBus.$emit("deleteProfileImage");
      }
      console.log(
        "check image",
        this.profileImage,
        "check",
        this.imageSelected
      );
    },

    async getProfile(id) {
      this.loading = true;
      let res = {};
      try {
        res = await getUserProfile(id);
        if (res) eventBus.$emit("profileInfo", res);

        const {
          name,
          username,
          yearofgrad,
          university,
          college,
          profileImage,
          joined,
          bio,
        } = res.data.profile;

        Object.assign(this, {
          fullname: name,
          username,
          collegename: college,
          university,
          yearofgraduation: yearofgrad,
          joined,
          bio,
          profileImage: profileImage ? profileImage.url : null,
        });

        this.loading = false;
        if (
          profileImage &&
          profileImage.url &&
          this.$route.name == "UserProfileEdit"
        )
          this.show = true;
      } catch (err) {
        this.empty = true;
        this.loading = false;
      }
    },

    async updateProfile(res) {
      const {
        name,
        username,
        yearofgrad,
        university,
        college,
        profileImage,
        joined,
        bio,
      } = res.data.profile;

      Object.assign(this, {
        fullname: name,
        username,
        collegename: college,
        university,
        yearofgraduation: yearofgrad,
        joined,
        bio,
        profileImage: profileImage ? profileImage.url : null,
      });

      this.loading = false;
      if (
        profileImage &&
        profileImage.url &&
        this.$route.name == "UserProfileEdit"
      )
        this.show = true;
    },
  },
  computed: {
    ...mapGetters(["getUid"]),

    showProfileImage() {
      console.log("check prof userinfo",this.profileImage)
      if (this.imageSelected) return this.imageSelected;
      else if (this.profileImage) return this.profileImage;
      else return this.default_image;
    },

    sameUser() {
      return this.getUid == this.uid;
    },
  },
  async created() {
    if (this.$route.matched[0].path == "/post/:id") {
      eventBus.$on("getProfileid", async (id) => {
        //to show the profile info in the details page of the post
    

        this.getProfile(id);
      });
    } else {
      //to show the profile info in the profile page of the user
      // console.log("Else Profile")

      //if it is a profile page then only fetch the profile otherwise u will get from the bus
      if (this.$route.matched[0].path == "/user/profile/:id")
        this.getProfile(this.$route.params.id);
    }

    eventBus.$on("notfound", () => {
      this.empty = true;
    });

    eventBus.$on("imagepreview", (data) => {
      this.imageSelected = data;
      this.show = true;
    });

    eventBus.$on("profileInfo", (data) => {
      this.updateProfile(data);
    });

    eventBus.$on("removeImageSelected2", () => {
      this.imageSelected = null;
      if (this.profileImage != null) {
        this.show = true;
      } else this.show = false;
    });

    eventBus.$on("removeProfileImage2", () => {
      this.profileImage = null;
      this.show = false;
    });

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
          : !this.profileImage
          ? null
          : this.profileImage,
      });
      if (profileImage) this.show = true;
    });
  },
};
</script>

<style scoped>
/* @import url("@/../public/stylesheets/userInfo.css"); */

#userprofile {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;

  position: fixed;
  width: 20%;
  top: 1;
  height: inherit;
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
  height: 40%;

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

#graduation-cap,
#calendar-icon {
  color: black;
  padding-right: 5px;
}

#info {
  height: 60%;

  padding: 10px;
}

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

  justify-content: center;
}

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

#update-btn:hover {
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

#postBtn{
  display: flex;
    align-items: center;
}

@media screen and (max-width: 1200px) {
  #user-info-header {
    left: 0px;
  }
}

@media only screen and (max-width: 1065px) {
  #postBtn .btn {
    font-size: 15px;
  }
}

@media only screen and (max-width: 900px) {
  #userprofile {
    height: fit-content;
  }
}

#removeprofile {
  left: -15px;
  height: 20px;
}

@media only screen and (max-width: 1070px) {
  #postBtn {
    position: relative;
  }

  .profile-image {
    width: 100px;
    height: 100px;
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
}
</style>
