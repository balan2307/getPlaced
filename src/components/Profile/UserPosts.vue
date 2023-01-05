<template>
  <div>
    <LoadingIcon :loading="loading"></LoadingIcon>

  <div id="userposts" v-if="!loading">
    <UserPost  v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
    </div>


    <PaginationComponent :pages="pages" :currentpage="page"></PaginationComponent>
    </div>
</template>

<script>
import UserPost from '@/components/HomePage/Posts.vue'
import {getUserPosts} from '../../services/post'
import LoadingIcon from '../Utils/Loading.vue'
import PaginationComponent from '@/components/Utils/Pagination.vue'

export default {
name:'UserPosts',
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
components:{UserPost,LoadingIcon,PaginationComponent},
async created()
{
  this.loading=true;
  console.log("Params",this.$route.params.id)
  let postlimit=3;
  const posts=await getUserPosts(this.$route.params.id,this.page,postlimit);
  this.posts=posts.data.posts;
  this.pages=posts.data.pages;
  this.loading=false;
  console.log("Done")
}

}
</script>

<style>
#userposts
{
  
  padding-bottom: 10px;

}
</style>