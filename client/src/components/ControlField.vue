<template>
  <div v-if="this.type === 'BlogTitle'" :style="[style]">
    <div :style="[styleLabel, styleLabelBlog]">{{ label }}</div>
    <textarea
      :value="value"
      :rows="rows"
      @change="handleInputChange($event)"
      :style="[styleTextArea]"
    ></textarea>
    <div :style="[styleLabel, styleError]">{{ errorMessage }}</div>
  </div>

  <div v-else-if="this.type === 'BlogContent'" :style="[style]">
    <div :style="[styleLabel, styleLabelBlog]">{{ label }}</div>
    <textarea
      :value="value"
      :rows="rows"
      @change="handleInputChange($event)"
      :style="[styleTextArea]"
    ></textarea>
    <div :style="[styleLabel, styleError]">{{ errorMessage }}</div>
  </div>

  <div v-else-if="this.type === 'DishTitle'" :style="[style]">
    <div :style="[styleLabel, styleLabelDish]">{{ label }}</div>
    <textarea
      :value="value"
      :rows="rows"
      @change="handleInputChange($event)"
      :style="[styleTextArea]"
      :disabled="label === 'Dish Id'"
    ></textarea>
    <div :style="[styleLabel, styleError]">{{ errorMessage }}</div>
  </div>

  <div v-else-if="this.type === 'AccountEdit'" :style="[style]">
    <div :style="[styleLabel, styleLabelDish]">{{ label }}</div>
    <textarea
      :value="value"
      :rows="rows"
      @change="handleInputChange($event)"
      :style="[styleTextArea]"
    ></textarea>
    <div :style="[styleLabel, styleError]">{{ errorMessage }}</div>
  </div>

  <div v-else-if="this.type === 'DishDescription'" :style="[style]">
    <div :style="[styleLabel, styleLabelDish]">{{ label }}</div>
    <textarea
      :value="value"
      :rows="rows"
      @change="handleInputChange($event)"
      :style="[styleTextArea, styleTextAreaDishDescription]"
    ></textarea>
    <div :style="[styleLabel, styleError]">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "ControlField",
  props: {
    label: String,
    width: {
      type: String,
      default: "100%",
    },
    rows: {
      type: String,
      default: "2",
    },
    type: String,
    value: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInputChange(event) {
      this.$emit("onInputChange", event.target.value);
    },
  },
  data() {
    return {
      style: {
        width: this.width,
        display: "flex",
        margin: "20px auto",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      },
      styleLabel: {
        marginBottom: "12px",
        width: "100%",
        fontFamily: "Poppins",
        fontWeight: "700",
        fontSize: "18px",
      },
      styleLabelBlog: {
        color: "#1c1c1c",
      },
      styleLabelDish: {
        color: "#223263",
      },
      styleError: {
        color: "red",
      },
      styleTextArea: {
        width: "100%",
        // height: this.height,
        fontFamily: "Poppins",
        padding: "16px 32px",
        fontSize: "12px",
        color: "#9098b1",
        lineHeight: "180%",
        letterSpacing: "0.5px",
        fontWeight: "bold",
        boxSizing: "border-box",
        border: "1px solid #ebf0ff",
        borderRadius: "5px",
        resize: "none",
      },
      styleTextAreaDishDescription: {
        color: "#6a6a6a",
      },
    };
  },
};
</script>

<style></style>
