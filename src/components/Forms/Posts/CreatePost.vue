<template>
  <div id="postform">
    <p id="form-header">Create a post</p>
    <hr />
   
    <div id="formbody">
      <b-form @submit="onSubmit" enctype="multipart/form-data">
        <InputField
          v-model="form.title"
          id="input-1"
          placeholder="Title"
          :class="{ invalid: $v.form.title.$error }"
         
        ></InputField>
        <p class="feedback" v-if="!$v.form.title.required && touched">Title cannot be empty</p>
        <!-- <p>{{ $v.form.title }}</p> -->
        <!-- <p>{{ $v.form.$invalid  }}</p>
        <p>{{ $v.form.$error }}</p> -->

        <div id="image-placeholder" v-if="showbtn" class="mb-2">
          <box-icon
            id="removeprofile"
            type="solid"
            name="message-alt-x"
            @click="removeselectedImage"
          ></box-icon>
          <b-img
            :src="placeholderimage"
            id="imagepreview"
            fluid
            alt="Fluid image"
          ></b-img>
        </div>

        <TextArea
          id="post-content"
          class="mb-3"
          v-model="form.content"
          row="3"
          placeholder="Describe your interview Expereince"
          :class="{ invalid: $v.form.content.$error }"
        ></TextArea>
        <p class="feedback" v-if="!$v.form.content.required && touched">Content cannot be empty</p>

        <InputField
          v-model="form.company"
          id="input-2"
          placeholder="Company for which you attended the interview"
        ></InputField>
        <p class="feedback" v-if="!$v.form.company.required && (touched)">
              Please mention the company name
          </p> 

        <div id="selectoption" class="mb-3">
          <div id="modeselect">
            <FormSelect
              :options="mode"
              @modeOncampus="modeselected"
              v-model="form.mode"
              :choice="form.mode"
              @focus="setmodeTouched"
              @blur="$v.form.mode.$touch()"
              name="campusmode"
            ></FormSelect>
            <p class="feedback" v-if="!$v.form.mode.required && (modetouched || touched)">
              Please select an option
            </p> 
          </div>

          <div id="modedifficulty">
            <FormSelect
              :options="difficulty"
              v-model="form.difficulty"
              @change="modeselected"
              :choice="form.difficulty"
              @focus="setTouched"
              name="difficultymode"
              @blur="$v.form.difficulty.$touch()"
            ></FormSelect>
            <p class="feedback" v-if="!$v.form.difficulty.required && (difftouched || touched)">
              Please select an option
            </p>  
             <!-- <p>{{ $v.form.difficulty }}</p>
             <p>{{ difftouched }}</p> -->
          </div>
        </div>

        <!-- <TextArea id="post-tags" v-model="form.content" row="1" placeholder="Mention any post related tags"></TextArea> -->

        <InputField
          v-if="campusmode"
          v-model="form.college"
          id="input-3"
          @blur="$v.form.college.$touch()"
          placeholder="College Name"
        ></InputField>
        <p class="feedback" v-if="!$v.form.college.required && (touched)">
              Please mention your College name
          </p>  

        <InputField
          class="mb-1"
          id="post-tags"
          v-model="form.tags"
          placeholder="Mention any post related tags separated by space"
        ></InputField>

        <input
          ref="file"
          @change="previewImage"
          type="file"
          name="image"
          style="display: none"
        />

        <div id="image-upload" class="mb-3">
          Upload image
          <box-icon
            id="post-image"
            name="image-alt"
            @click="$refs.file.click()"
          ></box-icon>
        </div>

        <b-button variant="info" type="submit">Submit</b-button>
<!-- 
        <b-button variant="info" type="submit">Submit</b-button> -->
      </b-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import InputField from "../Input/InputText.vue";
import FormSelect from "../Input/SelectText.vue";
import TextArea from "../Input/TextArea.vue";
import { mapGetters } from 'vuex';
import {createPost} from '@/services/post'
import { required ,requiredIf } from "vuelidate/lib/validators";


