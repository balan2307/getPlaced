<!-- Posts on home page -->

<template>

 
  <div id="displayallposts" >
    <LoadingIcon :loading="loading"></LoadingIcon>
    <ShowBtn btntext="Create Post" name="PostForm"></ShowBtn>




  <div>
    <div id="tab">
    <div id="tab1" :class="tab1active" >
      <span class="tab-name" @click="makeactive" ><router-link :class="link1active" to="/oncampus"> OnCampus</router-link> </span>
    </div>
    
    <div id="tab2" :class="tab2active">
      <span class="tab-name" @click="makeactive" ><router-link :class="link2active" to="/offcampus"> OffCampus</router-link></span>

    </div>
    </div>




    <router-view :key="$route.fullPath"></router-view>

  </div>
 

    <!-- <div v-if="!loading">
    <UserPost v-for="(post,index) in posts" :key="index" :post="post"></UserPost>
    </div> -->
  
    
  </div>

  
</template>

<script>
// import UserPost from "./Posts.vue"
// import {getAllPosts} from '@/services/post'
// import CreatePostSectionVue from './CreatePostSection.vue'
import ShowBtn from '../Utils/ShowBtn.vue'
// import {getUserProfile} from '@/services/user'

export default {
    name:'AllPosts',
    components :{ShowBtn},
    data()
    {
      return{
        posts:[],
        loading:false,
        tab1active:'',
        tab2active:'',
        link1active:'',
        link2active:''
      }
    },
    methods:{
      makeactive()
      {

        // console.log("make active")
      }
    },

   async created()
    {
     


     

      if (this.$route.path == "/oncampus")
      {
        console.log("ONcampuis")
        this.tab1active='active';
        this.tab2active=''
        this.link1active='a-active'
        this.link2active=''

        

      }
      else
      {
        console.log("Offcampuis")
        this.tab2active='active';
        this.tab1active=''
        this.link2active='a-active'
        this.link1active=''

      }
   

      // const res= await getUserProfile('63b7f9be557991d6e4d9e512')
      // console.log("Response check for profile",res)
    

    }

}
</script>

<style>






#displayallposts
{
  padding-bottom: 10px;
}

#tab{
  display: flex;
    justify-content: space-evenly;
    
}

#tab1 a,#tab2 a{
  color:rgb(14, 13, 13);
  text-decoration: none;
}

#tab1,#tab2{
  width:50%;
  text-align:center;
  padding: 3px;
  border: 1px solid rgb(218, 211, 211);
  border-radius: 8px;
  background-color: white;
}

#tab1{
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
#tab2{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}




#tab1:hover,#tab2:hover{
  background-color: rgb(201, 211, 211);
  
}

.a-active{
  color:rgb(255, 255, 255)!important;
  text-decoration: none;
}

.active
{

  background-color: #848f8b!important;
}

/* .test
{
  border: 1px solid rgb(28, 216, 207);
} */





.tab-name{
  font-weight: 500;
  font-size: 1.2em;
}




</style>