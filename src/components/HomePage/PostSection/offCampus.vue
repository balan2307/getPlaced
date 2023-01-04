<template>
  

    <div id="displayallposts">
       <div>
      <UserPost v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
      </div>
   
  
  
    </div>
  
  
  
  </template>
  
  <script>
  import UserPost from "@/components/HomePage/Posts.vue"
  import {getTaggedPosts} from '@/services/post'
  
  export default {
      name:'offCampus',
      components:{UserPost},
      data()
      {
          return{
              posts:[]
          }
  
  
      },
      async created()
      {
          console.log("OffCampus")
          const posts=await getTaggedPosts('offcampus');
          this.posts=posts.data.posts;
  
      }
  
  }
  </script>
  
  <style>

  #displayallposts{
      margin-top: 10px;
  
  }


  
  </style>