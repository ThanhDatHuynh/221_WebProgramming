<template>
  <div class="edit-account-page-wrapper">
    <ModalConfirm
      @toggleModalEvent="toggleModalOpen('logout')"
      :isOpen="this.isLogoutModalOpen"
      :title="'Logout Confirm'"
      :content="'You are about to logout ?'"
      @callbackEvent="logoutUser"
    />
    <ModalConfirm
      @toggleModalEvent="toggleModalOpen('profile')"
      :isOpen="this.isEditProfileModalOpen"
      :title="'Edit Profile Confirm'"
      :content="'You are about to edit your profile'"
      @callbackEvent="handleSubmit"
    />
    <ModalConfirm
      @toggleModalEvent="toggleModalOpen('password')"
      :isOpen="this.isEditPasswordModalOpen"
      :title="'Edit Password Confirm'"
      :content="'You are about to edit your password, please relogin if success'"
      @callbackEvent="handleSubmit"
    />
    <SideBar @logoutEvent="toggleModalOpen('logout')" />
    <div class="update-form-wrapper">
      <div style="width: 80%; margin: auto">
        <router-view
          :key="$route.path"
          :data="formData"
          @onFormChange="handleFormChange"
          @onSubmit="
            $route.name === 'editAccountProfile'
              ? toggleModalOpen('profile')
              : toggleModalOpen('password')
          "
          :errorMessages="errorMessages"
        />
        <div v-show="isSuccess" class="reservation-note" ref="note">
          <div ref="noteTitle" class="note-title"></div>
          <ReservationNote :notes="this.notes" :isSuccess="isSuccess" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import * as yup from "yup";
import $ from "jquery";
import ReservationNote from "../components/ReservationNote.vue";
import ModalConfirm from "../components/ModalConfirm.vue";

