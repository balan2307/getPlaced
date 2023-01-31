<template>
  <div class="prof-card-mob" id="userinfotab">
    <div class="profile-image-mob">
      <div id="image-section">
        <b-img
          class="profile-image"
          :src="showProfileImage"
          fluid
          alt="Profile Image"
        ></b-img>
      </div>



      <img src="@/assets/cancel.svg" alt="Icon"  v-if="show && sameUser"
        @click="removeProf"
        id="removeprofile" /> 


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

import { mapGetters } from "vuex";
import { eventBus } from "@/main";
export default {
  name: "UserInfoTab",
  data() {
    return {
      username: "",
      name: "",
      bio: "",
      profileImage: null,
      default_image:
        "https://res.cloudinary.com/esakki/image/upload/v1672415855/getPlaced/no-image_cwaz3f.jpg",
      paramsid: "",
      show: false,
      imageSelected:null,
    };
  },
  computed: {
    ...mapGetters(["getUid"]),

    sameUser() {

      return this.getUid == this.paramsid;
    },
    showProfileImage()
    {
      
    
      if(this.imageSelected) return this.imageSelected;
      else if(this.profileImage) return this.profileImage;
      else return this.default_image;

    }
  },
  methods: {
    removeProf() {

      eventBus.$emit("removeProfileImage");


      if(this.imageSelected) {
        this.imageSelected='';

        eventBus.$emit("removeImageSelected2")
      }
      else if(this.profileImage) {
        this.profileImage=''
        eventBus.$emit("removeProfileImage2")
       
      }

      if(!this.profileImage && !this.imageSelected) {
       
  
       this.show = false;
       eventBus.$emit("deleteProfileImage")
     }
  
    },
    
  },
  async created() {
  
    const id = this.$route.params.id;
    this.paramsid = id;
    let res =''

    eventBus.$on("profileInfo",(data)=>{

    
      res=data;
      const { profile } = res.data;
     this.username = profile.username;
     this.name = profile.name;
    this.bio = profile.bio;
    if (profile.profileImage) this.profileImage = profile.profileImage.url;
    else this.profileImage = null;
    if (this.profileImage && this.$route.name == "UserProfileEdit") this.show = true;

    })
   




    eventBus.$on("profileUpdated", (data) => {
      const {
        name,
        username,
        profileImage,
        bio,
      } = data;
      Object.assign(this, {
        name: name,
        username,
        bio,
        profileImage: profileImage
          ? profileImage
          : !this.profileImage
          ? null
          : this.profileImage
      });
  
      if (profileImage) this.show = true;
    });

    eventBus.$on('removeImageSelected1',()=>{
      this.imageSelected=null;
      if(this.profileImage!=null){
   
       this.show=true;
      }
      else this.show=false;
    })

    eventBus.$on('removeProfileImage1',()=>{
      this.profileImage=null;
      this.show=false;
    })



    eventBus.$on("imagepreview", (data) => {
      this.imageSelected=data;
      this.show=true;


    })



  },
};
</script>

<style scoped>
@import url("@/../public/stylesheets/userinfotab.css");
</style>
