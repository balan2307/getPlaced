<!-- Posts on home page -->

<template>

 
  <div id="displayallposts" >
 
    <UserPost v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
  
    
  </div>

  
</template>

<script>
import UserPost from "./Posts.vue"
import axios from "axios"
export default {
    name:'AllPosts',
    components:{UserPost},
    data()
    {
      return{
        posts:[]
      }
    },

    async created()
    {
    console.log("INside created")


     try{

     const posts= await axios.get('http://localhost:3000/user/posts')
     this.posts=posts.data.posts
     console.log("all posts frontend",this.posts)
     }
     catch(err)
     {
      console.log("Err",err)
     }

    }

}
</script>

<style>
#displayallposts
{
  padding-bottom: 10px;
}

</style>