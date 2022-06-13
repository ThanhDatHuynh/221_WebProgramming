<template>
  <div id="app">
    <v-app>
      <top-nav-bar />
      <admin-nav-bar />
      <router-view />
      <div class="custom_footer">
        <Footer />
      </div>
    </v-app>
  </div>
</template>

<script>
import AdminNavBar from "./components/AdminNavBar.vue";
// import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import TopNavBar from "./components/TopNavBar.vue";
//import HomePage from './pages/HomePage.vue'
export default {
  name: "App",
  data() {
    return {
      cart: {},
    }
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      cart: this.cart,
      updateCart: (newCart)=>{this.cart = newCart;},
    }
  },
  components: {
    Footer,
    TopNavBar,
    AdminNavBar,
  },  
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

.custom_footer {
  /* margin-top: auto; */
}
</style>
