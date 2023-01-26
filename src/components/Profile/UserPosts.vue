<template>
  <div>
    <LoadingIcon :loading="loading"></LoadingIcon>

    <UserInfoTab v-if="!empty"></UserInfoTab>
    <NotFound v-if="empty"></NotFound>


    <div id="userposts" v-if="!loading && !empty">
      <UserPost
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
      ></UserPost>
    </div>

    <div id="infoheader" v-if="noposts">
      <p>No posts yet posted</p>
    </div>

    <PaginationComponent
      :pages="pages"
      :currentpage="page"
    ></PaginationComponent>
  </div>
</template>

<script>
import UserPost from "@/components/HomePage/Posts.vue";
import { getUserPosts } from "../../services/post";
import PaginationComponent from "@/components/Utils/Pagination.vue";
import UserInfoTab from "@/components/Profile/UserInfoTab.vue"

import { eventBus } from "@/main";

export default {
  name: "UserPosts",
  data() {
    return {
      posts: [],
      loading: false,
      pages: 0,
      empty:false,
      noposts:false
    };
  },
  computed: {
    page() {
      return this.$route.query.page || 1;
    },
  },
  components: { UserPost, PaginationComponent,UserInfoTab },
  async created() {
    this.loading = true;
    // console.log("Params", this.$route.params.id);
    let postlimit = 3;


    let posts = []
    try{

    posts=await getUserPosts(
      this.$route.params.id,
      this.page,
      postlimit
    );
  

    if(!posts.data) 
    {
      this.noposts=true;
      this.loading=false;

    }
    if(posts.data){
    this.posts = posts.data.posts;
    this.pages = posts.data.pages;
    this.loading = false;
    }
    }
    catch(err)
    {
      
      eventBus.$emit("notfound")
      this.empty=true;
      this.loading=false;

    }

  },

};
</script>

<style>
#userposts {
  padding-bottom: 10px;
}

#infoheader {
  font-weight: bold;
  font-size: 2em;
}


</style>
