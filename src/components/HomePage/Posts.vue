<!-- Individual post -->
<template>
  <b-card class="mb-2 user-post">
    <VotingWidget :vote="vote" :userupvoted="userupvoted" :userdownvoted="userdownvoted"  @upvote="upvote"  @downvote="downvote"  ></VotingWidget>
    <div class="post-content" @click="showPostDetails">
      <b-card-text class="post-time" v-if="post.user">
        Posted by  <b-button class="profile-btn" @click="visitProfile">@{{ post.user.username }}</b-button>
      </b-card-text>
     
      <h5 class="post-title">{{post.title}}</h5>
      <!-- <p>Test {{ test }}</p> -->
   
      <b-img v-if="post.image" class="post-img" :src="post.image.url" fluid-grow alt="Fluid-grow image"></b-img>
      <b-card-text>
    {{ post.content }}
      </b-card-text>
      <div class="interview-info">
       <div><p><span class="interview-info-label">Company:</span> <span>{{ post.company }}</span></p></div>
       <!-- <div><p><span class="interview-info-label">Mode:</span> <span>OnCampus</span></p></div> -->
       <div v-if="post.college"><p><span class="interview-info-label">College:</span> <span>{{ post.college }}</span></p></div>
       <div><p><span class="interview-info-label">Difficulty:</span> <span>{{ post.difficulty }}</span></p></div>

      </div>
      <!-- <p>{{ showtags }}</p> -->

    
      <div class="post-tags" v-if="post.tags">
       
        <span @click="taggedposts" v-for="(tag ,index) in  post.tags" :key="index" class="tag">
       <router-link :to="`/posts/${tag}`"> #{{ tag}}</router-link> 
        </span>

       

      </div>

      <!-- {{ post.user._id }} -->
      <div class="post-btn mt-3" v-if="showBtn && post.user && (post.user._id == getUid)" >
        <span id="editbtn"> <router-link :to="`/user/post/${post._id}`">Edit</router-link> </span>
        <span id="deletebtn" @click="deletePost" class="ml-2"> <b-button>Delete</b-button></span>


      </div>

      <div class="post-dateinfo ">
        <!-- <p>{{post.postdate}}</p> -->

      </div>

    </div>
  </b-card>
</template>

<script>
// import { deletePost } from '@/Server/Controllers/postController';
import VotingWidget from '@/components/Utils/VotingWidget.vue'


import {deletePost,upvotePost,downvotePost} from '@/services/post'
// import axios from 'axios';
import {mapGetters} from 'vuex'

export default {
  name: "UserPost",
  props:['post'],
  components:{VotingWidget},
  data()
  {
    return{
       showtags:false,
       showBtn:false,
       test:"",
       upvotes:this.post.upvotes.length,
       downvotes:this.post.downvotes.length
    }
  },
  computed:
  {
    ...mapGetters(['getUid']),
    vote()
    {
      return (this.upvotes-this.downvotes)
    },
    userupvoted()
    {
      if(this.post.upvotes!=undefined && this.post.upvotes.indexOf(this.getUid)!=-1) return true;
      else return false;

    },
    userdownvoted()
    {

      if(this.post.downvotes!=undefined && this.post.downvotes.indexOf(this.getUid)!=-1) return true;
      else return false;

    }

  },
  methods:{

    upvote(data)
    {
    
      const {up,dw}=data;
      this.upvotes+=up;
      this.downvotes+=dw
  
      upvotePost(this.post._id,this.getUid)

    },
    downvote(data)
    {
      
      const {up,dw}=data;
      this.upvotes+=up;
      this.downvotes+=dw
      downvotePost(this.post._id,this.getUid)

    },
    
    taggedposts(e)
    {
      e.stopPropagation();
   
      

    },

    showPostDetails()
    {
      //to avoid redundant navigation
      if(this.$route.name!="PostDetail") this.$router.push({ name:'PostDetail' ,params: { id: this.post._id }})
    },
    visitProfile(event)
    {
      event.stopPropagation();
      console.log("Visit profile")
      this.$router.push({ name:'UserProfile' ,params:{id:this.post.user._id}})

    },

    async deletePost(event){
      this.loading=true;
      event.stopPropagation()
      const response =await deletePost(this.$route.params.id)
      if(response) {
        this.loading=false
       this.$router.push({ path:'/oncampus'})
      }
    }
  },
  created()
  {
    // console.log("Possts created",this.post)

   
    if(this.post.tags && this.post.tags[0]!=null) this.showtags=true;
  

    const route=this.$router.currentRoute
    //to show edit button only on details page
    if(route.matched[0].path=="/post/:id") {
      this.showBtn=true;
    }
    
  
   
  },
  mounted()

  {
    // console.log("POstt createdd",this.post,)
   

  }
};
</script>

<style>

.card-body {
  display: flex;

  background-color: rgb(255, 255, 255);
  padding: 0 !important;
  border-radius: 5px;
  /* border: 1px solid red; */
  
}

.card
{
    border-radius: 1rem!important;
}

.user-post
{
    /* border-radius: 15px; */
    /* border-radius:0!important; */
}

#editbtn
{
  color: black;
}

#deletebtn

{
  color: red;
}

#deletebtn .btn
{
  padding: 0;
    border: none;
    color: red;
    vertical-align: top;
}

.post-btn a
{
  text-decoration: none;
}




.post-time {
  color: #aba6a2;
}

.post-title {
  font-weight: 600;
}
.post-content {
  width: 95%;
  padding: 10px;
}


.post-img
{
    max-height: 400px;

}

.post-btn .btn
{
  background-color: white;
  color: black;
 


}

.profile-btn
{
  padding: 0;
    background-color: white;
    color: #60768d;
    font-size: 1em;
    border: none;
}
.profile-btn:hover
{

    background-color: white;
    color: #60768d;
 
}

.interview-info-label
{
  /* display: flex;
  flex-direction: column; */
  font-weight: 500;
  color: white;
  background-color: #d59e72;
  padding: 4px;
  border-radius: 5px;
}
.interview-info-label + span{
  font-weight: bold;
}

.interview-info{
  display: flex;
    /* justify-content: space-between; */
    flex-direction: column;
}



/* .post-rating .rate-components
{

  display: flex;
  flex-direction: columns;
  align-content: flex-start;
} */


.thumsdown-btn
{
  margin-left: 20px;

}

.post-tags
{
  display: flex;
  flex-wrap: wrap-reverse;
  row-gap: 4px;


  /* border: 1px solid red; */
}

.post-tags a{
  text-decoration: none;
  color: white;
}

.tag
{
  border: 1px solid black;
  margin-right: 15px;
  padding: 3px;
  background-color: #0f0f0f;
  color: white;
  border-radius: 5px;
}

@media only screen and (max-width: 585px) {
  .post-content
  {
    width: 90%;
  }
  .post-rating
  {

    width: 10%;
  }
  .interview-info
  {
    /* display: flex;
    justify-content: center; */
    flex-direction: column;
  }

}
</style>
