<template>
  <div>
  
  <b-form id="loginform" >
    
    <b-input-group id="field1" prepend="@" class="mb-2 ">
      <b-form-input id="inline-form-input-username" placeholder="Username"></b-form-input>
    </b-input-group>

    <b-form-input
    id="field2"
      class="mb-2"
      type="password"
      placeholder="Password"

    ></b-form-input>


     <div id="loginbtn">
    <b-button variant="primary">Login</b-button>
    </div>
  </b-form>
  <p>Not registered yet? <router-link to="/register">Register</router-link> </p>

  </div>
</template>

<script>
export default {
 name:'LoginPage'
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