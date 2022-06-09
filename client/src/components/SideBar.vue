<template>
  <div class="outer-wrapper">
    <v-navigation-drawer
      :height="navHeight"
      :width="navWidth"
      class="navigation-wrapper"
      permanent
    >
      <v-list class="sidebar-wrapper">
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          style="[style]"
          :to="{ name: link !== 'logout' ? link : null }"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="logout-button">
      <Button @onClick="logoutEvent" :text="'Log out'" />
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  name: "SideBar",
  components: { Button },
  data: () => ({
    items: [
      ["mdi-account-outline", "User's Information", "editAccountProfile"],
      ["mdi-lock-outline", "Change Password", "editAccountPassword"],
    ],
    style: {
      backgroundColor: "#efefef",
      marginBottom: "30px",
    },
  }),
  methods: {
    logoutUser() {
      if (localStorage.getItem("UserToken") !== "") {
        localStorage.removeItem("UserToken");
      }
      if (localStorage.getItem("User") !== "") {
        localStorage.removeItem("User");
      }
      alert("You are about to logout");
      this.$router.push("/");
    },

    logoutEvent() {
      this.$emit("logoutEvent");
    },
  },
  computed: {
    navWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "100%";
        case "lg":
          return "100%";
        case "xl":
          return "100%";
        default:
          return "100%";
      }
    },
    navHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "200px";
        case "sm":
          return "200px";
        case "md":
          return "500px";
        case "lg":
          return "500px";
        case "xl":
          return "500px";
        default:
          return "500px";
      }
    },
  },
};
</script>

<style scoped>
.sidebar-wrapper {
  margin-top: 100px;
  width: 100%;
}

.outer-wrapper {
  width: 40%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.logout-button {
  margin: auto;
}

.navigation-wrapper {
  width: 80%;
}

@media screen and (max-width: 1700px) {
  .outer-wrapper {
    width: 40%;
  }
}

@media screen and (max-width: 1400px) {
  .outer-wrapper {
    width: 40%;
  }
}

@media screen and (max-width: 900px) {
  .sidebar-wrapper {
    margin-top: 50px;
    width: 100%;
  }
  .outer-wrapper {
    width: 100%;
  }
}
</style>
