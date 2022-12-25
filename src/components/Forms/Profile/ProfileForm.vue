<template>
  
  <div id="postform">
    <p id="form-header">Update your Profile</p>
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

   
       
        <b-form-input
          id="input-3"
          v-model="form.collegename"
          type="text"
          placeholder="College Name"
          required
        ></b-form-input>
 

        <b-form-input
          id="input-4"
          v-model="form.university"
          type="text"
          placeholder="University"
          required
        ></b-form-input>

        <b-form-file
      v-model="form.profileimage"
      :state="Boolean(form.profileimage)"
      placeholder="Profile picture"
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ form.profileimage ? form.profileimage.name : '' }}</div>


 

    
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
          username:'',
          collegename:'',
          university:'',
          profileimage:null

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
    margin-bottom: 15px;
}

#formbody
{
    background-color: white;
    padding: 30px;
    border-radius: 5px;

}

</style>