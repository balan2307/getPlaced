<!-- Currently not in use -->
<template>
  <div id="postsection">
    <div id="allposts">

    </div>
  </div>
</template>

<script>

// import UserPost from "./Posts.vue"

export default {
  name: "DisplayMain",
  components:{

  }
};
</script>

<style>
#allposts {
  /* border: 1px solid red; */

  height: 100vh;
  width: 80%;
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
