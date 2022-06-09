<template>
  <div>
    <div class="title-wrapper">
      <div class="menu-title">
        <p>Our Blogs</p>
      </div>
      <div class="menu-description">
        <p>
          Fish is one of the most wholesome foods that man can eat. In fact,
          people have been eating fish throughout human.
        </p>
      </div>
    </div>

    <div class="buttonCreate">
      <v-btn
        v-show="manager == '1'"
        @click="this.routeToCreateBlog"
        class="buttonSize"
        color="#e1651f"
        to="/admin/blog/create"
      >
        <span class="linkText">Create a new blog</span>
      </v-btn>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <div v-for="blog in blogs.slice().reverse()" :key="blog.id">
        <blog-item :blog="blog" />
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import BlogItem from "../components/BlogItem.vue";
export default {
  name: "BlogPage",
  components: {
    BlogItem,
  },
  data() {
    var managerValue = "0";
    //var userValue = "0";
    if (localStorage.getItem("User") != null) {
      managerValue = JSON.parse(localStorage.getItem("User")).manager;
      //userValue = localStorage.getItem("User");
    }

    return {
      manager: managerValue,
      blogs: [],
    };
  },
  methods: {
    routeToCreateBlog() {
      this.$router.push("/admin/blog/create");
    },
    getBlog() {
      const __this = this;
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/blogs`,
        method: "GET",
        timeout: 0,
      };

      $.ajax(settings).done(function(response) {
        const a = JSON.parse(response).response;
        __this.blogs = a;
      });
    },
  },
  beforeMount() {
    this.getBlog();
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
  margin: 0% 0% -1% 0%;
}
.btn-wrapper {
  margin: 25px 0 65px 0;
}
.linkText {
  color: white;
}
.buttonCreate {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.buttonSize {
  width: 300px;
  height: 100px;
}
@media (max-width: 60em) {
  .buttonSize {
    width: 200px;
    height: 60px;
  }
  .linkText {
    color: white;
    font-size: 14px;
  }
}
</style>
