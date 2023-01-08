<template>
      <div class="mb-3 btn-mob" >
      <b-button>
        <router-link :to="{name:`${name}` }">{{ btntext }}</router-link>
       </b-button>
    </div>
</template>

<script>
export default {
    name:'ShowBtn',
    props:['btntext','name']

}
</script>

<style>
.btn-mob a{
color: white;
text-decoration: none;


}

.btn-mob
{
  display: none;
}

@media only screen and (max-width: 900px)
 {
  .btn-mob {
color: white;
text-decoration: none;
display: block;

}

 }

</style>