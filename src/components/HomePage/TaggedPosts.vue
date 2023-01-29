<!-- Posts on home page -->

<template>
  <div id="displayallposts">
    <LoadingIcon :loading="loading"></LoadingIcon>
    <ShowBtn btntext="Create Post" name="PostForm"></ShowBtn>
    <div v-if="!loading">
      <div id="tagposts">#{{ $route.params.tag }}</div>

      <UserPost
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
      ></UserPost>
    </div>

    <PaginationComponent
      :pages="pages"
      :currentpage="page"
    ></PaginationComponent>
  </div>
</template>

<script>
import UserPost from "./Posts.vue";
import { getPostsPages } from "@/services/post";
import ShowBtn from "../Utils/ShowBtn.vue";
import PaginationComponent from "@/components/Utils/Pagination.vue";

export default {
  name: "TaggedPosts",
  components: { UserPost, PaginationComponent, ShowBtn },
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

  async created() {
    const { tag } = this.$route.params;

    try {
      this.loading = true;
      let postlimit = 2;
      const posts = await getPostsPages(tag, this.page, postlimit);
      this.pages = posts.data.pages;
      this.posts = posts.data.posts;
    } catch (err) {
      console.log("Err", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
#displayallposts {
  padding-bottom: 10px;
}

#tagposts {
  height: 50px;
  color: black;
  font-size: 1.5em;
  font-weight: bold;
}
</style>
