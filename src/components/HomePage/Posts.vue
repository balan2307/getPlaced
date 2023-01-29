<!-- Individual post -->
<template>
  <b-card class="mb-2 user-post">
    <VotingWidget
      :vote="vote"
      :userupvoted="userupvoted"
      :userdownvoted="userdownvoted"
      @upvote="upvote"
      @downvote="downvote"
    ></VotingWidget>
    <div class="post-content" @click="showPostDetails">
      <b-card-text class="post-time" v-if="post.user">
        Posted by
        <b-button class="profile-btn" @click="visitProfile"
          >@{{ post.user.username }}</b-button
        >
      </b-card-text>

      <h5 class="post-title">{{ post.title }}</h5>

      <b-img
        v-if="post.image"
        class="post-img"
        :src="post.image.url"
        fluid-grow
        alt="Fluid-grow image"
      ></b-img>
      <b-card-text>
        {{ post.content }}
      </b-card-text>
      <div class="interview-info">
        <div>
          <p>
            <span class="interview-info-label">Company:</span>
            <span>{{ post.company }}</span>
          </p>
        </div>

        <div v-if="post.college && post.mode=='onCampus'">
          <p>
            <span class="interview-info-label">College:</span>
            <span>{{ post.college }}</span>
          </p>
        </div>
        <div>
          <p>
            <span class="interview-info-label">Difficulty:</span>
            <span>{{ post.difficulty }}</span>
          </p>
        </div>
      </div>

      <div class="post-tags" v-if="post.tags">
        <span
          @click="taggedposts"
          v-for="(tag, index) in post.tags"
          :key="index"
          class="tag"
        >
          <router-link :to="`/posts/${tag}`"> #{{ tag }}</router-link>
        </span>
      </div>

      <div
        class="post-btn mt-3"
        v-if="showBtn && post.user && post.user._id == getUid"
      >
        <span id="editbtn">
          <router-link :to="`/user/post/${post._id}`">Edit</router-link>
        </span>
        <span id="deletebtn" @click="deletePost" class="ml-2">
          <b-button>Delete</b-button></span
        >
      </div>

      <div class="post-dateinfo"></div>
    </div>
  </b-card>
</template>

<script>
import VotingWidget from "@/components/Utils/VotingWidget.vue";

import { deletePost, upvotePost, downvotePost } from "@/services/post";

import { mapGetters } from "vuex";

export default {
  name: "UserPost",
  props: ["post"],
  components: { VotingWidget },
  data() {
    return {
      showtags: false,
      showBtn: false,
      test: "",
      upvotes: this.post.upvotes.length,
      downvotes: this.post.downvotes.length,
    };
  },
  computed: {
    ...mapGetters(["getUid"]),
    vote() {
      return this.upvotes - this.downvotes;
    },
    userupvoted() {
      if (
        this.post.upvotes != undefined &&
        this.post.upvotes.indexOf(this.getUid) != -1
      )
        return true;
      else return false;
    },
    userdownvoted() {
      if (
        this.post.downvotes != undefined &&
        this.post.downvotes.indexOf(this.getUid) != -1
      )
        return true;
      else return false;
    },
  },
  methods: {
    upvote(data) {
      const { up, dw } = data;
      this.upvotes += up;
      this.downvotes += dw;

      upvotePost(this.post._id, this.getUid);
    },
    downvote(data) {
      const { up, dw } = data;
      this.upvotes += up;
      this.downvotes += dw;
      downvotePost(this.post._id, this.getUid);
    },

    taggedposts(e) {
      e.stopPropagation();
    },

    showPostDetails() {
      if (this.$route.name != "PostDetail")
        this.$router.push({
          name: "PostDetail",
          params: { id: this.post._id },
        });
    },
    visitProfile(event) {
      event.stopPropagation();
      console.log("Visit profile");
      if(this.$route.params.id!=this.post.user._id) this.$router.push({
        name: "UserProfile",
        params: { id: this.post.user._id },
      });
    },

    async deletePost(event) {
      this.loading = true;
      event.stopPropagation();
      const response = await deletePost(this.$route.params.id);
      if (response) {
        this.loading = false;

        this.$emit("deletePost");
      }
    },
  },
  created() {
    if (this.post.tags && this.post.tags[0] != null) this.showtags = true;

    const route = this.$router.currentRoute;

    if (route.matched[0].path == "/post/:id") {
      this.showBtn = true;
    }
  },
};
</script>

<style>
@import url("@/../public/stylesheets/post.css");
</style>
