<template>
  <div id="app">
    <NavHeader></NavHeader>

    <div id="content">
      {{ isAuthenticated }}
      <div v-if="!isOnAuthPage()" id="postsection">
        <div id="allposts">
          <router-view name="main"></router-view>
        </div>
      </div>

      
      <div v-if="!isOnAuthPage()" id="rightsection">
        <router-view name="side"></router-view>
      </div>

      <div id="authsection" v-if="isOnAuthPage()">
        <router-view name="auth"></router-view>
      </div>
      
      

    
    </div>
  </div>
</template>

<script>
import NavHeader from "./components/Navbar.vue";
import {mapGetters} from 'vuex'


export default {
  name: "App",
  components: {
    NavHeader,
  },
  methods:{
    isOnAuthPage()
    {
      return (this.$route.path == '/login' ||  this.$route.path =='/register')

    }
  },
  computed:{
    ...mapGetters(['isAuthenticated'])

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
  /* height: 100vh; */

  padding: 20px;
}

* {
  font-family: "Rubik";
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
@media only screen and (max-width: 1065px) {
  /* #rightsection-view {
    display: none;
  } */

  #postsection,
  #allposts {
    width: 100%;
  }

  html,
  body {
    margin: 0;
    height: 100%;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
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
  display: none;
}


#postsection {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

#rightsection
{
    height: 80vh;
    width: 50%;
    display: flex;
    justify-content: left;
    padding-left: 30px;
}


@media only screen and (max-width: 1065px)
 {

#rightsection

{
    display: none;
}
 }

</style>
