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
// import { getUserProfile } from "@/services/user";
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
      // console.log("check user")
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
       
        console.log("all false")
       this.show = false;
       eventBus.$emit("deleteProfileImage")
     }
     console.log("check image",this.profileImage,"check",this.imageSelected)
    },
    
  },
  async created() {
    // console.log("Route check", this.$route);
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
          : null
      });
      if (profileImage) this.show = true;
    });

    eventBus.$on('removeImageSelected1',()=>{
      this.imageSelected=null;
      if(this.profileImage!=null){
        console.log("check image",this.profileImage)
       this.show=true;
      }
      else this.show=false;
    })

    eventBus.$on('removeProfileImage1',()=>{
      this.profileImage=null;
      this.show=false;
    })



    eventBus.$on("imagepreview", (data) => {
      // console.log("image bus",data)
      this.imageSelected=data;
      this.show=true;


    })



  },
};
</script>

<style scoped>
.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
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

#removeprofile {
  bottom: 35px;
  position: relative;
  height: 20px;
}

.btn-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

#update-btn a {
  text-decoration: none;
  color: black;
}

#update-btn {
  border-radius: 1rem;
}

#update-btn :hover {
  color: rgb(247, 247, 247) !important;
}

.profile-image-mob {
  /* padding: 10px; */
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

#image-section{
  padding-left: 5px;
}

@media only screen and (max-width: 900px) {
  #userinfotab {
    display: flex;
  }
}

@media only screen and (max-width: 680px) {
  .profile-image-mob {
    width: 30%;
  }
}
</style>
