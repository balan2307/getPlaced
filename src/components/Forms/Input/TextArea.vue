<template>
     <b-form-textarea
      :rows="row"
      max-rows="6"
      class="mb-2 textArea"
      :value="value"
       @input="updateCode($event)"
      :placeholder="placeholder"
      :id="id"
      :description="description"
    
    ></b-form-textarea>
  
</template>

<script>
export default {
    name:'TextArea',
    props:['value','placeholder','id','row','description'],
      methods:
      {
         updateCode(val)
          {
            
              this.$emit('input',val)
          }
  
      }


}
</script>

<style>


.textArea::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */

.textArea {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}


</style>