<template>
  <div id="app">
    <NavHeader :user="getName"></NavHeader>


    <div id="content">
         
      <!-- <div v-if="!isOnAuthPage()" id="rightsection">
     
        <router-view name="side" :key="$route.fullPath"></router-view>
      </div> -->
      
  
      <div v-if="!isOnAuthPage()" id="postsection">
        <div id="allposts">
          <router-view name="main" :key="$route.fullPath"></router-view>
        </div>
      </div>

      
      <div v-if="!isOnAuthPage()" id="rightsection">
     
        <router-view name="side" :key="$route.fullPath"></router-view>
      </div>

      <div id="authsection" v-if="isOnAuthPage()">
        <div class="authforms">
        <router-view name="auth"></router-view>
        </div>
      </div>
      
      

    
    </div>
  </div>
</template>

<script>
import NavHeader from "./components/Navbar.vue";
import {mapGetters} from 'vuex'
// import {getUserName} from './services/user'
// getUserId
export default {
  name: "App",
  components: {
    NavHeader
  },
  data(){
    return{
      uname:""
    }

  },

  
  methods:{
    isOnAuthPage()
    {
      return (this.$route.path == '/login' ||  this.$route.path =='/register')

    }
  },
  computed:{
    ...mapGetters(['isAuthenticated','getToken']),
    getName()
    {
      return this.name;
    }

  },
  // async created(){
  //   const uname=await getUserName(localStorage.getItem('uid'));
   
  //   this.uname=uname;
  //   console.log("Uname ",uname,this.uname)

  //   if(!this.isAuthenticated)
  //   {
  //     console.log("GO back and login");
  //     this.$router.push('/login')
  //   }

  // },
  created()
  {

    // console.log("Created")
    if(!this.isAuthenticated && this.$router.currentRoute.path!="/login")
   {
     console.log("GO back and login");
     this.$router.push('/login')
   }


  },
  async mounted()
  {
    // console.log("Mounted")
    // const t=getUserId(localStorage.getItem('token'))
    // console.log("Decoded",t)

  //   const uname=await getUserName(localStorage.getItem('uid'));
   
  //  this.uname=uname;


  //  console.log("Uname ",uname,this.uname)

  


  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

#leftsection,
#rightsection,
#postsection {
  height: 100vh;
  width: 100%;
}

#content {
  display: flex;
  background-color: #dae0e6;
  /* border:1px solid red; */
  height: 100vh;
  padding: 0 25px;

}

* {
  font-family: "Rubik";
}

html,
  body {
    margin: 0;
    height: 100%;
    height: 100vh;
  }
#allposts {
  /* border: 1px solid red; */

  height: 100vh;
  width: 80%;
}

#authsection{
  display: flex;
    justify-content: space-evenly;
    /* align-items: center; */
    margin-top: 80px;
    width: 100%;

}

.authforms{
  width: 40%;
}

#authsection + div{

  border:1px solid rgb(180, 172, 172);
 
}
@media only screen and (max-width: 1080px) {
  /* #rightsection-view {
    display: none;
  } */

  #postsection,
  #allposts {
    width: 100%;
  }



  /* * {
    box-sizing: border-box;
  } */
}

@media only screen and (max-width:550px)
{
  .authforms{
  width: 90%;

}


}



#postsection {
  width: 100%;

  display: flex;
  justify-content: right;
  /* border: 1px solid black; */
  overflow: scroll;
  overflow-x: hidden;
}
#postsection::-webkit-scrollbar {
  display: none!important;
}


#postsection {
  -ms-overflow-style: none!important;  /* IE and Edge */
  scrollbar-width: none!important;  /* Firefox */
  padding-top: 25px
}

#rightsection
{
    height: 80vh;
    width: 50%;
    display: flex;
    justify-content: left;
    padding-left: 30px;
    padding-top: 25px
}


@media only screen and (max-width: 900px)
 {

#rightsection

{
    display: none;
}

/* #content {
flex-direction: column;
 

} */

 }

</style>
