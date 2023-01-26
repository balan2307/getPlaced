<template>
  

  <div id="displayallposts">
     <LoadingIcon :loading="loading"></LoadingIcon>
     <AlertMessage ref="alertcomp" variant="danger" :message="errormessage"></AlertMessage>
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
import {mapGetters} from 'vuex'
import store from '@/store';




export default {
    name:'onCampus',
    components:{UserPost,PaginationComponent},
    data()
    {
        return{
            posts:[],
            loading:false,
            pages:0,
            errormessage:''
        }


    },
    computed:{

        ...mapGetters(['isAuthorized']),

        page()
        {
        return this.$route.query.page || 1
        }
    },
    methods:{
        showToast()
      {
  
        console.log("refs",this.$refs)

        this.$refs.alertcomp.showAlert();
      }

    },
    async created()
    {

     
  
        store.commit('setAuthorized', true)
        this.loading=true;
    
        // console.log("OnCampus",this.page)
        let postlimit=2;
  
        getPostsPages('oncampus',this.page,postlimit)
        .then(post=>{
        console.log("data received oncampus check")
        this.pages=post.data.pages;
        this.posts=post.data.posts;
        this.loading=false;

        })
        .catch((err)=>{
            console.log("Error oncampuss",err)
            this.$router.push({path:'/login'})

        })


        // console.log("front end post",this.posts)


   

    },
    mounted(){
        if(!this.isAuthorized)
        {
            console.log("gel")
            this.errormessage="Unauthorized Access"
            this.showToast()
        }
    }

}
</script>

<style>
#displayallposts{
    margin-top: 10px;
}



</style>