<template>
  <div id="app">
    <NavHeader></NavHeader>

    <div id="content">
      <div id="postsection">
        <div id="allposts">
          <router-view name="main"></router-view>
        </div>
      </div>

      
      <router-view name="side"></router-view>
      

    
    </div>
  </div>
</template>

<script>
import NavHeader from "./components/Navbar.vue";


export default {
  name: "App",
  components: {
    NavHeader,
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
  width: 100%;
}

#content {
  display: flex;
  background-color: #dae0e6;
  /* border:1px solid red; */

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
</style>
