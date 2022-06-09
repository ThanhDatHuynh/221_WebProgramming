<template>
  <div v-if="text == 'Confirm'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleConfirm]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'Cancel'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleConfirm, styleCancel]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'Edit'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleEdit]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'Delete'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleEdit, styleDelete]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'Create Account'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleCreate]"
      >{{ text }}</v-btn
    >
  </div>


  <div v-else-if="text == 'Add Product'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleAddPd]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'Add New Picture'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleAddPt]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'Book Your Table' || text == 'Book My Table'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleBook]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'Explore More'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="[style, styleBook]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else-if="text == 'White Button'">
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="0"
      :style="[styleWhite]"
      >{{ text }}</v-btn
    >
  </div>

  <div v-else>
    <v-btn
      :disabled="isDisabled"
      @click="raiseEvent"
      elevation="2"
      :style="style"
      >{{ text }}</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    width: String,
    height: String,
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    raiseEvent() {
      this.$emit("onClick");
    },
  },

  data() {
    return {
      styleWhite: {
        width: this.width,
        height: this.height,
        color: "white",
        background: "white",
        borderRadius: "5px",
        fontSize: "18px",
        padding: "16px",
        cursor: "auto",
      },
      style: {
        width: this.width,
        height: this.height,
        color: "white",
        background: "#e1651f",
        borderRadius: "5px",
        fontSize: "18px",
        padding: "16px",
      },
      styleConfirm: {
        borderRadius: "6px",
      },
      styleCancel: {
        color: "#c4c4c4",
        background: "transparent",
        border: "1px solid #c4c4c4",
      },
      styleEdit: {
        borderRadius: "50px",
        fontSize: "14px",
      },
      styleDelete: {
        background: "black",
      },
      styleCreate: {
        borderRadius: "0px",
        fontSize: "14px",
      },
      styleAddPd: {
        borderRadius: "15px",
      },
      styleAddPt: {
        color: "#e1651f",
        background: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      styleBook: {
        borderRadius: "39px",
        fontSize: "14px",
      },
    };
  },
};
</script>
