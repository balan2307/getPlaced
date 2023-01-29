<template>
  <b-navbar toggleable="lg" type="light" class="wrapper" sticky>
    <div class="display">
      <b-navbar-brand href="#">
        <!-- <img id="logo" src="https://res.cloudinary.com/esakki/image/upload/v1674130811/getPlaced/logo_uksup1.png" /> -->
        <router-link to="/oncampus">getPlaced </router-link></b-navbar-brand
      >
      <!-- <b-navbar-nav id="home-nav-mob">
        <b-nav-item href="#"
          ><router-link to="/oncampus">Home</router-link></b-nav-item
        >
      </b-navbar-nav> -->

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
          placeholder="Search by Company"
          v-model="search"
          id="searchtab"
        ></b-form-input>
        <b-button size="sm" id="search-btn" class="my-2 my-sm-0" type="submit"
          >
          <font-awesome-icon :icon="['fas','magnifying-glass']" size="1x"  />
          
        </b-button>
      </b-nav-form>
    </div>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
  
      <b-navbar-nav class="ml-auto" v-if="showNav">
        <b-nav-item-dropdown right>
         
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
      if (path == "/login" || path == "/register") {
        this.showNav = false;
      } else {
        this.showNav = true;
      }
    },
  },
  methods: {
    checkTokenStatus() {
      this.showNav = true;
    },

    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push({ name: "LoginPage" }));

    },

    userSearch() {
       if(this.search) this.search=this.search.replace(/\s+/g, ' ').trim()
      if (this.$route.fullPath != `/posts?search=${this.search}` && this.search) {

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


</style>
