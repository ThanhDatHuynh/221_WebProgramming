<template>
  <footer id="footer">
    <div class="wrapper">
      <div class="des">
        <div class="menu-title text-center">DHT Foodzone </div>
        <p class="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu velit
          tempus erat egestas efficitur. In hac habitasse platea dictumst. Fusce
          a nunc eget ligula suscipit finibus. Aenean pharetra quis lacus at
          viverra. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.
        </p>
      </div>
      <div>
        <div class="menu-title text-center">Contact </div>
        <ul>
          <li>Call: {{phone}}</li>
          <li> Address: {{address}} </li>
          <li> Open Time: From {{openTime}} to {{closeTime}} </li>
        </ul>
      </div>
      <div>
        <div class="menu-title text-center">Our news <br /> </div>
        <div class="text-center">
          <v-btn to="/blog" class="buttonSize" color="#e1651f">
            <span class="linkText">Our blogs</span>
          </v-btn>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
//import Button from "./Button.vue";
import $ from "jquery";
export default {
  components: {},
  name: "Footer",
  methods: {
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
  data() {
    return {
      phone:"",
      address:"",
      openTime:"",
      closeTime:"",
      //userToken: localStorage.getItem("UserToken"),
    };
  }, 
  beforeMount() {
    this.getPublicInfo();
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
  background-color: black;
  color: white;
}

.wrapper>div:nth-child(1) {
  overflow: hidden;
}

.wrapper>div {
  padding: 30px;
}

.buttonSize {
  width: 300px;
  height: 100px;
}

.linkText {
  color: white;
  font-size: 20px;
}

.h1 {
  font-family: cursive;
}

@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.title-wrapper {
  margin-bottom: 4%;
}

.menu-title {
  font-family: sans-serif;
  text-align: center;
  font-size: 250%;
  margin: 2% 0% -1% 0%;
}

.menu-description {
  font-family: sans-serif;
  text-align: center;
  margin: 0% 0% -1% 0%;
}

.btn-wrapper {
  margin: 25px 0 65px 0;
}

.buttonSize {
  width: 250px;
  height: 120px;
}

@media (max-width: 60em) {
  .wrapper>div:nth-child(1) {
    grid-area: col_1;
  }

  .wrapper>div:nth-child(2) {
    grid-area: col_2;
  }

  .wrapper>div:nth-child(3) {
    grid-area: col_3;
  }

  .wrapper {
    display: grid;
    grid-template-areas:
      "col_1 col_1 col_1"
      "col_2 col_2 col_3";
    background-color: black;
    color: white;
  }

  .buttonSize {
    width: 150px;
    height: 60px;
  }

  .linkText {
    color: white;
    font-size: 14px;
  }

  .menu-title {
    font-family: Oleo Script Swash Caps;
    text-align: center;
    font-size: 150%;
    margin: 2% 0% -1% 0%;
  }

  .menu-description {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 70%;
    text-align: center;
    margin: 0% 0% -1% 0%;
  }
}

@media (max-width: 35em) {
  .wrapper {
    display: grid;
    grid-template-areas:
      "col_1 col_1 col_1"
      "col_2 col_2 col_2"
      "col_3 col_3 col_3";
    background-color: black;
    color: white;
  }

  .buttonSize {
    width: 200px;
    height: 60px;
  }

  .linkText {
    color: white;
    font-size: 14px;
  }

  .menu-title {
    font-family: Oleo Script Swash Caps;
    text-align: center;
    font-size: 100%;
    margin: 2% 0% -1% 0%;
  }

  .menu-description {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 70%;
    text-align: center;
    margin: 0% 0% -1% 0%;
  }
}
</style>