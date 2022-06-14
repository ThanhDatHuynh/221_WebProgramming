<template>
  <v-container v-show="manager != '1'" fluid>
    <div class="d-flex">
      <div class="mr-auto"></div>
      <div class="NavBar">
        <div v-show="user != null">
          <v-btn depressed color="black" to="/cart" small>
            <span class="linkText">Cart</span>
          </v-btn>
        </div>
        <div>
          <v-btn depressed color="black" to="/" small>
            <span class="linkText">Home</span>
          </v-btn>
        </div>
        <div>
          <v-btn depressed color="black" to="/about" small>
            <span class="linkText">About</span>
          </v-btn>
        </div>
        <div>
          <v-btn depressed color="black" to="/menu" small>
            <span class="linkText">Menu</span>
          </v-btn>
        </div>
        <div>
          <v-btn depressed color="black" to="/blog" small>
            <span class="linkText">Blogs</span>
          </v-btn>
        </div>
        <div>
          <v-btn depressed color="black" to="/reservation" small>
            <span class="linkText">Reservation</span>
          </v-btn>
        </div>
        <div>
          <v-btn v-show="user === null" depressed color="black" to="/auth" small>
            <span class="linkText">Sign in</span>
          </v-btn>
        </div>

        <div>
          <v-btn v-show="user !== null" depressed color="black" to="/account/profile" small>
            <span class="linkText"> Acccount</span>
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "TopNavBar",
  data() {
    var managerValue = "0";
    var userValue = null;
    if (localStorage.getItem("User") !== null) {
      managerValue = JSON.parse(localStorage.getItem("User")).manager;
      userValue = localStorage.getItem("User");
    }

    return {
      user: userValue,
      manager: managerValue,
    };
  },
};
</script>

<style scoped>
span {
      transition: transform .1.5s; /* Animation */
}
span:hover {
  transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.together {
  min-width: 0;
}

.container {
  width: 100vw;
  margin: 0;
  background-color: black;
}

.linkText {
  color: white;
}

.NavBar {
  display: flex;
}

@media (max-width: 45em) {
  .NavBar>div:nth-child(1) {
    display: none;
  }

  .NavBar>div:nth-child(2) {
    display: none;
  }

  .NavBar>div:nth-child(4) {
    display: none;
  }
}

@media (max-width: 15em) {
  .NavBar>div:nth-child(1) {
    display: none;
  }

  .NavBar>div:nth-child(2) {
    display: none;
  }

  .NavBar>div:nth-child(4) {
    display: none;
  }

  .NavBar>div {
    width: 70%;
    padding: 0px;
  }

  .NavBar {
    flex-wrap: wrap;
  }

  .NavBar>div>v-btn {
    width: 50%;
  }

  .buttonSize {
    width: 50px;
  }
}
</style>
