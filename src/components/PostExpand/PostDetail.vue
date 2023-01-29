<template>
  <div id="showdetails">
    <AlertMessage
      variant="success"
      :message="alertmessage"
      ref="alertcomp"
      @alertclose="alertclose"
    ></AlertMessage>
    <LoadingIcon :loading="loading"></LoadingIcon>
    <NotFound v-if="empty"></NotFound>
    <div v-if="!loading">
      <UserPost v-if="!empty" :post="post" @deletePost="deletePost"></UserPost>
    </div>
  </div>
</template>

<script>
import UserPost from "../HomePage/Posts.vue";
import NotFound from "../Utils/NotFound.vue";

import { getPost } from "@/services/post";
import { eventBus } from "@/main";

export default {
  name: "PostDetails",
  components: { UserPost, NotFound },

  data() {
    return {
      post: [],
      loading: false,
      alertmessage: "",
      empty: false,
    };
  },
  async created() {
    this.loading = true;
    let post = {};
    try {
      post = await getPost(this.$route.params.id);

      this.post = post.data.post[0];

      eventBus.$emit("getProfileid", this.post.user._id);
      this.loading = false;
    } catch (err) {
      console.log("Post err", err);
      this.loading = false;
      this.empty = true;
      eventBus.$emit("notfound");
    }
  },
  methods: {
    deletePost() {
      console.log("post delte request");
      this.showToast("Post is getting deleted");
    },
    alertclose(data) {
      if (data == 0) this.$router.push("/oncampus");
    },
    showToast(msg) {
      this.alertmessage = msg;
      this.$refs.alertcomp.showAlert();
    },
  },
};
</script>

<style>
#showdetails {
  padding-bottom: 10px;
}
.comment-footer {
  height: 10%;
  background-color: #cdd5d5;

  padding: 5px;
  display: flex;
  justify-content: end;
}

.post-comment:focus {
  outline: none !important;
  border: 1px solid black;

  box-shadow: none;
}

.comment-footer .btn {
  font-size: 12px;
}

.comment-section {
  background-color: white;
  padding: 10px;
}

.current-user {
  color: orange;
}

.post-comment::-webkit-scrollbar {
  display: none;
}

.post-comment {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
