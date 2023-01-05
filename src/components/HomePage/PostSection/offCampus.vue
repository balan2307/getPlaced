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
  import LoadingIcon from '@/components/Utils/Loading.vue'
  
  export default {
      name:'offCampus',
      components:{UserPost,PaginationComponent,LoadingIcon},
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
          console.log("OnCampus",this.page)
          let postlimit=2;
          // let currPage=this.$route.query.page
         
  
  
          const post=await getPostsPages('offcampus',this.page,postlimit)
  
          console.log("front end post",post.data)
          // console.log("No of pages",pages)
  
          this.pages=post.data.pages;
          this.posts=post.data.posts;
          this.loading=false;
  
      }
  
  }
  </script>
  
  <style>
  
  
  </style>