export default {
  name: "EditAccountPage",
  components: { SideBar, ReservationNote, ModalConfirm },
  props: {},

  /**
   * Data
   */
  data() {
    return {
      isSuccess: false,
      notes: {
        "New Username": "",
        "New Email": "",
        "New Phone Number": "",
      },
      isLogoutModalOpen: false,
      isEditProfileModalOpen: false,
      isEditPasswordModalOpen: false,
      formType: {
        type: String,
        default: "",
      },
      formData: {
        // Vue Object Data will be convert into Observer
        username: "",
        email: "",
        phone: "",
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      errorMessages: {
        // Vue Object Data will be convert into Observer
        username: "",
        email: "",
        phone: "",
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      schema: yup.object().shape({
        username: yup.string().min(1, "Please type your username!").label("Username"),
        password: yup.string().min(5).label("Password"),
        newPassword: yup.string().min(5).label("Password"),
        // confirmNewPassword: yup.string().oneOf(
        //   [yup.ref("newPassword")],
        //   "Both password need to be the same"
        // ),
        phone: yup
          .string()
          .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
        email: yup.string().min(1, "Please type your email!").email().label("Email"),
      }),
    };
  },

  /**
   * Methods
   */
  methods: {
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

    toggleModalOpen(type) {
      if (type === "logout") {
        this.isLogoutModalOpen = !this.isLogoutModalOpen;
      } else if (type === "profile") {
        this.isEditProfileModalOpen = !this.isEditProfileModalOpen;
      } else if (type === "password") {
        this.isEditPasswordModalOpen = !this.isEditPasswordModalOpen;
      }
    },

    editNotes(response) {
      if (response) {
        const { email, username, phoneNumber } = response;
        this.notes["New Username"] = username;
        this.notes["New Email"] = email;
        this.notes["New Phone Number"] = phoneNumber;
        this.isSuccess = true;
      } else {
        this.isSuccess = true;
      }
    },

    reloadPage() {
      this.$router.push("/");
      this.$router.go("/");
    },

    logoutUser() {
      if (localStorage.getItem("UserToken") !== "") {
        localStorage.removeItem("UserToken");
      }
      if (localStorage.getItem("User") !== "") {
        localStorage.removeItem("User");
      }
      this.reloadPage();
    },

    async handleSubmit() {
      var __this = this;
      const formData = JSON.parse(JSON.stringify(this.formData));

      const UserToken = localStorage.getItem("UserToken");
      if (localStorage.getItem("UserToken") === "") {
        alert("Please login before to edit your account info");
        return;
      }
      /**
       * Get LocalStorage UserInfo fill in unchanged field
       */
      const UserInfo = JSON.parse(localStorage.getItem("User"));

      if (this.$route.name === "editAccountProfile") {
        /**
         * Handle Edit Profile
         */

        this.toggleModalOpen("profile");
        let usernameOK = await this.handleInputValidation({name: "username", value: __this.formData.username});
        let phoneNumberOK = await this.handleInputValidation({name: "phoneNumber", value: __this.formData.phoneNumber});
        let emailOK = await this.handleInputValidation({name: "email", value: __this.formData.email});
        if (!usernameOK || ! phoneNumberOK || !emailOK) return;
        let settings = {
          url: `${process.env.VUE_APP_API_URL}/auth/update_profile`,
          method: "post",
          timeout: 0,
          data: {
            username: formData.username,
            phoneNumber: formData.phone,
            email: formData.email,
            avatar: UserInfo.avatar,
            userId: UserInfo.userId,
          },
          headers: {
            "Bear-Token": UserToken,
          },
        };
        $.ajax(settings).done(function (response) {
          response = JSON.parse(JSON.stringify(JSON.parse(response)));
          if (response.status == 200) {
            __this.$refs.noteTitle.innerHTML =
              "Your Profile Has Been Updated! Please Recheck Before Leaving";
            __this.editNotes(response.response);
          } else {
            __this.$refs.noteTitle.innerHTML = response.message;
            __this.isSuccess = true;
            __this.editNotes(null);
          }
        });
      } else if (this.$route.name === "editAccountPassword") {
        /**
         * Handle Edit Password
         */
        this.toggleModalOpen("password");
        let passwordOK = await this.handleInputValidation({name: "password", value: __this.formData.password});
        let newPasswordOK = await this.handleInputValidation({name: "newPassword", value: __this.formData.newPassword});
        if (__this.formData.newPassword != __this.formData.confirmNewPassword) {
          this.errorMessages.confirmNewPassword = "Password is not match!";
          this.$forceUpdate();
          return;
        }
        if (!passwordOK || !newPasswordOK) return;
        let settings = {
          url: `${process.env.VUE_APP_API_URL}/auth/update_password`,
          method: "post",
          timeout: 0,
          data: {
            old_password: formData.password,
            new_password: formData.newPassword,
            verify_password: formData.confirmNewPassword,
          },
          headers: {
            "Bear-Token": UserToken,
          },
        };
        $.ajax(settings).done(function (response) {
          response = JSON.parse(JSON.stringify(JSON.parse(response)));
          console.log(response)
          if (response.status == 200) {
            __this.$refs.noteTitle.innerHTML =
              "Your Password Has Been Updated! Please Recheck Before Leaving";
              __this.isSuccess = true;
            __this.logoutUser();
          } else {
            //__this.editNotes(response.message);
            __this.isSuccess = true;
            __this.$refs.noteTitle.innerHTML = response.message;
          }
        });
      }
    },
  },

  /**
   * Lifecycle Hooks
   */
  beforeMount() {
    if (this.$route.name === "editAccount") {
      this.$router.history.push({ name: "editAccountProfile" });
    }

    if (localStorage.getItem("User") != "") {
      const UserInfo = JSON.parse(localStorage.getItem("User"));
      this.formData.username = UserInfo["username"];
      this.formData.email = UserInfo["email"];
      this.formData.phone = UserInfo["phoneNumber"];
    }
  },
};
</script>

<style scoped>
.edit-account-page-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.edit-options-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 30%;
}

.update-form-wrapper {
  margin: 100px 0 100px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 60%;
}

.option-item {
  margin: 20px 0 20px 0;
  background: rgba(225, 101, 31, 0.25);
  width: 100%;
  height: 50px;
  border-radius: 5px;
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
  font-family: Roboto, 'san-serif';
  text-align: center;
  font-size: 200%;
  margin: 20px 0 20px 0;
}

@media screen and (max-width: 900px) {
  .update-form-wrapper {
    width: 100%;
  }
}
</style>
