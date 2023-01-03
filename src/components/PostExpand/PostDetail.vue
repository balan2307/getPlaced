<template>
  <div id="showdetails">
  
    <UserPost :post="post"></UserPost>
    <!-- {{ post[0].title }} -->

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
    </div>
   
  
</div>

</template>

<script>
import UserPost from "../HomePage/Posts.vue"
import axios from "axios";
// import { eventBus } from "@/main";
// import LoadingIcon from '../Helper/Loading.vue'

export default {
  name: "PostDetails",
  components:{UserPost},
  // props:['username'],
  data(){

    return{
      post:[]
    }
  },
  async created()
  {
    const post=await axios.get(`http://localhost:3000/user/post/${this.$route.params.id}`)
    if(post.status==200)
    {
    this.post=post.data.post[0];
    // console.log("Userr details",this.post,typeof(this.post))
    }

  },
  mounted()
  {
    // console.log("check user mounted",this.post)
    
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
