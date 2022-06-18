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
    };
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      cart: this.cart,
      updateCart: (newCart) => {
        this.cart = newCart;
      },
      resetCart: () => {
        this.cart = {};
      },
    };
  },
  mounted() {
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);
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
button {
  transition: transform 0.1.5s; /* Animation */
}
button:hover {
  transform: scale(
    1.2
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
a {
  transition: transform 0.1.5s; /* Animation */
}
a:hover {
  transform: scale(
    1.1
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
@import url("https://fonts.googleapis.com/css2?family=Asap&display=swap");
@media (max-width: 900px) {
  section h1 {
    font-size: 2rem;
    text-align: center;
  }
  section .text-container {
    flex-direction: column;
  }
}

.bg-1 {
  background-image: url("/images/bg-1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-2 {
  background-image: url("/images/bg-2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}

.bg-3 {
  background-image: url("/images/bg-3.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.bg-4 {
  background-image: url("/images/bg-4.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.bg-5 {
  background-image: url("/images/bg-5.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.bg-5 {
  background-image: url("/images/bg-5.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}

.bg-6 {
  background-image: url("/images/bg-6.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.bg-7 {
  background-image: url("/images/bg-7.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.bg-8 {
  background-image: url("/images/bg-8.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.reveal {
  position: relative;
  opacity: 0;
}

.reveal.active {
  opacity: 1;
}

.active.fade-bottom {
  animation: fade-bottom 1s ease-in;
}

.active.fade-left {
  animation: fade-left 1s ease-in;
}

.active.fade-right {
  animation: fade-right 1s ease-in;
}

@keyframes fade-bottom {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-left {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-right {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
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

.zoom-out {
  animation: example 700ms ease-out;
  animation-fill-mode: backwards;
  transition: transform 0.1.5s;
  /* Animation */
}
</style>
