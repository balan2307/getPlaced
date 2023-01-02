<!-- Posts on home page -->

<template>
  <div id="displayallposts">
    <UserPost></UserPost>
    <UserPost></UserPost>
    <UserPost></UserPost>
    
  </div>
</template>

<script>
import UserPost from "./Posts.vue"
export default {
    name:'AllPosts',
    components:{UserPost}

}
</script>

<style>
#displayallposts
{
  padding-bottom: 10px;
}

</style>