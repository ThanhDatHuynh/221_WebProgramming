<template>
  <div class="bg-3">
    <div class="d-flex flex-wrap justify-center mx-8 my-15">
      <div class="images mx-4">
        <img
          src="@/assets/About1.png"
          alt="Restaurant Information 1"
          class="rounded"
        />
      </div>
      <div class="images mx-4">
        <div :style="{ marginBottom: '8%' }">
          <img
            src="@/assets/About2.png"
            alt="Restaurant Information 2"
            class="rounded"
          />
        </div>
        <div :style="{ marginTop: '8%' }">
          <img
            src="@/assets/About3.png"
            alt="Restaurant Information 3"
            class="rounded"
          />
        </div>
      </div>
      <div class="text-wrapper">
        <div class="about-title text-center">
          <p>About Us</p>
        </div>
        <div class="about-description text-justify">
          <p>
            Fish is one of the most wholesome foods that man can eat. In fact,
            people have been eating fish throughout human history. These days,
            many cooks yearn Fish is one of the most wholesome foods that man
            can eat. In fact,
          </p>
          <p>
            Fish is one of the most wholesome foods that man can eat. In fact,
            people have been eating fish throughout human history. These days,
            many cooks yearn Fish is
          </p>
        </div>
        <div class="btn-wrapper d-flex flex-wrap justify-center">
          <Button
            @onClick="handleExploreBtnClick"
            text="Explore More"
            width="148px"
            height="53px"
            to="/menu"
          />
        </div>
      </div>
    </div>
    <div class="mx-8 my-15 reveal fade-bottom">
      <div class="question-title">
        <p>Why to choose us?</p>
      </div>
      <div class="question-description d-flex justify-center">
        <p>
          Fish is one of the most wholesome foods that man can eat. In fact,
          people have been eating fish throughout human
        </p>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-center my-15 reveal fade-bottom">
      <div v-for="service in services" :key="service[0]">
        <Service :service="service" />
      </div>
    </div>
    <div class="justify-center my-15 mx-15 row reveal fade-left">
      <div class="col-md-6 align-items-center">
        <div class="about-title text-center">Our Infomation</div>
        <ul style="padding-left:10%; padding-top: 5%">
          <li class="d-flex mx-auto my-5">
            <font-awesome-icon icon="fa-solid fa-phone" class="mx-4" /> Call:
            {{ phone }}
          </li>
          <li class="d-flex mx-auto my-5">
            <font-awesome-icon icon="fa-solid fa-location-dot" class="mx-4" />
            {{address}}
          </li>
          <li class="d-flex mx-auto my-5">
            <font-awesome-icon icon="fa-solid fa-clock" class="mx-4" /> Open
            Time: From {{openTime}} To {{closeTime}}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.494668101275!2d106.65842525037046!3d10.773374292285911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1654789321934!5m2!1svi!2s"
          width="100%"
          height="450"
          style="border:0; border-radius:15px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Button from "../components/Button.vue";
import Service from "../components/Service.vue";
export default {
  name: "aboutUsPage",
  components: { Button, Service },
  data: () => ({
    address:"",
    phone:"",
    openTime:"",
    closeTime:"",
    services: [
      [
        "mdi-table-chair",
        "Service",
        "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services",
      ],
      [
        "mdi-chef-hat",
        "Service",
        "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services",
      ],
      [
        "mdi-truck-fast",
        "Service",
        "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services",
      ],
      [
        "mdi-alarm-check",
        "Service",
        "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services",
      ],
      [
        "mdi-phone-message",
        "Service",
        "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services",
      ],
      [
        "mdi-silverware-fork-knife",
        "Service",
        "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services",
      ],
    ],
  }),
  methods: {
    handleExploreBtnClick() {
      this.$router.push({ name: "menu" });
    },
    getPublicInfo() {
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/get_public_info`,
        method: "GET",
        timeout: 0,
        data: {},
        headers: {},
      };

      $.ajax(settings).then((response) => {
        const __this = this;
        console.log(response);
        response = JSON.parse(response).response;
        __this.phone = response.phone;
        __this.address = response.address;
        __this.openTime = response.open_time;
        __this.closeTime = response.close_time;
      });
    },
  },
  beforeMount() {
      this.getPublicInfo()
  }
};
</script>

<style scoped>
.text-wrapper {
  width: 35%;
  margin: 5% 2% 5% 7%;
}

.about-title,
.question-title {
  font-family: Oleo Script Swash Caps;
  font-size: 300%;
  margin: 0% 0% 5% 0%;
}

.about-description {
  font-family: Roboto, sans-serif;
  margin-bottom: 8%;
}

.question-title {
  text-align: center;
  margin: 0% 0% 0% 0%;
}

.question-description {
  text-align: center;
  margin: 0vh 35vw 2vh 35vw;
}

@media screen and (max-width: 1600px) {
  .text-wrapper {
    width: 35%;
    margin: 5% 2% 5% 7%;
  }

  .about-title,
  .question-title {
    font-family: Oleo Script Swash Caps;
    font-size: 300%;
    margin: 0% 0% 5% 0%;
  }

  .about-description {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-bottom: 8%;
  }

  .question-title {
    text-align: center;
    margin: 0% 0% 0% 0%;
  }

  .question-description {
    text-align: center;
    margin: 0vh 30vw 2vh 30vw;
  }
}

@media screen and (max-width: 1200px) {
  .text-wrapper {
    width: 80%;
    margin: 5% 2% 5% 7%;
  }

  .about-title,
  .question-title {
    font-family: Oleo Script Swash Caps;
    font-size: 300%;
    margin: 0% 0% 5% 0%;
  }

  .about-description {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-bottom: 8%;
  }

  .question-title {
    text-align: center;
    margin: 0% 0% 0% 0%;
  }

  .question-description {
    text-align: center;
    margin: 0vh 25vw 2vh 25vw;
  }
}

@media screen and (max-width: 700px) {
  .text-wrapper {
    width: 90%;
    margin: 5% 2% 5% 7%;
  }

  .images {
    display: none;
  }

  .btn-wrapper {
    justify-content: center;
  }

  .about-title,
  .question-title {
    font-family: Oleo Script Swash Caps;
    font-size: 300%;
    margin: 0% 0% 5% 0%;
    text-align: center;
  }

  .about-description {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-bottom: 15%;
  }

  .question-description {
    text-align: center;
    margin: 0vh 15vw 2vh 15vw;
  }
}
</style>
