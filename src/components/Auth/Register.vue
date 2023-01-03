<template>
    <div>
    
    <b-form id="loginform" @submit="onSubmit">
      
      <b-input-group id="field1"  class="mb-2 ">
        <b-form-input v-model="user.email" id="inline-form-input-email" type="email" placeholder="Email id"></b-form-input>
      </b-input-group>

      <b-input-group id="field2"  class="mb-2 ">
        <b-form-input v-model="user.username" id="inline-form-input-username" type="text" placeholder="Username"></b-form-input>
      </b-input-group>
  
      <b-form-input
      id="field3"
        class="mb-2"
        type="password"
        placeholder="Password" v-model="user.password"
  
      ></b-form-input>
  
  
       <div id="loginbtn">
      <b-button type="submit" variant="primary">Register</b-button>
      </div>
    </b-form>
    <p>Already registered? <router-link to="/login">Login</router-link> </p>
    <p>{{ error }}</p>
  
    </div>
  </template>
  
  <script>
  // import axios from 'axios'
  import {registerUser} from '@/services/user'
  export default {
   name:'RegisterPage',
   data(){
    return {
      user:{
      email:'',
      username:'',
      password:''},
      error:''
    }
   },
   methods:{
    onSubmit(e)
    {
      e.preventDefault();
      const userCred=JSON.parse(JSON.stringify(this.user));
      registerUser(userCred,this.$router)

      // axios.post('http://localhost:3000/user/register',userCred).then(() => {
      //     this.error = '';
      //     this.$router.push('/login');
      //   }, err => {
      //     console.log("error",err.response)
      //     this.error = err.response.data.error
      //   })



  


      console.log("Register",userCred)

    }
   }
  }
  </script>
  
  <style>
  
  #loginform{
      padding: 15px;
  
      background-color: white;
      border-radius:10px;
  }
  
  #loginform input{
   
  }
  
  /* #field1{
      margin-bottom: 20px;
  } */
  
  #loginbtn
  {
      display: flex;
      justify-content: center;
  
  }
  
  </style>