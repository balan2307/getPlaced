<template>
  <div>
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

</style>