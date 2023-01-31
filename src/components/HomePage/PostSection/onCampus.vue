<template>
  <div id="displayallposts">
    <LoadingIcon :loading="loading"></LoadingIcon>
    <AlertMessage
      ref="alertcomp"
      variant="danger"
      :message="errormessage"
    ></AlertMessage>
    <div v-if="!loading">
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
import UserPost from "@/components/HomePage/Posts.vue";
import { getPostsPages } from "@/services/post";
import PaginationComponent from "@/components/Utils/Pagination.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "onCampus",
  components: { UserPost, PaginationComponent },
  data() {
    return {
      posts: [],
      loading: false,
      pages: 0,
      errormessage: "",
    };
  },
  computed: {
    ...mapGetters(["isAuthorized"]),

    page() {
      return this.$route.query.page || 1;
    },
  },
  methods: {
    showToast() {

      this.$refs.alertcomp.showAlert();
    },
  },
  async created() {
  
    // store.commit("setAuthorized", true);
    this.loading = true;

    let postlimit = 2;

    getPostsPages("oncampus", this.page, postlimit)
      .then((post) => {
        this.pages = post.data.pages;
        this.posts = post.data.posts;
        this.loading = false;
    
      })
      .catch(() => {
    
        this.$router.push({ path: "/login" });
      });
  },
  mounted() {
    if (!this.isAuthorized) {
      this.errormessage = "The Page you requested either does not exist or you are not Authorized to access";
      store.commit("setAuthorized",true);
      this.showToast();
    }
  },
};
</script>

<style>
#displayallposts {
  margin-top: 10px;
}
</style>
