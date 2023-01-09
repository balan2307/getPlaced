<template>
  

    <div id="displayallposts">
        <LoadingIcon :loading="loading"></LoadingIcon>
       <div v-if="!loading">
      <UserPost v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
      </div>
  
  
    <PaginationComponent :pages="pages" :currentpage="page"></PaginationComponent>
  
  
    </div>
  
  
  
  </template>
  
  <script>
  import UserPost from "@/components/HomePage/Posts.vue"
  import {getPostsPages} from '@/services/post'
  import PaginationComponent from '@/components/Utils/Pagination.vue'

  
  export default {
      name:'offCampus',
      components:{UserPost,PaginationComponent},
      data()
      {
          return{
              posts:[],
              loading:false,
              pages:0
     
    
          }
  
  
      },
      computed:{
  
          page()
          {
          return this.$route.query.page || 1
          }
      },
      async created()
      {

         this.loading=true;
          
          let postlimit=2;
       
  
          const post=await getPostsPages('offcampus',this.page,postlimit)

         
  
          this.pages=post.data.pages;
          this.posts=post.data.posts;
          this.loading=false;
  
      }
  
  }
  </script>
  
  <style>
  
  
  </style>