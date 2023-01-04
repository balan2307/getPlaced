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
    name:'onCampus',
    components:{UserPost},
    data()
    {
        return{
            posts:[]
        }


    },
    async created()
    {
        console.log("OnCampus")
        const posts=await getTaggedPosts('oncampus');
        this.posts=posts.data.posts;

    }

}
</script>

<style>
#displayallposts{
    margin-top: 10px;


}

#tab span,#tab a{
    width: 100%;
    display: inline-block;
}

</style>