export default {
  name: "PostForm",
  components: { InputField, FormSelect, TextArea },
  computed:{

    ...mapGetters(['getUid']),
    
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        company: "",
        mode: "",
        difficulty: "",
        tags: "",
        college: "",
      },
      touched:false,
      placeholderimage: "",
      imageuploaded: "",
      showbtn: false,
      campusmode: false,
      createPost:false,
      difficulty_mode:'',
      difftouched:false,
      modetouched:false,


      mode: [
        { value: null, text: "Select a mode" },
        { value: "onCampus", text: "On Campus" },
        { value: "offCampus", text: "Off Campus" },
      ],
      difficulty: [
        { value: null, text: "Select the difficulty level" },
        { value: "Easy", text: "Easy" },
        { value: "Medium", text: "Medium" },
        { value: "Hard", text: "Hard" },
      ],
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      content: {
        required
      },
      company: {
        required
      },
      difficulty:{
        required
      },
      mode:{
        required
      },
      college:{
        required:requiredIf(inp=>{
          // console.log("INp ",inp.mode)
          return inp.mode=="onCampus"
        })
      }


      
    },
  },
  methods: {
    setTouched()
    {

      console.log("difftouched")
      this.difftouched=true;
     
    },
    setmodeTouched()
    {
      this.modetouched=true;

    },
     async onSubmit(event) {

 
      event.preventDefault();

      if(this.$v.form.$invalid)
      {
      this.$v.$touch()
      this.touched=true;
      }
      else
      {
      
      console.log("post sumbit ", this.form, this.$refs.file.files[0]);
      const data = JSON.parse(JSON.stringify(this.form));

      for (let key in data) {
        if (data[key] == "") delete data[key];
      }

      // console.log("Data ",data,typeof(data))

      const fd = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] != null && data[key] != undefined) {
          console.log("loop",key,data[key])
          fd.append(key, data[key]);
        }
      });
      fd.append("id",this.getUid)

      console.log("FD ",fd)

      if(this.$refs.file.files.length!=0){
      
        console.log("Image uploaded",this.$refs.file.files[0],this.$refs.file.files[0].name)
      fd.append("image", this.$refs.file.files[0], this.$refs.file.files[0].name);
      }
    

     
      try{
        // axios.post("http://localhost:3000/user/post",fd
      
      const response=await createPost(fd);
      console.log("respsonse what",response)
      if(response.status==200)
      {
        // this.$router.push('/')
        console.log("Response frontend",response)
        this.$router.push({ path:'/oncampus'})
      }
       
      }
      catch(err)
      {
        console.log("err",err)
      }
        
    }
     
    },

    modeselected() {
      console.log("Mode selected");
      if (this.form.mode == "onCampus") {
        console.log("Oncampus");
        this.campusmode = true;
        console.log("mode ", this.campusmode);
      } else this.campusmode = false;
    },
    previewImage() {
      console.log("Image");
      this.showbtn = true;
      this.placeholderimage = URL.createObjectURL(this.$refs.file.files[0]);
      const placeholder = document.getElementById("image-placeholder");
      console.log("checkkk ", placeholder);
    },
    removeselectedImage() {
      this.$refs.file.value = null;
      this.showbtn = false;
    },
  },
   created() {
    console.log("prev path")
   
  },
};
</script>

<style>
#postform {
  margin-top: 20px;
  padding-bottom: 10px;
}
#form-header {
  font-size: 1.2em;
  font-weight: 600;
}
form input {
  margin-bottom: 5px;
}

#formbody {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
}

#modeselect,
#modedifficulty {
  width: 48%;
  display: inline-block;
}

#post-image {
  position: relative;
  top: 5px;
}

#image-placeholder {
  border: 1px solid #ced4da;
  border-radius: 3px;
  padding: 5px;
  width: 50%;
}

#image-upload {
  color: #7d858c;
}
#post-content::-webkit-scrollbar,
#post-tags::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#post-content,
#post-tags {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#post-tags {
  font-weight: 600;
}

#post-tags::placeholder {
  font-weight: 400;
}

#selectoption {
  display: flex;
  justify-content: space-between;
}

#post-content:focus,
#post-tags:focus {
  /* border: none!important; */
  /* border-color: rgb(31, 32, 32); */
  outline: none !important;
  -webkit-box-shadow: none;
  box-shadow: none;
  /* border:1px solid red */
}

#removeprofile {
  position: relative;
  left: 280px;
}

#imagepreview {
  width: 100%;
  height: 200px;
}

.feedback
{
  font-size: 0.8em;
  border: red;
  margin: 0;
  
}

@media only screen and (max-width: 1070px) {
  #createpost {
    height: 60%;
    width: 80%;
  }

  #postBtn {
    top: 0;
  }

  #postBtn .btn {
    width: 60%;
  }
}
</style>
