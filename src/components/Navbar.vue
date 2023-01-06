<template>
  

    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand href="#"> <router-link to="/oncampus">getPlaced</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"></b-nav-item>
          <b-nav-item href="#"><router-link to="/oncampus">Home</router-link></b-nav-item>
          <!-- <b-nav-item href="#"><router-link to="/user/post/63b144f73b786619a47bb9f6">Test</router-link></b-nav-item> -->

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em >{{ getUid }} </em>
            </template>
            <b-dropdown-item > <router-link :to="`/user/profile/${getUid}`">Profile</router-link></b-dropdown-item>
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
  props:['user'],
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
    getuser()
    {
      // console.log("Store ",this.$store.state.uid)
      return this.$store.state.uid;
    }
   

  },
   created()
  {
   
    console.log("Created nav",`${this.$publicpath}/stylesheets/navbar.css`)
    // const uid=this.$store.getters.getUid;
    // console.log("Uid ",uid)
    // const res=await getUserName(uid);
    // console.log("Username is ",res)
    // this.username=res;
  }
  ,
  mounted()
  {
    // console.log("navbar mounted")
  },


  // metaInfo: {
  //     script: [
  //       { src: 'https://cdn.jsdelivr.net/vue.js', async: true, defer: true }
  //     ],
  //   }
  
 
};

</script>

<style>
 /* @import ""; */
 /* @import url(`${this.$publicpath}/stylesheets/navbar.css`); */
 @import url('./../../public/stylesheets/navbar.css');


/* .navbar{ background-color:'white' }

nav a{
  color: black;
  text-decoration: none!important;
}
nav a:hover
{
  color:black
} */
</style>
