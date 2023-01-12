<template>
  <div class="prof-card-mob" id="userinfotab">
    <div class="profile-image-mob">
      <b-img
        class="profile-image"
        :src="profimage"
        fluid
        alt="Profile Image"
      ></b-img>
    </div>
    <div class="user-info-mob">
      <h5 id="fullname" v-if="name != undefined">{{ name }}</h5>
      <h5 id="username" v-if="username != undefined">@ {{ username }}</h5>
      <p id="bio" v-if="bio != undefined">
        {{ bio }}
      </p>
    </div>
    <div class="btn-section">
      <b-button
        variant="outline-secondary"
        id="update-btn"
        style="color: black"
        size="md"
        v-if="sameUser && this.$route.name != 'UserProfileEdit'"
      >
        <router-link :to="`/user/profile/${paramsid}/edit`">Update</router-link>
      </b-button>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from "@/services/user";
import {mapGetters} from 'vuex'
export default {
  name: "UserInfoTab",
  data() {
    return {
      username: "",
      name: "",
      bio: "",
      profimage: "",
      default_image:
        "https://res.cloudinary.com/esakki/image/upload/v1672415855/getPlaced/no-image_cwaz3f.jpg",
      paramsid:""
    };
  },
  computed: {
    ...mapGetters(["getUid"]),

    sameUser() {
      // console.log("check user")
      return this.getUid == this.paramsid;
    },
  },
  async created() {



    console.log("Route check",this.$route)
    const id = this.$route.params.id;
    this.paramsid=id;
    const res = await getUserProfile(id);
    const { profile } = res.data;
    this.username = profile.username;
    this.name = profile.name;
    this.bio = profile.bio;
    if (profile.profileImage) this.profimage = profile.profileImage.url;
    else this.profimage = this.default_image;
    console.log("PRofile", profile);
  },
};
</script>

<style>
.profile-image {
  width: 80px;
  height: 80px;
}

.prof-card-mob {
  display: flex;
  row-gap: 2px;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 5px;
}

.user-info-mob {
  flex-grow: 0.7;
  padding: 10px;

  border-left: 1px solid #f7ebeb;
}
#username {
  font-size: 0.9em;
}

.btn-section{

  display: flex;
  justify-content: center;
  align-items: center;
}

#update-btn a{
  text-decoration: none ;
  color: black;
}

#update-btn{
  border-radius: 1rem;
}

#update-btn :hover{
  color: rgb(247, 247, 247) !important;
}

.profile-image-mob {
  padding: 10px;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bio {
  font-size: 0.9em;
}
#userinfotab {
  display: none;
}

#username {
  color: #b5bcc3;
}

@media only screen and (max-width: 900px) {
  #userinfotab {
    display: flex;
  }
}

@media only screen and (max-width: 480px) {
  .profile-image-mob {
    width: 30%;
  }
}
</style>
