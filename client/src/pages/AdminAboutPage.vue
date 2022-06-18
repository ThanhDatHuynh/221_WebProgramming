<template>
  <div class="bg-7">
    <div class="edit-blog-wrapper">
      <ModalConfirm
        @toggleModalEvent="toggleModalOpen"
        :isOpen="this.isModalOpen"
        :title="'Change Confirm'"
        :content="'You are about to change public information?'"
        @callbackEvent="handleSubmit"
      />
      <div class="reservation-title">
        <p>Public Infomation</p>
      </div>
      <div class="form-wrapper">
        <Form
          :type="'EditAbout'"
          :data="formData"
          :errorMessages="errorMessages"
          @onFormChange="handleFormChange"
          @onSubmit="toggleModalOpen"
        />
        <div v-show="isFormSubmited" class="reservation-note" ref="note">
          <div ref="noteTitle" class="note-title"></div>
        </div>
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
  name: "AdminAboutPage",
  components: { Form, ModalConfirm },
  data() {
    return {
      isFormSubmited: false,
      isModalOpen: false,
      formData: {
        // Vue Object Data will be convert into Observer
        phone: "",
        address: "",
        openTime: "",
        closeTime: "",
      },
      errorMessages: {
        phone: "",
        address: "",
        openTime: "",
        closeTime: "",
      },

      // Add field with name in errorMessages for others' validation
      schema: yup.object().shape({
        phone: yup
          .string()
          .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
        address: yup
          .string()
          .min(1)
          .label("Address"),
        openTime: yup.string(),
        closeTime: yup.string(),
      }),
    };
  },
  beforeMount() {
    this.GetPublicInfo();
  },

  methods: {
    toggleModalOpen() {
      this.isModalOpen = !this.isModalOpen;
    },

    GetPublicInfo() {
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/get_public_info`,
        method: "GET",
        timeout: 0,
        data: {},
        headers: {},
      };

      $.ajax(settings).then((response) => {
        const __this = this;
        response = JSON.parse(response).response;
        __this.formData.phone = response.phone;
        __this.formData.address = response.address;
        __this.formData.openTime = response.open_time;
        __this.formData.closeTime = response.close_time;
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
        return false;
      } else {
        this.errorMessages[name] = "";
        return true;
      }
    },

    handleFormChange(newData) {
      this.formData[newData.name] = newData.value;
      this.handleInputValidation(newData);
    },

    async handleSubmit() {
      var __this = this;
      let phoneOK = await this.handleInputValidation({
        name: "phone",
        value: __this.formData.phone,
      });
      let addressOK = await this.handleInputValidation({
        name: "address",
        value: __this.formData.address,
      });
      if (!phoneOK || !addressOK) {
        this.toggleModalOpen();
        return;
      }
      const formData = JSON.parse(JSON.stringify(this.formData));
      const UserToken = localStorage.getItem("UserToken");
      if (UserToken === "") {
        alert("Please login admin account before to edit or create blog");
        return;
      }

      this.isFormSubmited = true;
      this.toggleModalOpen();
      let settings = {
        url: `${process.env.VUE_APP_API_URL}/admin/change_public_info`,
        method: "POST",
        timeout: 0,
        data: {
          phone: formData.phone,
          address: formData.address,
          openTime: formData.openTime,
          closeTime: formData.closeTime,
        },
        headers: {
          "Bear-Token": UserToken,
        },
      };
      $.ajax(settings).done(function(response) {
        console.log(response);
        response = JSON.parse(response);
        if (response.status == 200) {
          //__this.$refs.noteTitle.innerHTML = "Your Public Infoation Have Been Edited";
          __this.$router.go(__this.$router.current);
        } else {
          __this.$refs.noteTitle.innerHTML = response.message;
        }
      });
    },
  },
};
</script>

<style scoped>
.edit-blog-wrapper {
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
  font-family: Roboto, "san-serif";
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
