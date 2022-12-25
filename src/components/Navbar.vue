<template>

    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand href="#"> <router-link to="/">getPlaced</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"></b-nav-item>
          <b-nav-item href="#"><router-link to="/post/1">Home</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

</template>

<script>


export default {
  name: "NavHeader",
 
};
</script>
.navbar{ background-color:'white' }
<style>
nav a{
  color: black;
  text-decoration: none!important;
}
nav a:hover
{
  color:black
}
</style>
