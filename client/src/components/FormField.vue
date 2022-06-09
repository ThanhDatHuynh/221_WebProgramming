<template>
  <div v-if="this.type === 'UsernameIcon'" :style="[this.style]">
    <v-text-field
      background-color="white"
      solo
      outlined
      :error-messages="errorMessage"
      :value="value"
      :placeholder="placeHolder"
      :name="name"
      no-resize
      @change="handleInputChange($event)"
      color="blue"
      class="account-form-field"
    >
      <template v-slot:label>
        <v-icon>mdi-account-outline</v-icon>
        {{ label }}
      </template>
    </v-text-field>
  </div>

  <div v-else-if="this.type === 'PasswordIcon'" :style="[this.style]">
    <v-text-field
      background-color="white"
      solo
      type="password"
      outlined
      :error-messages="errorMessage"
      :value="value"
      :placeholder="placeHolder"
      :name="name"
      no-resize
      class="account-form-field"
      @change="handleInputChange($event)"
    >
      <template v-slot:label>
        <v-icon>mdi-lock-outline</v-icon>
        {{ label }}
      </template>
    </v-text-field>
  </div>

  <div v-else-if="this.type === 'EmailIcon'" :style="[this.style]">
    <v-text-field
      outlined
      background-color="white"
      solo
      :error-messages="errorMessage"
      :value="value"
      :placeholder="placeHolder"
      :name="name"
      no-resize
      class="account-form-field"
      @change="handleInputChange($event)"
    >
      <template v-slot:label>
        <v-icon>mdi-email-outline</v-icon>
        {{ label }}
      </template>
    </v-text-field>
  </div>

  <div v-else-if="this.type === 'PhoneIcon'" :style="[this.style]">
    <v-text-field
      background-color="white"
      solo
      outlined
      :error-messages="errorMessage"
      :value="value"
      :placeholder="placeHolder"
      :name="name"
      no-resize
      class="account-form-field"
      @change="handleInputChange($event)"
    >
      <template v-slot:label>
        <v-icon>mdi-phone-outline</v-icon>
        {{ label }}
      </template>
    </v-text-field>
  </div>

  <div v-else-if="this.type === 'PasswordNoLabel'" :style="[this.style]">
    <div :style="[styleLabel, styleLabelDish]">{{ label }}</div>
    <v-text-field
      background-color="white"
      solo
      :error-messages="errorMessage"
      :value="value"
      outlined
      label=""
      type="password"
      prepend-inner-icon="mdi-lock-outline"
      :placeholder="placeHolder"
      :name="name"
      no-resize
      class="account-form-field"
      @change="handleInputChange($event)"
    >
      {{ label }}
    </v-text-field>
  </div>

  <div v-else-if="this.type === 'NoIcon'" :style="[this.style]">
    <v-text-field
      background-color="white"
      solo
      class="reservation-input"
      :error-messages="errorMessage"
      :value="value"
      filled
      rounded
      dense
      :label="label"
      :placeholder="label"
      :name="name"
      no-resize
      @change="handleInputChange($event)"
    >
      {{ label }}
    </v-text-field>
  </div>

  <div v-else-if="this.type === 'NoIconMessage'" :style="[this.style]">
    <v-textarea
      background-color="white"
      solo
      class="reservation-input"
      :error-messages="errorMessage"
      :value="value"
      filled
      rounded
      dense
      :label="label"
      :placeholder="label"
      :name="name"
      :rows="5"
      no-resize
      @change="handleInputChange($event)"
    >
      {{ label }}
    </v-textarea>
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "50px",
    },
    type: {
      type: String,
      default: "NoIcon",
    },
    content: {
      type: String,
      default: "",
    },
    placeHolder: {
      type: String,
      default: "",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    margin: {
      type: String,
      default: "0px",
    },
    name: {
      type: String,
    },
    // Input form submit value
    value: {
      type: String,
      default: "",
    },
    // Error messages
    errorMessage: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      style: {
        margin: this.margin,
        width: this.width,
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
      styleTextArea: {
        width: "100%",
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

  methods: {
    handleInputChange(newValue) {
      this.$emit("onInputChange", newValue);
    },
  },

  computed: {},
};
</script>

<style class="sass" scoped>
@import "../sass/variables.scss";
</style>
