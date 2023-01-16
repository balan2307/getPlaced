
<template>
    <div id="postform">
      <errorMessage :error="error" :errormessage="errormessage"></errorMessage>
      <AlertMessage :variant="variant" :message="alertmessage" ref="alertcomp" @alertclose="alertclose"></AlertMessage>

      <p id="form-header">Edit post</p>
      <hr />
      <LoadingIcon :loading="loading"></LoadingIcon>
      <div id="formbody" v-if="!loading">
        <b-form @submit="onSubmit" enctype="multipart/form-data">
          <InputField
            v-model="form.title"
            id="input-1"
            placeholder="Title"
            :class="{ invalid: $v.form.title.$error }"
          ></InputField>
          <p class="feedback" v-if="!$v.form.title.required && touched">Title cannot be empty</p>


  
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
                name="difficultymode"
                @focus="setTouched"
                @blur="$v.form.difficulty.$touch()"
              ></FormSelect>
              <p class="feedback" v-if="!$v.form.difficulty.required && (difftouched || touched)">
              Please select an option
            </p>  
            </div>
          </div>
  
          <!-- <TextArea id="post-tags" v-model="form.content" row="1" placeholder="Mention any post related tags"></TextArea> -->
  
          <InputField 
            v-if="campusmode"
            v-model="form.college"
            id="input-3"
            placeholder="College Name"
            @blur="$v.form.college.$touch()"
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
  import { eventBus } from "@/main";
  import {editPost,getPost} from '@/services/post'
  import { required ,requiredIf } from "vuelidate/lib/validators";
  import AlertMessage from '@/components/Utils/AlertMessage.vue'
  
  export default {
    name: "PostEditForm",
    components: { InputField, FormSelect, TextArea ,AlertMessage},
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
        placeholderimage: "",
        imageuploaded: "",
        showbtn: false,
        campusmode: false,
        createPost:false,
        difficulty_mode:'',
        loading:false,
        difftouched:false,
      modetouched:false,
      touched:false,
      error:false,
      errormessage:'',
      alertmessage:'',
      variant:'success',
  
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

          return inp.mode=="onCampus"
        })
      }


      
    },
  },
    methods: {
      alertclose(data)
      {
       if(data==0)  this.$router.go(-1);
      },
      showToast(msg)
      {
        this.alertmessage=msg
        this.$refs.alertcomp.showAlert();
      },

      setTouched()
    {

  
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
      else{

    
        const postImage=this.$refs.file.files[0];
     
        const data = JSON.parse(JSON.stringify(this.form));
  
        for (let key in data) {
          if (data[key] == "") delete data[key];
        }
  

  
        const fd = new FormData();
        Object.keys(data).forEach((key) => {
          if (data[key] != null && data[key] != undefined) {

            fd.append(key, data[key]);
          }
        });
      
  
 
        let imagedeletion=false;
  
        if(this.$refs.file.files.length!=0){
        

        fd.append("image", this.$refs.file.files[0], this.$refs.file.files[0].name);

        data.image=URL.createObjectURL(this.$refs.file.files[0]);
        }
        if(this.placeholderimage && postImage==undefined)
        {
            imagedeletion=false;
        }
        else if(postImage!=undefined)
        {
            imagedeletion=true;


        }
        fd.append('imagedeletion',imagedeletion)
  
       
        try{
          this.loading=true;
   

         data.id=this.$route.params.id ;
         eventBus.$emit("postUpdated",data);
      
         const response=await editPost(this.$route.params.id,fd);
     

         if(response.status==200) {
          this.showToast("Post updated successfully!");


         
         }


        
        }
        catch(err)
        {
          console.llog("error in editing",err)
        }
        finally{
          this.loading=false

        }
      }
          
       
      },
      
  
      modeselected() {

        if (this.form.mode == "onCampus") {
          // console.log("Oncampus");
          this.campusmode = true;
    
        } else this.campusmode = false;
      },


      previewImage() {
      
        this.showbtn = true;
        this.placeholderimage = URL.createObjectURL(this.$refs.file.files[0]);
    
      },
      removeselectedImage() {
        this.$refs.file.value = null;
        this.showbtn = false;
      },
    },
    async created() {
      
     

      if (this.mode == "onCampus") console.log("Created");
      const router=this.$router.currentRoute.matched[0].path;
      if(router.includes('add'))
      {
        this.createPost=true;

  
      }
      else
      {

       try{
        
      
  
 
        this.loading=true;

         const res=await getPost(this.$route.params.id)

            
  
            const {college,company,difficulty,title,content,mode,tags,image} =res.data.post[0];
               if(mode=='onCampus') this.campusmode=true;
        
               this.form.mode=mode
  
               if(image)
               {
                this.showbtn=true;
                this.placeholderimage=image.url;
               }
  
                Object.assign(this.form, {
              college,
              company,
              difficulty,
              title,
              content,
              mode
            })

            this.form.tags=tags.join(" ")
            let data={
              'campusmode':mode,
              'difficultymode':difficulty
            }
            eventBus.$emit("modeUpdated",data);
            this.loading=false;

  
  
       }
       catch(err)
       {
        console.log("Error ",err)
  
       }
  
      }
    },
  };
  </script>
  
  <style>
  .feedback
{
  font-size: 0.8em;
  color: red;
  margin: 0;
  
}
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
  
  @media only screen and (max-width: 1070px) {
    #createpost {
      height: 60%;
      /* width: 80%; */
    }
  
    #postBtn {
      top: 0;
    }
  
    #postBtn .btn {
      width: 60%;
    }
  }
  </style>
  