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
        <h5 id="fullname" v-if="name!=undefined">{{ name }}</h5>
        <h5 id="username"  v-if="username!=undefined">@ {{ username }}</h5>
        <p id="bio" v-if="bio!=undefined ">
            {{ bio }}
          
        </p>
      </div>
    </div>
  
</template>

<script>
import {getUserProfile } from "@/services/user";
export default {
    name:"UserInfoTab",
    data()
    {
        return{
            username:'',
            name:'',
            bio:'',
            profimage:'',
            default_image:"https://res.cloudinary.com/esakki/image/upload/v1672415855/getPlaced/no-image_cwaz3f.jpg"

        }
    },
    async created()
  {
    const id=this.$route.params.id;
    const res = await getUserProfile(id);
    const {profile}=res.data;
    this.username=profile.username;
    this.name=profile.name;
    this.bio=profile.bio;
   if(profile.profileImage) this.profimage=profile.profileImage.url
   else this.profimage=this.default_image
    console.log("PRofile",profile)
  }

}
</script>

<style>
.profile-image {
  width: 70px;
  height: 70px;
}

.prof-card-mob {
  display: flex;
  row-gap: 2px;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 5px;
}

.user-info-mob {
  flex-grow: 1;
  padding: 10px;

  border-left: 1px solid #f7ebeb;;
}
#username {
  font-size: 0.9em;
}

.profile-image-mob {
  padding: 10px;
  width: 15%;
  display: flex;
    justify-content: center;
    align-items: center;
}

#bio{
  font-size: 0.9em;
}
#userinfotab{
    display: none;
}

#username{
    color: #b5bcc3;;
}

@media only screen and (max-width: 900px) {
  #userinfotab{
    display: flex;
 
  }
}

@media only screen and (max-width: 480px) {
 
.profile-image-mob {
  
  width: 30%;
}
}

</style>