<template>
  <div id="postform">
    <p id="form-header">Update your Profile</p>
    <hr />
    <LoadingIcon :loading="loading" />
    <div id="formbody" v-if="!loading">
      <b-form
        ref="form"
        @submit="onSubmit"
        @reset="onReset"
        enctype="multipart/form-data"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Your name"
        
        ></b-form-input>

        <b-form-input
          id="input-2"
          v-model="form.username"
          type="text"
          placeholder="Username"

        ></b-form-input>

        <b-form-input
          id="input-3"
          v-model="form.collegename"
          type="text"
          placeholder="College Name"
    
        ></b-form-input>

        <b-form-input
          id="input-4"
          v-model="form.university"
          type="text"
          placeholder="University"
   
        ></b-form-input>

        <b-form-input
          id="input-5"
          v-model="form.yearofgraduation"
          type="text"
          placeholder="Year of graduation"
    
        ></b-form-input>

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

        <b-button variant="primary" type="submit">Update</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import axios from "axios";
import LoadingIcon from '../../Helper/Loading.vue'

export default {
  name: "PostForm",
  components:{
    LoadingIcon
  },
  data() {
    return {
      form: {
        name: "",
        username: "",
        collegename: "",
        university: "",
        yearofgraduation: "",
        profileimage:null,
      },
      image: "",
      loading:false,
      error:false
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      console.log("CHECCK 1")

      console.log("PRof submit",this.form)
      const userDetails = JSON.parse(JSON.stringify(this.form));
      if(this.$refs.file.files[0])
      {
      this.image = URL.createObjectURL(this.$refs.file.files[0]);
      userDetails.profileImage=this.image;
      }

      console.log("CHECCK 2")
      
      eventBus.$emit("profileUpdated", userDetails);
    

      console.log("form det",this.image);

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
      };
      console.log("Post data",data)

      Object.keys(data).forEach((key) =>{

       console.log("loop check",data[key])
       if(data[key]!=null && data[key]!=undefined) fd.append(key, data[key])
      }
      );


      if(this.form.profileimage) fd.append("image", this.$refs.file.files[0], this.form.profileimage.name);

      axios
        .post(`http://localhost:3000/user/profile/${this.$route.params.id}`, fd)
        .then(
          () => {
            this.error = "";
          },
          (err) => {
            console.log("error", err.response);
            this.error = err.response.data.error;
          }
        );

      console.log("Profile form");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  created() {

    this.loading=true;
    axios
      .get(`http://localhost:3000/user/profile/${this.$route.params.id}`)
      .then(
        (res) => {
          console.log("Data received", res.data.profile);
          const { name, username, yearofgrad, university, college } =
            res.data.profile;
            console.log("Profile check",res.data.profile)
          Object.assign(this.form, {
            name,
            username,
            collegename: college,
            university,
            yearofgraduation: yearofgrad,
          });

          this.loading=false;
        },
        (err) => {
          console.log("error", err.response);
          this.error = err.response.data.error;
        }
      );
  },
};
</script>

<style>
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
