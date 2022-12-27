<template>

    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand href="#"> <router-link to="/">getPlaced</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"></b-nav-item>
          <b-nav-item href="#"><router-link to="/post/1">Home</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em style="border:1px solid red">Username</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

</template>

<script>
import { mapGetters } from 'vuex';
// import {getUserName} from '../services/user'

export default {
  name: "NavHeader",
  data()
  {

    return{
      username:''
    }
  },
  methods:{
    logout() {
                this.$store.dispatch( 'logout' )
                    .then( () => this.$router.push( { name: 'LoginPage' } ) );
            }

  },
  computed:{
    ...mapGetters(['isAuthenticated','getUid']),
   

  },
  async mounted()
  {
    // console.log("Created")
    // const uid=this.$store.getters.getUid;
    // console.log("Uid ",uid)
    // const res=await getUserName(uid);
    // console.log("Username is ",res)
    // this.username=res;
  }
 
};
</script>
.navbar{ background-color:'white' }
<style>
nav a{
  color: black;
  text-decoration: none!important;
}
nav a:hover
{
  color:black
}
</style>
