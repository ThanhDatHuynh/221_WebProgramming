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
          <li>Call: (+84) 123 456 789 </li>
          <li> Address: 268 Ly Thuong Kiet, Phuong 14, Quuan 10, Thanh pho Ho Chi Minh </li>
          <li> Open Time: 10am - 11pm </li>
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
export default {
  components: {},
  name: "Footer",
  data() {
    return {
      //userToken: localStorage.getItem("UserToken"),
    };
  },
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

.title-wrapper {
  margin-bottom: 4%;
}

.menu-title {
  font-family: Oleo Script Swash Caps;
  text-align: center;
  font-size: 250%;
  margin: 2% 0% -1% 0%;
}

.menu-description {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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