<template>
  <div id="showdetails">

    <LoadingIcon :loading="loading"></LoadingIcon>
    <div v-if="!loading">
  
    <UserPost :post="post"></UserPost>
    <!-- {{ post[0].title }} -->
<!-- 
    <div class="comment-section">
     
        <p>Comment as <span v-if="post.user" class="current-user">{{ post.user.username }}</span></p>
        <b-form-textarea class="post-comment"
      id="textarea"
      placeholder="What are your thoughts"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <div class="comment-footer">
        <b-button size="sm">Comment</b-button>

    </div>

    <div class="post-allcomments">


    </div>
    </div> -->
    </div>
   
  
</div>

</template>

<script>
import UserPost from "../HomePage/Posts.vue"

import {getPost} from '@/services/post'
import { eventBus } from "@/main";
import LoadingIcon from '../Utils/Loading.vue'

export default {
  name: "PostDetails",
  components:{UserPost,LoadingIcon},
  // props:['username'],
  data(){

    return{
      post:[],
      loading:false
    }
  },
  async created()
  {
    //getting the post using the function declared in servicess.js
    this.loading=true;
    const post=await getPost(this.$route.params.id)
    if(post.status==200)
    {
    this.post=post.data.post[0];

    eventBus.$emit("getProfileid",this.post.user._id);
    // console.log("Userr details",this.post,typeof(this.post))
    this.loading=false;
    }

  }

};
</script>

<style>

#showdetails
{
  padding-bottom: 10px;
}
.comment-footer
{
    height: 10%;
    background-color: #cdd5d5;

    padding: 5px;
    display: flex;
    justify-content: end;
}

.post-comment:focus
{
    outline: none !important;
    border:1px solid black;
 
    box-shadow: none;
}

.comment-footer .btn
{
    font-size: 12px;
}

.comment-section
{
    background-color: white;
    padding: 10px;
}

.current-user
{
   color:orange
}

.post-comment::-webkit-scrollbar {
  display: none;
}


.post-comment {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
