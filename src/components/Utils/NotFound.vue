<template>
  <div class="page-message">
    <p id="message">This page doesn’t exist. Try searching for something else.</p>
  </div>
</template>

<script>
export default {
    name:'NotFound'

}
</script>

<style>
.page-message{
    display: flex;
    justify-content: right;
}

#message{


    font-size: 30px;
    color: #565656;
}

</style>