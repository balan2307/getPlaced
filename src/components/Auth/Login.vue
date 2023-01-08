<template>
  <div>

    <!-- <div class="errorDisplay" v-if="error">
      <p id="err-message">{{ errormessage }}</p>
    </div> -->
    <errorMessage :error="error" :errormessage="errormessage"></errorMessage>
    <LoadingIcon :loading="loading"></LoadingIcon>
  
  <b-form id="loginform" @submit="onSubmit" ref="form">
    
    <!-- {{$v.user.email }} -->
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

     
        <InputField type="password" 
      v-model="user.password" placeholder="Password"
      :class="{ invalid: $v.user.password.$error }"
      @blur="$v.user.password.$touch()"
      @visited="setVisited"
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
    <b-button variant="primary" type="submit" :disabled="$v.$invalid">Login</b-button>
    </div>
  </b-form>
  <p>Not registered yet? <router-link to="/register">Register</router-link> </p>

  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import InputField from "../Forms/Input/InputText.vue";


export default {
 name:'LoginPage',
 components:{InputField},
 data(){
  return {
    user:{
      email:'',
      password:''
    },
    touched:false,
    error:false,
    errormessage:'',
    loading:false
  }
 },
 validations: {
    user: {
      email: {
        required,
        email
  
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
 methods:{
  async onSubmit(e)
  {
    
    const userCred=JSON.parse(JSON.stringify(this.user));
    e.preventDefault();
    try{
      
      this.loading=true;
      const uid=await this.$store.dispatch('login',userCred);

      console.log("UID ",uid)
      if(uid) this.$router.push({path:'/oncampus'})
    }
    catch(err){
      console.log("Login error",err.response.data.error)
      const {status }=err.response;
      this.$refs.form.reset()
     
      if(status==401)
      {
        this.errormessage="Email or Password entered is incorrect"
        console.log("error",this.errormessage)
      }
      else if(status==500)
      {
        this.errormessage="Server issue ,Try again"

      }
      this.error=true;
     
     
      //redirect to login
    }
    finally
    {
      this.loading=false;

    }


  },


  setVisited()
  {
    this.touched=true;
  }
 }

}
</script>

<style>

#loginform{
    padding: 15px;

    background-color: white;
    border-radius:10px;

    

     /* display: flex;
    flex-direction: column;
    
    row-gap: 12px;
    justify-content: center; */
}

#loginform input{
 
}

#field1{
    margin-bottom: 20px;
}

#loginbtn
{
    display: flex;
    justify-content: center;

}

</style>