<template>
  <v-container v-show="manager == '1'" fluid>
    <div class="d-flex">
      <div class="mr-auto"></div>
      <v-btn depressed color="black" to="/admin/about" small>
        <span class="linkText">About</span>
      </v-btn>
      <v-btn depressed color="black" to="/admin/menu" small>
        <span class="linkText">Menu</span>
      </v-btn>
      <v-btn depressed color="black" to="/blog" small>
        <span class="linkText">Blogs</span>
      </v-btn>
      <v-btn depressed color="black" to="/admin/user" small>
        <span class="linkText">Users</span>
      </v-btn>
      <v-btn depressed color="black" to="/admin/reservation" small>
        <span class="linkText">Reservation</span>
      </v-btn>
      <v-btn v-show="user !== null" depressed color="black" to="/account" small>
        <span class="linkText">Account</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AdminNavBar",
  data() {
    var managerValue = "0";
    var userValue = "0";
    if (localStorage.getItem("User") != null) {
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
.container {
  width: 100vw;
  margin: 0;
  background-color: black;
}

.linkText {
  color: white;
}
</style>
