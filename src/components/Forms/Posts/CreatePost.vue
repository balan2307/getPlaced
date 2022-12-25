<template>
  
  <div id="postform">
    <p id="form-header">Create a post</p>
    <hr>
    <div id="formbody">
    <b-form @submit="onSubmit" @reset="onReset" >

      
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Your name"
          required
        ></b-form-input>

        <b-form-input
          id="input-2"
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
        ></b-form-input>
 

    
    </b-form>
    </div>
  </div>
</template>

<script>
export default {
    name:'PostForm',
    data() {
      return {
        form: {
          email: '',
          name: '',
          username:''

        }
      }
    }
    ,
    methods:
    {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }


}
</script>

<style>
#postform
{
    margin-top: 20px;
}
#form-header

{
    font-size: 1.2em;
    font-weight: 600;
}
form input
{
    margin-bottom: 5px;
}

#formbody
{
    background-color: white;
    padding: 10px;
    border-radius: 5px;
}

</style>