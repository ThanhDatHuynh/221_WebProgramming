<template>
  <div :style="[style]">
    <p>{{ this.content }}</p>
  </div>
</template>

<script>
export default {
  name: "Paragraph",
  props: {
    content: {
      type: String,
      default: "No Content Paragraph",
    },
    width: {
      type: String,
      default: "100%",
    },
    fontSize: {
      type: String,
      default: "16px",
    },
    fontWeight: {
      type: Number,
      default: 400,
    },
    wordSpacing: {
      type: String,
      default: "2px",
    },
    lineHeight: {
      type: Number,
      default: 1.6,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    fontFamily: {
      type: String,
      default: "Poppins",
    },
    color: {
      type: String,
      default: "#6a6a6a",
    },
    textAlign: {
      type: String,
      default: "justify",
    },
  },
  data() {
    return {
      style: {
        width: this.width,
        margin: "20px auto",
        fontSize: this.fontSize,
        fontWeight: this.fontWeight,
        wordSpacing: this.wordSpacing,
        backgroundColor: this.backgroundColor,
        lineHeight: this.lineHeight,
        fontFamily: this.fontFamily,
        color: this.color,
        whiteSpace: "pre-line",
        textAlign: this.textAlign,
      },
    };
  },
};
</script>

<style></style>
