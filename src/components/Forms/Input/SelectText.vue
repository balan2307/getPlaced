<template>
  <b-form-select
    v-model="selected"
    :choice="choice"
    :name="name"
    :options="options"
    @change="optionSelected"
  ></b-form-select>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "FormSelect",
  data() {
    return {
      selected: this.choice || null,
    };
  },
  methods: {
    optionSelected() {
      this.$emit("input", this.selected);
      this.$emit("focus", this.selected);
      this.$emit("modeOncampus");
    },
  },
  props: {
    options: {
      type: Array,
    },
    choice: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  created() {
    eventBus.$on("modeUpdated", (data) => {
      if (this.name == "campusmode") this.selected = data.campusmode;
      else this.selected = data.difficultymode;
    });
  },
};
</script>

<style></style>
