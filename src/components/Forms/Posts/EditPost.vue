<template>
  <div id="postform">
    <NotFound v-if="empty"></NotFound>

    <AlertMessage
      :variant="variant"
      :message="alertmessage"
      ref="alertcomp"
      @alertclose="alertclose"
    ></AlertMessage>

    <div v-if="!empty">
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
          <p class="feedback" v-if="!$v.form.title.required && touched">
            Title cannot be empty
          </p>

          <div id="image-placeholder" v-if="showbtn" class="mb-2">
            <img
              src="@/assets/cancel.svg"
              alt="Icon"
              id="removepic"
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
            class="mb-3"
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
            placeholder="Company for which you attended the interview"
          ></InputField>
          <p class="feedback" v-if="!$v.form.company.required && touched">
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
                name="difficultymode"
                @focus="setTouched"
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
            placeholder="College Name"
            @blur="$v.form.college.$touch()"
          ></InputField>
          <p class="feedback" v-if="!$v.form.college.required && touched">
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
  </div>
</template>

<script>
import InputField from "../Input/InputText.vue";
import FormSelect from "../Input/SelectText.vue";
import TextArea from "../Input/TextArea.vue";
import { eventBus } from "@/main";
import { editPost, getPost } from "@/services/post";
import { required, requiredIf } from "vuelidate/lib/validators";
import AlertMessage from "@/components/Utils/AlertMessage.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "PostEditForm",
  components: { InputField, FormSelect, TextArea, AlertMessage },
  computed: {
    ...mapGetters(["getUid", "isAuthorized"]),
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
      difficulty_mode: "",
      loading: false,
      difftouched: false,
      modetouched: false,
      touched: false,
      error: false,
      errormessage: "",
      alertmessage: "",
      variant: "success",
      empty: false,

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
    alertclose(data) {
      if (data == 0) this.$router.go(-1);
    },
    showToast(msg) {
      this.alertmessage = msg;
      this.$refs.alertcomp.showAlert();
    },

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
        const postImage = this.$refs.file.files[0];

        const data = this.form;

        for (let key in data) {
          if (data[key] == "") delete data[key];
        }

        const fd = new FormData();
        Object.keys(data).forEach((key) => {
          if (data[key] != null && data[key] != undefined) {
            fd.append(key, data[key]);
          }
        });

        let imagedeletion = false;

        if (this.$refs.file.files.length != 0) {
          fd.append(
            "image",
            this.$refs.file.files[0],
            this.$refs.file.files[0].name
          );

          data.image = URL.createObjectURL(this.$refs.file.files[0]); //for eventBus
        }
        if (this.placeholderimage && postImage == undefined) {
          imagedeletion = false;
        } else if (postImage != undefined) {
          imagedeletion = true;
        }
        fd.append("imagedeletion", imagedeletion);


          this.loading = true;

          data.id = this.$route.params.id;
       

          const response = await editPost(this.$route.params.id, fd);

          if (response.status == 200) {
            this.showToast("Post updated successfully!");
            this.loading = false;
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
  async created() {


      try {
        this.loading = true;

        const res = await getPost(this.$route.params.id);

        const {
          college,
          company,
          difficulty,
          title,
          content,
          mode,
          tags,
          image,
        } = res.data.post[0];
        const postUser = res.data.post[0].user._id;
        if (postUser != this.getUid) {
          store.commit("setAuthorized", false);
          this.$router.push({ path: "/oncampus" });
        }

        if (mode == "onCampus") this.campusmode = true;

        this.form.mode = mode;

        if (image) {
          this.showbtn = true;
          this.placeholderimage = image.url;
        }

        Object.assign(this.form, {
          college,
          company,
          difficulty,
          title,
          content,
          mode,
        });

        this.form.tags = tags.join(" ");
        let data = {
          campusmode: mode,
          difficultymode: difficulty,
        };
        eventBus.$emit("modeUpdated", data);
        this.loading = false;
      } catch (err) {
        eventBus.$emit("notfound");
        this.loading = false;
        this.empty = true;
    
      }
    
  },
};
</script>

<style scoped>
@import url("@/../public/stylesheets/editPost.css");
</style>
