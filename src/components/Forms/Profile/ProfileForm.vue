<template>
  <div id="postform">
   

    <p id="form-header">Update your Profile</p>
    <hr />
    <LoadingIcon :loading="loading" />
    <AlertMessage ref="alertcomp" variant="warning" :message="errormessage"></AlertMessage>
    <div id="formbody" v-if="!loading">

      <b-form
        ref="form"
        @submit="onSubmit"
        enctype="multipart/form-data"
      >
        <!-- <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Your name"
        
        ></b-form-input> -->

        <InputField v-model="form.name" placeholder="Name" id="input-1"></InputField>
        <InputField v-model="form.username" placeholder="Username" id="input-2"></InputField>
        <FormSelect v-model="form.bio" placeholder="Bio" row="3"></FormSelect>
        <!-- <InputField v-model="form.collegename" placeholder="College name" id="input-3"></InputField> -->
        <InputField v-model="form.university" placeholder="University" id="input-4"></InputField>
        <InputField v-model="form.yearofgraduation" placeholder="Year of Graduation" id="input-5"
        @blur="$v.form.yearofgraduation.$touch()"
        ></InputField>
        <p class="feedback" v-if="!$v.form.yearofgraduation.numeric">
              Please enter a valid year
            </p>  
        <!-- <p>{{ $v.$invalid }}</p> -->
        <!-- <FormSelect :options="options" v-model="check"></FormSelect> -->

        <b-form-file
          v-model="form.profileimage"
          ref="file"
          type="file"
          placeholder="Profile picture"
          drop-placeholder="Drop file here..."
        ></b-form-file>

        <!-- <input type="file" ref="file" style="display:none" />  -->
        <!-- <b-button @click="$refs.file.click()"> Click </b-button> -->
      
        <div class="mt-3 mb-3">
          Selected file: {{ form.profileimage ? form.profileimage.name : "" }}
        </div>

        <b-button variant="primary" type="submit" :disabled="$v.$invalid">Update</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
// import axios from "axios";
import LoadingIcon from '../../Utils/Loading.vue'
import InputField from '../Input/InputText.vue' 
import FormSelect from  '../Input/TextArea.vue'
import {getUserProfile,EditProfile} from '@/services/user'
import { numeric } from "vuelidate/lib/validators";
// import FormSelect from '../Input/SelectText.vue'

export default {
  name: "PostForm",
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

    };
  },
  validations:{
    form:{
      yearofgraduation:{
        numeric
      }
    }


  },
  methods: {
    showToast()
      {
  
        this.errormessage="Username already in use"
        this.$refs.alertcomp.showAlert();
      },
    async onSubmit(event) {
      event.preventDefault();
      // console.log("Check ",this.check )
      
 
      const userDetails = JSON.parse(JSON.stringify(this.form));
      if(this.$refs.file.files[0])
      {
      this.image = URL.createObjectURL(this.$refs.file.files[0]);
      userDetails.profileImage=this.image;
      }

      
      eventBus.$emit("profileUpdated", userDetails);
    

      // console.log("form det",this.image);

      const fd = new FormData();

      // fd.append('name',this.form['name'])
      // fd.append('username',this.form['username'])
      // fd.append('college',this.form['college'])
      // fd.append('university',this.form['university'])
      // fd.append('yearofgraduation',this.form['yearofgraduation'])

      //understand it

      const data = {
        name:this.form.name,
        username: this.form.username,
        college: this.form.collegename,
        university: this.form.university,
        yearofgraduation: this.form.yearofgraduation,
        bio:this.form.bio
      };
      // console.log("Post data",data,typeof(data))

      Object.keys(data).forEach((key) =>{

      //  console.log("loop check",data[key])
       if(data[key]!=null && data[key]!=undefined) fd.append(key, data[key])
      }
      );


      if(this.form.profileimage) fd.append("image", this.$refs.file.files[0], this.form.profileimage.name);


        try{
          console.log("inside try block of edit ")
        const res=await EditProfile(this.$route.params.id,fd);
        console.log("response after editing",res)
        }
        catch(err)
        {
          console.log("error in editing",err)
          const {message}=err.response.data;
          this.errormessage=message;
          this.error=true;

          this.showToast();
        }
        finally{
        
          console.log("finally")
          
        }

      console.log("Profile form");
    },

  },
  async created() {


  

    eventBus.$on("removeProfileImage", () => {
      // console.log("Profile removal req",this.$refs.file)
      this.$refs.file.reset();

    })
    // console.log("check form",this.check)

    this.loading=true;


    const res= await getUserProfile(this.$route.params.id)
          
          const { name, username, yearofgrad, university, college ,bio} =res.data.profile;
            // console.log("Profile check",res.data.profile)
            Object.assign(this.form, {
            name,
            username,
            collegename: college,
            university,
            yearofgraduation: yearofgrad,
            bio
          });

          this.loading=false;

        
      
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
  
  /* border: none!important; */
  /* border-color: rgb(31, 32, 32); */
  outline: none!important;
  -webkit-box-shadow: none;
  box-shadow: none;
  /* border:1px solid red */
}
</style>
