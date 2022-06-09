<template>
  <div class="edit-dish-wrapper">
    <ModalConfirm
      @toggleModalEvent="toggleModalOpen('createDish')"
      :isOpen="this.isCreateDishModalOpen"
      :title="'Create Dish Confirm'"
      :content="'You are about to create new dish'"
      @callbackEvent="handleSubmit"
    />
    <ModalConfirm
      @toggleModalEvent="toggleModalOpen('editDish')"
      :isOpen="this.isEditDishModalOpen"
      :title="'Edit Dish Confirm'"
      :content="'You are about to edit your dish'"
      @callbackEvent="handleSubmit"
    />
    <div class="reservation-title">
      <p>Create/Edit Dish</p>
    </div>
    <div class="form-wrapper">
      <Form
        :type="'EditDish'"
        :data="formData"
        :errorMessages="errorMessages"
        @onFormChange="handleFormChange"
        @onSubmit="
          $route.name === 'adminCreateDish'
            ? toggleModalOpen('createDish')
            : toggleModalOpen('editDish')
        "
      />
      <div v-show="isFormSubmited" class="reservation-note" ref="note">
        <div ref="noteTitle" class="note-title"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form.vue";
import * as yup from "yup";
import $ from "jquery";
import ModalConfirm from "../components/ModalConfirm.vue";

export default {
  name: "EditDishPage",
  components: { Form, ModalConfirm },
  data() {
    return {
      isFormSubmited: false,
      currentDishId: null,
      isCreateDishModalOpen: false,
      isEditDishModalOpen: false,
      formData: {
        // Vue Object Data will be convert into Observer
        dishId: "This field is omitted when creating new dish",
        imageUrl: "",
        dishTitle: "",
        dishDescription: "",
      },
      errorMessages: {
        dishId: "",
        imageUrl: "",
        dishTitle: "",
        dishDescription: "",
      },

      // Add field with name in errorMessages for others' validation
      schema: yup.object().shape({}),
    };
  },
  beforeMount() {
    this.currentDishId = this.$route.params.id;
    if (this.currentDishId) {
      this.GetDishData();
    }
  },

  methods: {
    toggleModalOpen(type) {
      if (type === "createDish") {
        this.isCreateDishModalOpen = !this.isCreateDishModalOpen;
      } else if (type === "editDish") {
        this.isEditDishModalOpen = !this.isEditDishModalOpen;
      }
    },

    GetDishData() {
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/dish/{${this.currentDishId}}`,
        method: "GET",
        timeout: 0,
        data: {},
        headers: {},
      };

      $.ajax(settings).then((response) => {
        response = JSON.parse(response);
        if (response.status === 200) {
          const dish = response.response;
          this.formData.dishId = this.currentDishId;
          this.formData.imageUrl = dish.image;
          this.formData.dishTitle = dish.name;
          this.formData.dishDescription = dish.description;
        } else {
          alert("Cannot get dish to edit");
        }
      });
    },

    async handleInputValidation({ name, value }) {
      let validationResult = await this.schema
        .validate({ [name]: value })
        .catch((error) => {
          return error;
        });
      if (validationResult.errors) {
        this.errorMessages[name] = validationResult.errors[0];
      } else {
        this.errorMessages[name] = "";
      }
    },

    handleFormChange(newData) {
      this.formData[newData.name] = newData.value;
      this.handleInputValidation(newData);
    },

    handleSubmit() {
      var __this = this;
      const formData = JSON.parse(JSON.stringify(this.formData));

      const UserToken = localStorage.getItem("UserToken");
      if (UserToken === "") {
        alert("Please login admin account before to edit or create dish");
        return;
      }

      this.isFormSubmited = true;
      if (this.$route.name === "adminCreateDish") {
        /**
         * Handle Edit Profile
         */
        this.toggleModalOpen("createDish");
        let settings = {
          url: `${process.env.VUE_APP_API_URL}/admin/create_dish`,
          method: "post",
          timeout: 0,
          data: {
            image: formData.imageUrl,
            name: formData.dishTitle,
            description: formData.dishDescription,
          },
          headers: {
            "Bear-Token": UserToken,
          },
        };
        $.ajax(settings).done(function(response) {
          response = JSON.parse(response);
          if (response.status == 200) {
            __this.$refs.noteTitle.innerHTML = "Your Dish Have Been Created";
            __this.$router.replace({ name: "adminMenu" });
          } else {
            __this.$refs.noteTitle.innerHTML = response.message;
          }
        });
      } else if (this.$route.name === "adminEditDish") {
        /**
         * Handle Edit Password
         */
        this.toggleModalOpen("editDish");
        let settings = {
          url: `${process.env.VUE_APP_API_URL}/admin/update_dish/{${this.currentDishId}}`,
          method: "post",
          timeout: 0,
          data: {
            image: formData.imageUrl,
            name: formData.dishTitle,
            description: formData.dishDescription,
          },
          headers: {
            "Bear-Token": UserToken,
          },
        };
        $.ajax(settings).done(function(response) {
          response = JSON.parse(response);
          if (response.status == 200) {
            __this.$refs.noteTitle.innerHTML = "Your Dish Have Been Edited";
            __this.$router.replace({ name: "adminMenu" });
          } else {
            __this.$refs.noteTitle.innerHTML = response.message;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.edit-dish-wrapper {
  margin: 50px 0 50px 0;
}
.reservation-title {
  font-family: Oleo Script Swash Caps;
  text-align: center;
  font-size: 500%;
  margin: 0px 0px 50px 0px;
}
.reservation-note {
  margin: 20px auto;
  width: 100%;
  border-radius: 20px;
  background-color: #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.reservation-note > * {
  width: 100%;
}

.note-title {
  font-family: Oleo Script Swash Caps;
  text-align: center;
  font-size: 200%;
  margin: 20px 0 20px 0;
}

.form-wrapper {
  width: 50%;
  margin: auto;
}

@media screen and (max-width: 1700px) {
  .form-wrapper {
    width: 60%;
  }
}

@media screen and (max-width: 1400px) {
  .form-wrapper {
    width: 70%;
  }
}

@media screen and (max-width: 1000px) {
  .form-wrapper {
    width: 80%;
  }
}

@media screen and (max-width: 700px) {
  .form-wrapper {
    width: 90%;
  }
}
</style>
