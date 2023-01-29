<template>
  <div class="paginationComponents">
    <ul>
      <li
        v-for="(page, index) in pages"
        :key="index"
        :class="currentpage == index + 1 ? 'activepage' : ''"
      >
        <router-link
          :class="currentpage == index + 1 ? 'linkactive' : ''"
          :to="pageLink(index)"
          >{{ index + 1 }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaginationSection",
  props: ["pages"],
  data() {
    return {
      currentpage: this.$route.query.page || 1,
      searchedfor: this.$route.query.search,
    };
  },
  methods: {
    pageLink(index) {
      if (this.$route.path == "/posts")
        return {
          path: "/posts",
          query: { search: `${this.searchedfor}`, page: `${index + 1}` },
        };
      return `${this.$route.path}?page=${index + 1}`;
    },
  },
};
</script>

<style scoped>
#displayallposts {
  margin-top: 10px;
}

#tab span,
#tab a {
  width: 100%;
  display: inline-block;
}

.paginationComponents {
  display: flex;
  justify-content: center;
}

.paginationComponents ul {
  list-style: none;
  display: flex;
  padding: 0;
}
.paginationComponents li {
  padding: 8px;
  border: 1px solid #bbaaaa;
  background-color: white;
}

.paginationComponents li:hover {
  background-color: rgb(224, 216, 216);

  color: white;
}

.activepage {
  background-color: #b7b7b7 !important;
}
.linkactive {
  color: white;
}
a {
  color: black;
}

a:hover {
  text-decoration: none;
  color: white;
}
</style>
