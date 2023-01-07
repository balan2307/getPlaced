<template>
  

  <div class="errorDisplay" v-if="error">
      <p id="err-message">{{ errormessage }}</p>
</div>
</template>

<script>
export default {
    name:'errorMessage',
    props:['errormessage','error']

}
</script>

<style>
#err-message{
  font-weight:500;
  margin: 0;
  padding: 10px;
}
.errorDisplay{
  border: 1px solid rgb(228, 197, 197);
  border-radius: 5px;
  background-color: rgb(228, 126, 151);
  color: white;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  
 
}


</style>