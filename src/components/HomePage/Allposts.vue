<!-- Posts on home page -->

<template>
  <div id="displayallposts">
    <LoadingIcon :loading="loading"></LoadingIcon>
    <ShowBtn btntext="Create Post" :link="link"></ShowBtn>

    <div>
      <div id="tab">
        <div id="tab1" :class="tab1active">
          <span class="tab-name" >
            <router-link :class="link1active" to="/oncampus">
              OnCampus</router-link
            >
          </span>
        </div>

        <div id="tab2" :class="tab2active">
          <span class="tab-name" 
            ><router-link :class="link2active" to="/offcampus">
              OffCampus</router-link
            ></span
          >
        </div>
      </div>

      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import ShowBtn from "../Utils/ShowBtn.vue";
import {mapGetters} from 'vuex'

export default {
  name: "AllPosts",
  components: { ShowBtn },
  computed:
    {  ...mapGetters(['getUid','getUserName'])
        
    },
  data() {
    return {
      posts: [],
      loading: false,
      tab1active: "",
      tab2active: "",
      link1active: "",
      link2active: "",
      link:''
    };
  },

  async created() {


    this.link=`/user/posts/${this.getUid}/add`
    console.log("check",this.getUid)

    // this.link=`/user/posts/${getUid}/add`
    if (this.$route.path == "/oncampus") {
      this.tab1active = "active";
      this.tab2active = "";
      this.link1active = "a-active";
      this.link2active = "";
    } else {

      this.tab2active = "active";
      this.tab1active = "";
      this.link2active = "a-active";
      this.link1active = "";
    }
  },
};
</script>

<style>
#displayallposts {
  padding-bottom: 10px;
}

#tab {
  display: flex;
  justify-content: space-evenly;
}

#tab1 a,
#tab2 a {
  color: rgb(14, 13, 13);
  text-decoration: none;
}

#tab1,
#tab2 {
  width: 50%;
  text-align: center;
  padding: 3px;
  border: 1px solid rgb(218, 211, 211);
  border-radius: 8px;
  background-color: white;
}

#tab1 {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
#tab2 {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

#tab1:hover,
#tab2:hover {
  background-color: rgb(201, 211, 211);
}

.a-active {
  color: rgb(255, 255, 255) !important;
  text-decoration: none;
}

.active {
  background-color: #848f8b !important;
}


.tab-name {
  font-weight: 500;
  font-size: 1.2em;
}
</style>
