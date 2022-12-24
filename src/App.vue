<template>
  <div id="app">
    <NavHeader></NavHeader>

    <div id="content">
      <AllPost>


      </AllPost>
      <RightSection></RightSection>

     
    </div>
  </div>
</template>

<script>

import NavHeader from "./components/Navbar.vue";
import AllPost from "./components/HomePage/DisplayPosts.vue";
import RightSection from './components/HomePage/RightSection.vue'

export default {
  name: "App",
  components: {
    NavHeader,
    AllPost,
    RightSection
  },
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
}

#content {
  display: flex;
  background-color: #dae0e6;
  /* border:1px solid red; */

  padding: 20px;
}

*{
  
  font-family: 'Rubik';
}

@media only screen and (max-width: 960px) {
  #rightsection{
    display: none;
  }

  #postsection ,#allposts{
    width: 100%;
  }


  


  html, body {
    margin: 0;
    height: 100%;
    height: 100vh;
}

  * {
  box-sizing: border-box;
}
  



}
</style>
