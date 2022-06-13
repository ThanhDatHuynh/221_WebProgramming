<template>
  <div>
    <div class="title-wrapper">
      <div class="menu-title">
        <p>Our Menu</p>
      </div>
      <div class="menu-description">
        <p>
          Fish is one of the most wholesome foods that man can eat. In fact,
          people have been eating fish throughout human.
        </p>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="dish in dishes" :key="dish.id">
        <Dish :dish="dish" />
      </div>
    </div>
    <div class="btn-wrapper d-flex justify-center">
      <div>
        <Button @onClick="handleBookBtnClick" text="Book Your Table" width="207px" height="53px" to="/reservation" />
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Dish from "../components/Dish.vue";
import Button from "../components/Button.vue";
export default {
  name: "MenuPage",
  components: {
    Dish,
    Button,
  },
  data() {
    return {
      dishes: [],
    };
  },
  methods: {
    getMenu() {
      const __this = this;
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/menu`,
        method: "GET",
        timeout: 0,
      };
      
      $.ajax(settings)
        .done(function (response) {
          const a = JSON.parse(response).response;
          __this.dishes = a;
        })
    },
    handleBookBtnClick() {
      this.$router.push({ name: "makeReservation" });
    },
  },
  beforeMount() {
    this.getMenu();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");

.title-wrapper {
  margin-bottom: 4%;
}

.menu-title {
  font-family: Oleo Script Swash Caps;
  text-align: center;
  font-size: 500%;
  margin: 2% 0% -1% 0%;
}

.menu-description {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  margin: 0% 8% -1% 8%;
}

.btn-wrapper {
  margin: 25px 0 65px 0;
}
</style>
