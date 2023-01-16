<template>
  <b-navbar toggleable="lg" type="light" class="wrapper" sticky>
    <b-navbar-brand href="#">
      <router-link to="/oncampus">getPlaced </router-link></b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"></b-nav-item>
        <b-nav-item href="#"
          ><router-link to="/oncampus">Home</router-link></b-nav-item
        >
        <!-- <b-nav-item href="#"><router-link to="/user/post/63b144f73b786619a47bb9f6">Test</router-link></b-nav-item> -->
      </b-navbar-nav>

      <b-nav-form
        v-if="showNav"
        @submit.prevent
        @submit="userSearch"
        class="ml-auto"
        id="searchposts"
      >
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Search"
          v-model="search"
        ></b-form-input>
        <b-button size="sm" id="search-btn" class="my-2 my-sm-0" type="submit"
          >Search</b-button
        >
      </b-nav-form>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="showNav">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ getUserName }} </em>
          </template>
          <b-dropdown-item>
            <router-link :to="`/user/profile/${getUid}`"
              >Profile</router-link
            ></b-dropdown-item
          >
          <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

// import {getUserName} from '../services/user'

export default {
  name: "NavHeader",
  props: ["user"],
  data() {
    return {
      username: "",
      search: this.$route.query.search,
      showNav: false,
    };
  },
  watch: {
    "$route.path": function (path) {
      if (path == "/login" || path=="/register") {
        this.showNav = false;
      } else {
        this.showNav = true;
      }
    },
  },
  methods: {
    checkTokenStatus(status) {
      console.log("watch stat", status);
      this.showNav = true;
    },

    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push({ name: "LoginPage" }));
      // this.showNav=false
    },

    userSearch() {
      if (this.$route.fullPath != `/posts?search=${this.search}`) {
        console.log("chj");
        this.$router.push({ path: "/posts", query: { search: this.search } });
      }
    },
  },
  computed: {
    ...mapGetters([
      "isAuthenticated",
      "getUid",
      "getUserName",
      "getTokenstatus",
    ]),
    getuser() {
      return this.$store.state.uid;
    },
  },
};
</script>

<style>
@import url("./../../public/stylesheets/navbar.css");

.wrapper {
  position: sticky;
  top: 0;
}

li.form-inline {
  width: 100%;
  display: flex;
  justify-content: right;
  margin-right: 10px;
}

#search-btn {
  position: relative;
  bottom: 4px;
}
</style>
