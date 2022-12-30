<!-- Profile Card which will be displayed in the right side of the homepage ,it will show user info -->
<template>
     <div id="userprofile">
        <div id="header">
            <LoadingIcon :loading="loading"/>

        </div>
        <div id="info">
            <b-img   class="profile-image" :src="profileImage" fluid alt="Profile Image"></b-img>
            <!-- <box-icon  @click="removeProf" id="removeprofile" type='solid' name='message-alt-x'></box-icon> -->
            <div v-if="!loading" id="user-info-header">
                <div id="user-info">
            <h4 id="username">{{ username }}</h4>
            <hr>
            <p v-if="fullname"> <span>Name: </span>{{ fullname }} </p>
            <p v-if="collegename"> <span>College: </span>{{ collegename }} </p>
            <p v-if="university"><span>University: </span>{{  university }}</p>
            <p v-if="yearofgraduation"><span>Year of Graduation: </span>{{ yearofgraduation }}</p>
            <p><span>Joined on </span>{{ joined }} </p>
            </div>

            </div>

        </div>
        <hr id="divider">
      

        <div id="postBtn">
            <b-button variant="outline-success"  size="md">Follow</b-button>
            <b-button variant="outline-secondary" id="follow-btn" style="color:black" size="md"> <router-link :to="`/user/profile/${uid}/edit`" >Update</router-link> </b-button>
        </div>
      
    </div>
  
</template>

<script>
import { eventBus } from '@/main'
import LoadingIcon from '../Helper/Loading.vue'

import axios from 'axios'
export default {
    name:'UserProfileCard',
    components:{LoadingIcon},
    data()
    {
        return{
            fullname:'',
            username:'',
            collegename:'',
            university:'',
            yearofgraduation:'',
            profileImage:null,
            uid:this.$route.params.id,
            joined:'',
            loading:false
        }

    },
    methods:
    {
        removeProf()
        {

            console.log("Remove profs")
        }


    },
    created()
    {
        // console.log("UID check",this.uid)
        console.log("User Info created")
        this.loading=true;
        axios.get(`http://localhost:3000/user/profile/${this.$route.params.id}`).then((res) => {
            
          console.log("Data received",res.data.profile)
          const{name,username,yearofgrad,university,college,profileImage,joined}=res.data.profile;
          Object.assign(this, {fullname:name,username, collegename:college, university, yearofgraduation:yearofgrad,joined,
            profileImage:profileImage ? profileImage.url : 'https://res.cloudinary.com/esakki/image/upload/v1672306019/getPlaced/no-image_zlgu0l.jpg'});
         
            this.loading=false;

        }, err => {
          console.log("error",err.response)
          this.error = err.response.data.error
        })

        eventBus.$on("profileUpdated",(data)=>{
            // console.log("Data from Bus",data);
            // this.username=data.username;
            // this.fullname=data.name;
            // this.collegename=data.collegename;
            // this.university=data.university;
            // this.yearofgraduation=data.yearofgraduation;
            

            const {name, username,collegename, university, yearofgraduation,profileImage} = data;
            Object.assign(this, {fullname:name,username, collegename, university, yearofgraduation,
            profileImage:profileImage ? profileImage : (!this.profileImage ? 'https://res.cloudinary.com/esakki/image/upload/v1672306019/getPlaced/no-image_zlgu0l.jpg' : this.profileImage)});


        })


  
  
    }

}
</script>

<style>


#userprofile
{
  /* border:1px solid #41ca25; */
  /* width: 50%; */
  height: 90%;
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color:white;
  border-radius: 5px;
}

#removeprofile
{

    color: white;
    position: relative;
    bottom: 100px;
    left: 60px;
}

#postBtn
{
    /* border: 1px solid red; */
    height: 40%;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    display: flex;
    justify-content: center;
  
    gap: 1em;
}


#postBtn .btn
{

    border-radius: 1rem;
    width: 40%;
}


#postBtn .btn a
{

    text-decoration: none;
    color: white;
}

#info
{
    height: 60%;

    padding: 10px;
}

#info p span
{
    font-weight: 400;
}
#info p{
    font-size: 1rem
};

#divider
{
    width: 90%;
    border: 1px solid #ddd3d3;
    border-top: 1px solid rgb(155 58 58 / 10%);
}

#header
{
    height: 25%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    background-color: #33a8ff;
}

#user-info-header
{
    position: relative;
    bottom: 60px;
    display: flex;
    justify-content: center;
    /* text-align: center; */
}

#user-info p{
    font-size: 1.1rem;
}

#username
{
    font-weight:600;
    font-size: 20px;
    text-align: center;
}

#follow-btn a
{
    color: black!important;
}

#follow-btn a:hover
{
    color: rgb(247, 247, 247)!important;
}

.profile-image
{
    border-radius: 50%;
    width: 130px;
    height: 130px;
    position: relative;
    margin-bottom: 10px;
    left: 29%;
    bottom: 60px;
}

@media only screen and (max-width: 1065px) {
 
    #postBtn .btn
{

    font-size: 15px;
}



}


@media only screen and (max-width: 1235px) {
 
.profile-image
{
    left: 24%;
}


}

@media only screen and (max-width: 900px) {
 
 /* #userprofile
 {s
   
     height: 59%;
 }
  */

  #userprofile
  {
    height: fit-content
  }


 
 }

 @media only screen and (max-width:1070px)
 {
  #postBtn
  {
    position: relative;
    top: 20px;
  }

  #user-info p {
    font-size: 1rem;
}

.profile-image
 {
    width: 100px;
    height: 100px;
    left: 31%;
 }

 #userprofile
 {

    width: 90%;
 }

 #rightsection{
    height: 90vh;
 }
 }



</style>