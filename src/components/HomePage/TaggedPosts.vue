<!-- Posts on home page -->

<template>

 
    <div id="displayallposts" >
      <LoadingIcon :loading="loading"></LoadingIcon>
      <div  v-if="!loading">
      <div  id="tagposts">
        #{{ $route.params.tag }}
      </div>
   
      <UserPost v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
      </div>
    
      
    </div>
  
    
  </template>
  
  <script>
  import UserPost from "./Posts.vue"
  import LoadingIcon from '../Utils/Loading.vue'
  import {getTaggedPosts} from '@/services/post'


  export default {
      name:'TaggedPosts',
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
        const {tag}=this.$route.params;

 
  
  
       try{
  
       
       console.log("Tag frontend",tag)
       this.loading=true;
       const posts= await getTaggedPosts(tag)
       this.posts=posts.data.posts
       console.log("all tagged posts frontend",this.posts)
       }
       catch(err)
       {
        console.log("Err",err)
       }
       finally
       {
        this.loading=false
       }
  
      },
      async mounted()
      {


      }
  
  }
  </script>
  
  <style>
  #displayallposts
  {
    padding-bottom: 10px;
  }


  #tagposts{
    height: 50px;
    color: black;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  </style>