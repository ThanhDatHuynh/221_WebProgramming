<template>
  <v-container fluid class="background">
    <v-container class="content zoom-out">
      <v-col>
        <div class="title-wrapper">
          <div class="menu-title">
            <p>Sign in</p>
          </div>
        </div>
        <v-layout align-center justify-center>
          <v-col>
            <Form
              :type="'Login'"
              :data="formData"
              :errorMessages="errorMessages"
              @onFormChange="handleFormChange"
              @onSubmit="handleSubmit"
            />
          </v-col>
        </v-layout>
        <v-layout align-center justify-center>
          <span class="text">Or</span>
          <v-btn text color="#e1651f" to="/reg">
            <span class="linkText">Sign up</span>
          </v-btn>
        </v-layout>
        <div v-show="this.isFail" class="reservation-note">
          <div ref="noteTitle" class="note-title"></div>
          <ReservationNote :notes="{}" />
        </div>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
import Form from "../components/Form.vue";
import $ from "jquery";
import * as yup from "yup";
// import CustomTitle from "../components/CustomTitle.vue";
import ReservationNote from "../components/ReservationNote.vue";
export default {
  components: { Form, ReservationNote },

  Formname: "authPage",

  data() {
    return {
      isFail: false,
      token: "",
      formData: {
        username: "",
        password: "",
      },
      errorMessages: {
        username: "",
        password: "",
      },
      schema: yup.object().shape({
        username: yup.string().min(1).label("Username"),
        password: yup.string().min(5).label("Password"),
      }),
    };
  },
  methods: {
    handleFormChange(newData) {
      this.formData[newData.name] = newData.value;
      this.handleInputValidation(newData);
    },

    handleSubmit() {
      this.Login();
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
    reloadPage() {
      this.$router.go();
      this.$router.push("/");
      this.$router.go("/");
    },

    async Login() {
      let usernameOK = await this.handleInputValidation({name: "username", value: this.formData.username}) 
      //let phoneOK = await this.handleInputValidation({name: "phone", value: __this.formData.phone}) 
      //let emailOK = await this.handleInputValidation({name: "email", value: __this.formData.email})      
      let passwordOK = await this.handleInputValidation({name: "password", value: this.formData.password})
      if (!usernameOK || !passwordOK) return;
      var __this = this;
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/auth/login`,
        method: "POST",
        timeout: 0,
        data: {
          username: this.formData.username,
          password: this.formData.password,
        },
        headers: {},
      };

      $.ajax(settings).done(function (response) {
        if (JSON.parse(response).status != 200) {
          __this.isFail = true;
          __this.$refs.noteTitle.innerHTML = JSON.parse(response).message;
        } else {
          const a = JSON.parse(response).response;

          if (localStorage.getItem("UserToken") != "")
            localStorage.removeItem("UserToken");
          if (localStorage.getItem("User") != "")
            localStorage.removeItem("User");
          localStorage.setItem("UserToken", a.token);
          localStorage.setItem("User", JSON.stringify(a.user));
          __this.reloadPage();
        }
      });
    },
  },
  beforeMount() {
    if (localStorage.getItem("User") !== null) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)),
    url(https://s3.eu-west-2.amazonaws.com/dc-york/images/_1800x875_crop_center-center_90_none/jay-wennington-N_Y88TWmGwA-unsplash_2021-05-26-084422.jpg);
  background-size: cover;
  height: 1024px;
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
.text {
  color: rgb(159, 159, 159);
}

.content {
  width: 70%;
}
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");
.title-wrapper {
  margin-bottom: 4%;
}
.menu-title {
  font-family: Oleo Script Swash Caps;
  text-align: center;
  font-size: 500%;
  margin: 2% 0% -1% 0%;
  color: rgb(255, 255, 255);
}

@media (max-width: 35em) {
  .background {
    height: 824px;
  }
  .content {
    width: 85%;
  }
  .menu-title {
    font-family: Oleo Script Swash Caps;
    text-align: center;
    font-size: 300%;
    margin: 2% 0% -1% 0%;
    color: rgb(255, 255, 255);
  }
}
</style>
