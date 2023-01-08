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
    name:'onCampus',
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
    
        console.log("OnCampus",this.page)
        let postlimit=2;
  
        getPostsPages('oncampus',this.page,postlimit)
        .then(post=>{
        console.log("data received")
        this.pages=post.data.pages;
        this.posts=post.data.posts;
        this.loading=false;

        })
        .catch((err)=>{
            console.log("Error oncampus",err)
            this.$router.push({path:'/login'})

        })


        console.log("front end post",this.posts)


   

    }

}
</script>

<style>
#displayallposts{
    margin-top: 10px;
}



</style>