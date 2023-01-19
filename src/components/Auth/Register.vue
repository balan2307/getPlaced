<template>
   <div>
    <!-- <errorMessage :error="error" :errormessage="errormessage"></errorMessage> -->
    <AlertMessage ref="alertcomp" variant="warning" :message="errormessage"></AlertMessage>

  <div id="formbody">
    <b-form  id="loginform" @submit="onSubmit" novalidate>
      <b-input-group id="field1" class="mb-2">
        <InputField
          v-model="user.email"
          :class="{ invalid: $v.user.email.$error }"
          @blur="$v.user.email.$touch()"
          type="email"
          placeholder="Email"
        ></InputField>
        <p class="feedback" v-if="!$v.user.email.email">Please provide a valid email address</p>
        <p class="feedback" v-if="!$v.user.email.required && $v.user.email.$anyError">Email cannot be empty</p>
      </b-input-group>
      <!-- <p>{{ $v.user.email }}</p> -->



      <b-input-group id="field2" class="mb-2">
        <InputField
          :class="{ invalid: $v.user.username.$error }"
          type="text"
          @blur="$v.user.username.$touch()"
          v-model="user.username"
          placeholder="Username"
        ></InputField>
        <p class="feedback" v-if="$v.user.username.$error">
          Username should be atleast
          {{ $v.user.username.$params.minLength.min }} characters
        </p>     
      </b-input-group>
      <!-- <p>{{ $v.user.username }}</p> -->


      <InputField type="password" 
      v-model="user.password" placeholder="Password"
      :class="{ invalid: $v.user.password.$error }"
      @blur="$v.user.password.$touch()"
      ></InputField>


      <p class="feedback" v-if="!$v.user.password.minLength && $v.user.password.$error"> 
           Password should be atleast
          {{ $v.user.password.$params.minLength.min }} characters
        </p>
        <p class="feedback" v-if="!$v.user.password.containsUppercase && $v.user.password.$error"> 
          Password should contain atleast 1 Uppercase character
        </p>
        <p class="feedback" v-if="!$v.user.password.containsLowercase && $v.user.password.$error"> 
          Password should contain atleast 1 Lowercase character
        </p>
        <p class="feedback" v-if="!$v.user.password.containsNumber && $v.user.password.$error"> 
          Password should contain atleast 1 digit
        </p>
        <p class="feedback" v-if="!$v.user.password.containsSpecial && $v.user.password.$error"> 
          Password should contain atleast 1 special character
        </p>



      <div id="loginbtn">
        <b-button type="submit" variant="primary" >Register</b-button>
      </div>
    </b-form>

    <!-- <p>{{ error }}</p> -->
  </div>
  <p>Already registered? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { registerUser } from "@/services/user";
import { required, email, minLength } from "vuelidate/lib/validators";
import InputField from "../Forms/Input/InputText.vue";
// import axios from "axios";

export default {
  name: "RegisterPage",
  components: {
    InputField,
  },
  data() {
    return {
      user: {
        email: "",
        username: "",
        password: "",
      },
      error: "",
      errormessage:""
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
        // unique: async(val)=>{
        //   if(val=='') return true;
        //   const response=await axios.get(`http://localhost:3000/user/validate?email=${val}`);
        //   console.log("check unique",response)

        // }
      },
      username: {
        required,
        minLength: minLength(4),
        // unique: async(val)=>{
        //   if(val=='') return true;
        //   const response=await axios.get(`http://localhost:3000/user/validate?username=${val}`);
        //   console.log("check unique",response)

        // }
      },
      password: {
        required,
        minLength: minLength(8),
        containsUppercase: function (value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value);
        },
        containsSpecial: function (value) {
          return /[#?!@$%^&*-]/.test(value);
        },
      },
    },
  },
  methods: {
    showToast()
      {
  
        this.$refs.alertcomp.showAlert();
      },
    async onSubmit(e) {
      e.preventDefault();

      if(this.$v.user.$invalid)
      {
      this.$v.$touch()
      this.touched=true;
   
      }
      else
      {

    

      const userCred = JSON.parse(JSON.stringify(this.user));

      try
      {
          console.log("inside try")
        await registerUser(userCred, this.$router);
      
      }
      catch(err)
      {
       
        const {error}=err.response.data;
        // console.log("register err",error)
        this.errormessage=error;
        // this.error=true;
        this.showToast()


      }
    }
     


    },
  },
};
</script>

<style>
.invalid {
  border: 1px solid red !important;
  /* background-color: rgb(207, 164, 172) !important; */
}

#loginform {
  padding: 15px;

  background-color: white;
  border-radius: 10px;

}
.feedback
{
  font-size: 0.8em;
  color: red;
  margin: 0;
  
}

#loginform input {
  width: 100%;
}

/* #field1{
      margin-bottom: 20px;
  } */

#loginbtn {
  display: flex;
  justify-content: center;
}

#formbody
{
  
  
}


</style>
