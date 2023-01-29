<template>
    <div>

  
   
  
  
      <b-alert
        :show="dismissCountDown"
   
        :variant="variant"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p> {{ message }} </p>
        <b-progress
          :variant="variant"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="3px"
        ></b-progress>
      </b-alert>
  

    </div>
  </template>
  
  <script>
    export default {
    name:'AlertMessage',
      data() {
        return {
          dismissCountDown: 0,
          dismissSecs:2,
          showDismissibleAlert: false
        }
      },
      props:['message','variant'],
      methods: {
        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
          this.$emit("alertclose",this.dismissCountDown)
        },
        showAlert() {
          this.dismissCountDown = this.dismissSecs
     
        }
      }
    }
  </script>