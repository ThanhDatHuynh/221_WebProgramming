<template>
  <div v-if="type === 'Login'">
    <v-form class="d-flex flex-wrap justify-center">
      <FormField
        @onInputChange="handleFormChange($event, 'username')"
        ref="username"
        name="username"
        :value="data.username"
        type="UsernameIcon"
        :label="'Username'"
        :errorMessage="errorMessages.username"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'password')"
        ref="password"
        name="password"
        :value="data.password"
        type="PasswordIcon"
        :label="'Password'"
        :errorMessage="errorMessages.password"
      />
      <Button
        @onClick="handleSumbit"
        text="Sign in"
        width="257px"
        height="64px"
        :isDisabled="isDisabled"
      />
    </v-form>
  </div>

  <div v-else-if="type === 'Register'">
    <v-form class="d-flex flex-wrap justify-center">
      <FormField
        @onInputChange="handleFormChange($event, 'username')"
        name="username"
        :value="data.username"
        type="UsernameIcon"
        :label="'Username'"
        :errorMessage="errorMessages.username"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'phone')"
        name="phone"
        :value="data.phone"
        type="PhoneIcon"
        :label="'Phone'"
        :errorMessage="errorMessages.phone"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'email')"
        name="email"
        :value="data.email"
        :errorMessage="errorMessages.email"
        type="EmailIcon"
        :label="'Email'"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'password')"
        name="password"
        :value="data.password"
        type="PasswordIcon"
        :label="'Password'"
        :errorMessage="errorMessages.password"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'confirmPassword')"
        name="confirmPassword"
        :value="data.confirmPassword"
        type="PasswordIcon"
        :label="'Confirm Password'"
        :errorMessage="errorMessages.password"
      />
      <Button
        @onClick="handleSumbit"
        text="Sign up"
        width="257px"
        height="64px"
        :isDisabled="isDisabled"
      />
    </v-form>
  </div>

  <div v-else-if="type === 'EditAccount'">
    <v-form class="d-flex flex-wrap justify-center">
      <ControlField
        @onInputChange="handleFormChange($event, 'username')"
        type="AccountEdit"
        label="Name"
        width="100%"
        rows="2"
        :value="data.username"
        :errorMessage="errorMessages.username"
      />
      <ControlField
        @onInputChange="handleFormChange($event, 'phone')"
        type="AccountEdit"
        label="Phone"
        width="100%"
        rows="2"
        :value="data.phone"
        :errorMessage="errorMessages.phone"
      />
      <ControlField
        @onInputChange="handleFormChange($event, 'email')"
        type="AccountEdit"
        label="Email"
        width="100%"
        rows="2"
        :errorMessage="errorMessages.email"
        :value="data.email"
      />
      <Button
        @onClick="handleSumbit"
        text="Confirm"
        width="257px"
        height="64px"
        :isDisabled="isDisabled"
      />
    </v-form>
  </div>

  <div v-else-if="type === 'EditPassword'">
    <v-form class="d-flex flex-wrap justify-center">
      <FormField
        @onInputChange="handleFormChange($event, 'password')"
        name="password"
        :value="data.password"
        type="PasswordNoLabel"
        :label="'Old Password'"
        :errorMessage="errorMessages.password"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'newPassword')"
        name="newPassword"
        :value="data.newPassword"
        type="PasswordNoLabel"
        :label="'New Password'"
        :errorMessage="errorMessages.newPassword"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'confirmNewPassword')"
        name="password"
        :value="data.confirmNewPassword"
        type="PasswordNoLabel"
        :label="'Confirm New Password'"
        :errorMessage="errorMessages.confirmNewPassword"
      />
      <Button
        @onClick="handleSumbit"
        text="Confirm"
        width="257px"
        height="64px"
        :isDisabled="isDisabled"
      />
    </v-form>
  </div>

  <div v-else-if="type === 'EditDish'">
    <v-form class="d-flex flex-wrap justify-center">
      <!-- <ControlField
        @onInputChange="handleFormChange($event, 'dishId')"
        type="DishTitle"
        label="Dish Id"
        width="100%"
        rows="2"
        :value="data.dishId"
        :errorMessage="errorMessages.dishId"
      /> -->
      <ControlField
        @onInputChange="handleFormChange($event, 'dishTitle')"
        type="DishTitle"
        label="Dish Title"
        width="100%"
        rows="2"
        :value="data.dishTitle"
        :errorMessage="errorMessages.dishTitle"
      />
      <ControlField
        @onInputChange="handleFormChange($event, 'imageUrl')"
        type="BlogContent"
        label="Image Link"
        width="100%"
        rows="3"
        :value="data.imageUrl"
        :errorMessage="errorMessages.imageUrl"
      />
      <ControlField
        @onInputChange="handleFormChange($event, 'dishDescription')"
        type="DishDescription"
        label="Dish Description"
        width="100%"
        rows="2"
        :value="data.dishDescription"
        :errorMessage="errorMessages.dishDescription"
      />
      <ControlField
        @onInputChange="handleFormChange($event, 'dishPrice')"
        type="DishDescription"
        label="Price"
        width="100%"
        rows="2"
        :value="data.dishPrice"
        :errorMessage="errorMessages.dishPrice"
      />
      <Button
        @onClick="handleSumbit"
        text="Confirm"
        width="257px"
        height="64px"
        :isDisabled="isDisabled"
      />
    </v-form>
  </div>

  <div v-else-if="type === 'EditBlog'">
    <v-form class="d-flex flex-wrap justify-center">
      <ControlField
        @onInputChange="handleFormChange($event, 'blogTitle')"
        type="BlogTitle"
        label="Blog Title"
        width="100%"
        rows="3"
        :value="data.blogTitle"
        :errorMessage="errorMessages.blogTitle"
      />
      <ControlField
        @onInputChange="handleFormChange($event, 'imageUrl')"
        type="BlogContent"
        label="Image Link"
        width="100%"
        rows="3"
        :value="data.imageUrl"
        :errorMessage="errorMessages.imageUrl"
      />
      <ControlField
        @onInputChange="handleFormChange($event, 'blogContent')"
        type="BlogContent"
        label="Blog Content"
        width="100%"
        rows="30"
        :value="data.blogContent"
        :errorMessage="errorMessages.blogContent"
      />
      <Button
        @onClick="handleSumbit"
        text="Confirm"
        width="257px"
        height="64px"
        :isDisabled="isDisabled"
      />
    </v-form>
  </div>

  <div v-else-if="type === 'Reservation'">
    <v-form class="d-flex flex-wrap justify-center">
      <FormField
        @onInputChange="handleFormChange($event, 'fullname')"
        name="username"
        :value="data.fullname"
        type="NoIcon"
        :label="'Your Name'"
        :errorMessage="errorMessages.fullname"
      />
      <FormField
        @onInputChange="handleFormChange($event, 'email')"
        name="email"
        :value="data.email"
        type="NoIcon"
        :label="'Your Email'"
        :errorMessage="errorMessages.email"
      />
      <div style="width: 100%" :style="pairInputStyle">
        <FormField
          @onInputChange="handleFormChange($event, 'phone')"
          name="phone"
          :value="data.phone"
          type="NoIcon"
          :label="'Your Phone Number (10 digits)'"
          :width="'45%'"
          class="justify-space-between"
          :errorMessage="errorMessages.phone"
        />
        <FormField
          @onInputChange="handleFormChange($event, 'totalPeople')"
          name="phone"
          :value="data.totalPeople"
          type="NoIcon"
          :label="'Number Of Persons'"
          :width="'45%'"
          class="justify-space-between"
          :errorMessage="errorMessages.totalPeople"
        />
      </div>
      <div style="width: 100%" :style="pairInputStyle">
        <FormField
          @onInputChange="handleFormChange($event, 'date')"
          name="date"
          :value="data.date"
          type="NoIcon"
          :width="'45%'"
          :label="'Date (YYYY-MM-DD)'"
          :errorMessage="errorMessages.date"
        />
        <FormField
          @onInputChange="handleFormChange($event, 'time')"
          name="time"
          :value="data.time"
          type="NoIcon"
          :width="'45%'"
          :label="'Time (HH:MM:SS)'"
          :errorMessage="errorMessages.time"
        />
      </div>
      <FormField
        @onInputChange="handleFormChange($event, 'message')"
        name="message"
        :value="data.message"
        type="NoIconMessage"
        :label="'Your Messages'"
        :errorMessage="errorMessages.message"
      />
      <Button
        class="btn-wrapper"
        @onClick="handleSumbit"
        text="Book Your Table"
        width="207px"
        height="53px"
        :isDisabled="isDisabled"
      />
    </v-form>
  </div>
</template>

<script>
import FormField from "./FormField.vue";
import ControlField from "./ControlField.vue";
import Button from "./Button.vue";

export default {
  name: "Form",
  components: { FormField, Button, ControlField },
  props: {
    data: {
      type: Object,
    },
    type: {
      type: String,
      default: "",
    },
    errorMessages: {
      type: Object,
    },
  },

  methods: {
    handleFormChange(data, name) {
      this.$emit("onFormChange", {
        name: name,
        value: data,
      });
    },

    handleSumbit() {
      this.$emit("onSubmit");
    },
  },

  data() {
    return {
      pairInputStyle: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
    };
  },

  computed: {
    isDisabled() {
      for (const [key, value] of Object.entries(this.errorMessages)) {
        if (value !== "" && key !== "") {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
.btn-wrapper {
  margin: 10px 0 50px 0;
}
</style>
