<template>
  <div>
    <LoadingIcon :loading="loading"></LoadingIcon>
    <UserInfoTab ></UserInfoTab>


    <div id="userposts" v-if="!loading">
      <UserPost
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
      ></UserPost>
    </div>

    <div id="infoheader" v-if="posts.length == 0">
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

export default {
  name: "UserPosts",
  data() {
    return {
      posts: [],
      loading: false,
      pages: 0,
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


    const posts = await getUserPosts(
      this.$route.params.id,
      this.page,
      postlimit
    );
    this.posts = posts.data.posts;
    this.pages = posts.data.pages;
    this.loading = false;
    // console.log("Done");
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
