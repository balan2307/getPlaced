<template>
  

    <b-form-input
          :value="value"
          @input="updateCode($event)"
          @blur="onBlur($event)"
          :placeholder="placeholder"
      
          :id="id"
          :type="type"></b-form-input>
    
  </template>
  

  
  <script>
  
  
  export default {
      name:'InputField',
      props:['value','placeholder','id','description','type'],
      methods:
      {
         updateCode(val)
          {
            
              this.$emit('input',val)
          },

          onBlur(val)
          {
            this.$emit('blur',val)
            this.$emit('visited',val)
           


          }
  
      }

      
  
  }
  </script>
  
  <style>
  
  </style>