<template>
  <div id="userposts">
    <UserPost v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
    </div>
</template>

<script>
import UserPost from '@/components/HomePage/Posts.vue'
import {getUserPosts} from '../../services/post'

export default {
name:'UserPosts',
data()
{
  return{
    posts:[]
  }

},
components:{UserPost},
async created()
{
  console.log("Params",this.$route.params.id)
  const posts=await getUserPosts(this.$route.params.id);
  this.posts=posts.data.posts;
}

}
</script>

<style>
#userposts
{
  
  padding-bottom: 10px;

}
</style>