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
        <p class="feedback" v-if="!$v.form.title.required && touched">
          Title cannot be empty
        </p>

        <div id="image-placeholder" v-if="showbtn" class="mb-2">
          <img
            src="@/assets/cancel.svg"
            alt="Icon"
            id="removeprofile"
            @click="removeselectedImage"
          />

          <b-img
            :src="placeholderimage"
            id="imagepreview"
            fluid
            alt="Fluid image"
          ></b-img>
        </div>

        <TextArea
          id="post-content"
          class="mb-2"
          v-model="form.content"
          row="3"
          placeholder="Describe your interview Expereince"
          :class="{ invalid: $v.form.content.$error }"
        ></TextArea>
        <p class="feedback" v-if="!$v.form.content.required && touched">
          Content cannot be empty
        </p>

        <InputField
          v-model="form.company"
          id="input-2"
          placeholder="Company name"
        ></InputField>
        <p class="feedback" v-if="!$v.form.company.required && touched">
          Please mention the company name
        </p>

        <div id="selectoption" class="mb-2">
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
            <p
              class="feedback"
              v-if="!$v.form.mode.required && (modetouched || touched)"
            >
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
            <p
              class="feedback"
              v-if="!$v.form.difficulty.required && (difftouched || touched)"
            >
              Please select an option
            </p>
          </div>
        </div>

        <InputField
          v-if="campusmode"
          v-model="form.college"
          id="input-3"
          @blur="$v.form.college.$touch()"
          placeholder="College Name"
        ></InputField>
        <p class="feedback" v-if="!$v.form.college.required && touched">
          Please mention your College name
        </p>

        <InputField
          class="mb-1"
          id="post-tags"
          v-model="form.tags"
          placeholder="Tags for greater reach"
        ></InputField>
        <p class="instruction">Mention tags separated by space</p>

        <input
          ref="file"
          @change="previewImage"
          type="file"
          name="image"
          style="display: none"
        />

        <div id="image-upload" class="mb-3">
          Upload image

          <img
            src="@/assets/image.svg"
            alt="Icon"
            id="post-image"
            name="image-alt"
            @click="$refs.file.click()"
          />
        </div>

        <b-button variant="info" type="submit">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import InputField from "../Input/InputText.vue";
import FormSelect from "../Input/SelectText.vue";
import TextArea from "../Input/TextArea.vue";
import { mapGetters } from "vuex";
import { createPost } from "@/services/post";
import { required, requiredIf } from "vuelidate/lib/validators";

export default {
  name: "PostForm",
  components: { InputField, FormSelect, TextArea },
  computed: {
    ...mapGetters(["getUid"]),
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
      touched: false,
      placeholderimage: "",
      imageuploaded: "",
      showbtn: false,
      campusmode: false,
      createPost: false,
      difficulty_mode: "",
      difftouched: false,
      modetouched: false,

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
        required,
      },
      company: {
        required,
      },
      difficulty: {
        required,
      },
      mode: {
        required,
      },
      college: {
        required: requiredIf((inp) => {
          return inp.mode == "onCampus";
        }),
      },
    },
  },
  methods: {
    setTouched() {
      this.difftouched = true;
    },
    setmodeTouched() {
      this.modetouched = true;
    },
    async onSubmit(event) {
      event.preventDefault();

      if (this.$v.form.$invalid) {
        this.$v.$touch();
        this.touched = true;
      } else {
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
        fd.append("id", this.getUid);

        if (this.$refs.file.files.length != 0) {
          fd.append(
            "image",
            this.$refs.file.files[0],
            this.$refs.file.files[0].name
          );
        }

   
          const response = await createPost(fd);

          if (response.status == 200) {
            this.$router.push({ path: "/oncampus" });
          }
     
      }
    },

    modeselected() {
      if (this.form.mode == "onCampus") {
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
};
</script>

<style scoped>
@import url("@/../public/stylesheets/createPost.css");

</style>
