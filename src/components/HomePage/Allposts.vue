<!-- Posts on home page -->

<template>

 
  <div id="displayallposts" >
    <LoadingIcon :loading="loading"></LoadingIcon>
 

    <div v-if="!loading">
    <UserPost v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
    </div>
  
    
  </div>

  
</template>

<script>
import UserPost from "./Posts.vue"
import axios from "axios"
import LoadingIcon from '../Helper/Loading.vue'
export default {
    name:'AllPosts',
    components:{UserPost,LoadingIcon},
    data()
    {
      return{
        posts:[],
        loading:false
      }
    },

    async created()
    {
    console.log("INside created")


     try{

      this.loading=true;
     const posts= await axios.get('http://localhost:3000/user/posts')
     this.posts=posts.data.posts
    //  console.log("all posts frontend",this.posts)
     }
     catch(err)
     {
      console.log("Err",err)
     }
     finally
     {
      this.loading=false;
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