<template>
  <v-container v-show="manager != '1'" fluid>
    <nav class="navbar navbar-expand-lg navbar-light bg-black">
      <button
        class="navbar-toggler  me-0 ms-auto"
        style="background-color:darkgray"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent-user"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent-user">
        <ul class="navbar-nav me-0 ms-auto text-center">
          <li class="nav-item">
            <div v-show="user != null" class="nav-link">
              <v-btn depressed color="black" to="/cart" small>
                <span class="linkText">Cart</span>
              </v-btn>
            </div>
          </li>

          <li class="nav-item">
            <div class="nav-link">
              <v-btn depressed color="black" to="/" small>
                <span class="linkText">Home</span>
              </v-btn>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <v-btn depressed color="black" to="/about" small>
                <span class="linkText">About</span>
              </v-btn>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <v-btn depressed color="black" to="/menu" small>
                <span class="linkText">Menu</span>
              </v-btn>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <v-btn depressed color="black" to="/blog" small>
                <span class="linkText">Blogs</span>
              </v-btn>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <v-btn depressed color="black" to="/reservation" small>
                <span class="linkText">Reservation</span>
              </v-btn>
            </div>
          </li>
          <li class="nav-item"  v-show="user === null">
            <div class="nav-link">
              <v-btn
                depressed
                color="black"
                to="/auth"
                small
              >
                <span class="linkText">Sign in</span>
              </v-btn>
            </div>
          </li>
          <li class="nav-item" v-show="user !== null">
            <div class="nav-link">
              <v-btn depressed color="black" to="/account/profile" small>
                <span class="linkText"> Acccount</span>
              </v-btn>
            </div>
          </li>
        </ul>
      </div>
    </nav>
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
  transition: transform 0.1.5s; /* Animation */
}
span:hover {
  transform: scale(
    1.2
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.together {
  min-width: 0;
}

.container {
  width: 100vw;
  margin: 0;
  background-color: black;
  padding: 0;
}

.linkText {
  color: white;
}

.NavBar {
  display: flex;
}
</style>
