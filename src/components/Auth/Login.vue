<template>
  <div>
  
  <b-form id="loginform" @submit="onSubmit">
    
    <b-input-group id="field1"  class="mb-2 ">
      <b-form-input v-model="user.email" id="inline-form-input-email" type="email" placeholder="Email"></b-form-input>
    </b-input-group>

    <b-form-input
    id="field2"
      class="mb-2"
      type="password"
      placeholder="Password"  v-model="user.password"

    ></b-form-input>


     <div id="loginbtn">
    <b-button variant="primary" type="submit">Login</b-button>
    </div>
  </b-form>
  <p>Not registered yet? <router-link to="/register">Register</router-link> </p>

  </div>
</template>

<script>

export default {
 name:'LoginPage',
 data(){
  return {
    user:{
      email:'',
      password:''
    }
  }
 },
 methods:{
  async onSubmit(e)
  {
    const userCred=JSON.parse(JSON.stringify(this.user));
    e.preventDefault();
    try{
      
      const uid=await this.$store.dispatch('login',userCred);
      console.log("UID ",uid)
      this.$router.push({name:'HomeMain'})
    }
    catch(err){
      console.log("error caught",err)
      //redirect to login
    }


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

#field1{
    margin-bottom: 20px;
}

#loginbtn
{
    display: flex;
    justify-content: center;

}

</style>