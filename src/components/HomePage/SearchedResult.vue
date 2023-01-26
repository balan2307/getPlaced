<template>
  <div>
    <h5 id="search-header">Search results for {{ searchedfor }}</h5>
    <div v-if="empty">
      <h4 style="color:grey">No posts found ,try searching something else</h4>

    </div>
    <div v-if="!empty">
    <LoadingIcon :loading="loading"></LoadingIcon>
    <div v-if="!loading">

    <UserPost
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
    ></UserPost>
    </div>
    </div>


    <PaginationComponent
      :pages="pages"
      :currentpage="page"
    ></PaginationComponent>
  </div>
</template>

<script>
import { searchPost } from "@/services/post";
import UserPost from "./Posts.vue";
import PaginationComponent from '@/components/Utils/Pagination.vue'

export default {
  name: "SearchedResult",
  props: ["searchTerm"],
  components: { UserPost, PaginationComponent },
  data() {
    return {
      posts: [],
      searchedfor: this.$route.query.search,
      pages:0,
      empty:false
    };
  },
  computed: {
    page() {
      return this.$route.query.page || 1;
    },
  },


  async created() {
    const postlimit=2;
    this.loading=true;
    if (this.searchedfor!= undefined) {
        try{
      const res = await searchPost(this.searchedfor,this.page,postlimit);
      this.posts = res.data.posts;
      if(this.posts.length==0) this.empty=true;
   
      this.pages=res.data.pages;
      this.loading=false;
        }
        catch(err)
        {
            console.log("Error on fetching posts",err)

        }
    }

  },
};
</script>

<style>
#search-header{
    color: #636363;
    font-weight: bold;
}
</style>
