<template>
  <div>
    <UserPost></UserPost>

    <div class="comment-section">
        <p>Comment as <span class="current-user">Dismal-Local7077</span></p>
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
export default {
  name: "PostDetails",
  components:{UserPost}
};
</script>

<style>
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
