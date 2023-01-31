<template>
  <div >
    <NotFound v-if="empty"></NotFound>
  <div v-if="!empty" id="postform">
   

    <p id="form-header">Update your Profile</p>
    <hr />




    <LoadingIcon :loading="loading" />
    <AlertMessage ref="alertcomp" variant="warning" :message="errormessage" @alertclose="alertclose"></AlertMessage>
    <div id="formbody" v-if="!loading">

      <b-form
        ref="form"
        @submit="onSubmit"
        enctype="multipart/form-data"
      >

        <InputField v-model="form.name" placeholder="Name" id="input-1"></InputField>
        <InputField v-model="form.username" placeholder="Username" id="input-2"></InputField>
        <FormSelect v-model="form.bio" placeholder="Bio" row="3"></FormSelect>



        
        <InputField v-model="form.university" placeholder="University" id="input-4"></InputField>
        <InputField v-model="form.yearofgraduation" placeholder="Year of Graduation" id="input-5"
        @blur="$v.form.yearofgraduation.$touch()"
        ></InputField>
        <p class="feedback" v-if="!$v.form.yearofgraduation.numeric">
              Please enter a valid year
            </p>  

         {{ title }}
        <b-form-file
          v-model="form.profileimage"
          ref="file"
          type="file"
          placeholder="Profile picture"
          drop-placeholder="Drop file here..."
          @input="imageSelected"
        ></b-form-file>


      
        <div class="mt-3 mb-3">
          Selected file: {{ form.profileimage ? form.profileimage.name : "" }}
        </div>

        <b-button variant="primary" type="submit" :disabled="$v.$invalid">Update</b-button>
      </b-form>
    </div>
  </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

import LoadingIcon from '../../Utils/Loading.vue'
import InputField from '../Input/InputText.vue' 
import FormSelect from  '../Input/TextArea.vue'
import {getUserProfile,EditProfile} from '@/services/user'
import { numeric } from "vuelidate/lib/validators";
import store from "@/store";



export default {
  name: "ProfileForm",
  components:{
    LoadingIcon,
    InputField,
    FormSelect
  },
  data() {
    return {
      form: {
        name: "",
        username: "",
        bio:"",
        university: "",
        yearofgraduation: "",
        profileimage:null,
      },
      options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: 'd', text: 'This one is disabled' }
        ],
      image: "",
      loading:false,
      error:false,
      errormessage:'',
      check:"",
      imagedeletion:false,
      empty:false

    };
  },
  validations:{
    form:{
      yearofgraduation:{
        numeric
      }
    }


  },
  props:['title'],
  methods: {
    imageSelected()
    {
      const image=this.$refs.file.files[0];
      let imageUrl=""
      if(image) imageUrl= URL.createObjectURL(image);
      if(image) eventBus.$emit("imagepreview",imageUrl)



    },
    showToast(msg)
      {
  
        this.errormessage=msg
        this.$refs.alertcomp.showAlert(msg);
      },
      alertclose(data)
      {
       if(data==0 && !this.error) this.$router.go(-1);
      },

    async onSubmit(event) {
      event.preventDefault();
  
      
 
      const userDetails = JSON.parse(JSON.stringify(this.form));
      if(this.$refs.file.files[0])
      {
       
      this.image = URL.createObjectURL(this.$refs.file.files[0]);
      userDetails.profileImage=this.image;
      }

      
     
    
      const fd = new FormData();



      const data = {
        name:this.form.name,
        username: this.form.username,
        college: this.form.collegename,
        university: this.form.university,
        yearofgraduation: this.form.yearofgraduation,
        bio:this.form.bio
      };
   

      Object.keys(data).forEach((key) =>{

   
       if(data[key]!=null && data[key]!=undefined) fd.append(key, data[key])
      }
      );


      if(this.form.profileimage) {
       
        fd.append("image", this.$refs.file.files[0], this.form.profileimage.name);
      }
       fd.append("imagedeletion",this.imagedeletion)


        try{
 
        const res=await EditProfile(this.$route.params.id,fd);
    
        if(res) {
          this.error=false
          this.showToast("Profile updated successfully")
          eventBus.$emit("profileUpdated", userDetails);
          store.commit("setUserName", data.username);
        }
        }
        
        catch(err)
        {
      
          const {message}=err.response.data;
          this.errormessage=message;
          this.error=true;

          this.showToast("Username already in use");
        }
    

     
    },

  },
  async created() {



    eventBus.$on("deleteProfileImage", () => {
    
    this.imagedeletion=true;

   })
   

  

    eventBus.$on("removeProfileImage", () => {
    
     if(this.$refs.file!=undefined) this.$refs.file.reset();

    })
    

    this.loading=true;



    let res= []
    try{
    res=await getUserProfile(this.$route.params.id)
    if(res)  eventBus.$emit("profileInfo",res)
    
          

        
          const { name, username, yearofgrad, university, college ,bio} =res.data.profile;
            Object.assign(this.form, {
            name,
            username,
            collegename: college,
            university,
            yearofgraduation: yearofgrad,
            bio
          });

          this.loading=false;
        }
        catch(err)
        {

          eventBus.$emit("notfound")
          this.empty=true;
          this.loading=false
         
        }

        
      
  },
};
</script>

<style>
  .feedback
{
  font-size: 0.8em;
  color: red;
  margin: 0;
  
}

#postform {
  margin-top: 20px;
}
#form-header {
  font-size: 1.2em;
  font-weight: 600;
}
form input {
  margin-bottom: 15px;
}

#formbody {
  background-color: white;
  padding: 30px;
  border-radius: 5px;
}

#formbody input:focus{
  

  outline: none!important;
  -webkit-box-shadow: none;
  box-shadow: none;

}
</style>
