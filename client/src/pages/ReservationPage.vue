<template>
  <div class="bg-4">
    <div class="reservation-page-wrapper">
      <div class="title-wrapper">
        <div class="reservation-title">
          <p>Make Reservation</p>
        </div>
        <div class="reservation-description">
          <p>
            Fish is one of the most wholesome foods that man can eat. In fact,
            people have been eating fish throughout human.
          </p>
        </div>
      </div>
      <div class="reservation-form-wrapper">
        <Form
          :type="'Reservation'"
          :data="formData"
          :errorMessages="errorMessages"
          @onFormChange="handleFormChange"
          @onSubmit="handleSubmit"
        />
      </div>
      <div :style="style" class="reservation-note" ref="note">
        <div ref="noteTitle" class="note-title"></div>
        <ReservationNote :notes="this.notes" :isSuccess="isSuccess" />
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form.vue";
import $ from "jquery";
import ReservationNote from "../components/ReservationNote.vue";
import * as yup from "yup";

export default {
  name: "ReservationPage",
  components: { Form, ReservationNote },
  props: {},
  data() {
    return {
      isSuccess: false,
      formData: {
        // Vue Object Data will be convert into Observer
        fullname: "",
        totalPeople: "",
        date: "",
        time: "",
        message: "",
        email: "",
        phone: "",
      },
      errorMessages: {
        // Vue Object Data will be convert into Observer
        fullname: "",
        totalPeople: "",
        date: "",
        time: "",
        message: "",
        email: "",
        phone: "",
      },

      notes: {
        "Full name": "",
        "Number of persons": "",
        "Reservation ID": "",
        "Date Time": "",
        "Phone Number": "",
        Email: "",
        "Your Message": "",
      },
      style: {
        display: "none",
      },

      schema: yup.object().shape({
        email: yup
          .string()
          .email()
          .label("Email"),
        phone: yup
          .string()
          .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
        date: yup.string(),
        time: yup.string(),
        totalPeople: yup
          .number()
          .min(1)
          .max(30)
          .label("Number of persons"),
      }),
    };
  },
  methods: {
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

    editNotes(response) {
      if (response) {
        const {
          NoP,
          date,
          time,
          description,
          email,
          id,
          name,
          phoneNumber,
        } = response;
        this.notes["Full name"] = name;
        this.notes["Number of persons"] = NoP;
        this.notes["Reservation ID"] = id;
        this.notes["Email"] = email;
        this.notes["Date Time"] = date + " at " + time;
        this.notes["Phone Number"] = phoneNumber;
        this.notes["Your Message"] = description;
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }
    },

    handleSubmit() {
      var __this = this;
      const formData = JSON.parse(JSON.stringify(this.formData));

      var settings = {
        url: `${process.env.VUE_APP_API_URL}/reservation`,
        method: "post",
        timeout: 0,
        data: {
          name: formData.fullname,
          description: formData.message,
          NoP: parseInt(formData.totalPeople),
          date: formData.date,
          time: formData.time,
          phoneNumber: formData.phone,
          email: formData.email,
        },
        headers: {
          // Admin
          // "Bear-Token":
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pbmgxMjM0NTYiLCJpZCI6IjEiLCJtYW5hZ2VyIjoiMSIsImV4cCI6MTYzOTIxMTI2OX0.r8CwtgUQcMg8TjstE8EhmbZMFOD6jKB6hT4T-WHyc3A",
        },
      };

      $.ajax(settings).done(function(response) {
        response = JSON.parse(JSON.stringify(JSON.parse(response)));
        __this.$refs.note.style.display = "flex";
        if (response.status == 200) {
          __this.$refs.noteTitle.innerHTML = "Your Reservation Is Submitted";
          __this.editNotes(response.response);
        } else {
          __this.$refs.noteTitle.innerHTML = response.message;
          __this.editNotes(null);
        }
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");

.title-wrapper {
  margin-bottom: 4%;
}

.reservation-title {
  font-family: Oleo Script Swash Caps;
  text-align: center;
  font-size: 500%;
  margin: 2% 0% -1% 0%;
}

.reservation-description {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
}

.reservation-form-wrapper {
  width: 100%;
}

.reservation-page-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
  margin: 0 auto;
  animation: example 700ms ease-out;
  animation-fill-mode: backwards;
  transition: transform 0.1.5s; /* Animation */
}
@keyframes example {
  from {
    opacity: 0;
    transform: scale(0.3);
    filter: hue-rotate(180deg);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: hue-rotate(0deg);
  }
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

@media screen and (max-width: 1700px) {
  .reservation-page-wrapper {
    width: 60%;
  }
}

@media screen and (max-width: 1400px) {
  .reservation-page-wrapper {
    width: 70%;
  }
}

@media screen and (max-width: 1000px) {
  .reservation-page-wrapper {
    width: 80%;
  }
}

@media screen and (max-width: 800px) {
  .reservation-page-wrapper {
    width: 90%;
  }
}
</style>
