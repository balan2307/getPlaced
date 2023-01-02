<template>
  
    <!-- <input type="text" :value="inputValue" @input="updateCode($event.target.value)"> -->

    <b-form-input
          :value="value"
          @input="updateCode($event)"
          :placeholder="placeholder"
      
          :id="id"
          type="text"></b-form-input>
    
  </template>
  

  
  <script>
  
  
  export default {
      name:'InputField',
      props:['value','placeholder','id','description'],
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
  
  </style>