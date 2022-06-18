<template>
  <div v-if="!isLoading" id="blog-detail">
    <v-container>
      <v-layout align-center justify-space-around style="flex-wrap:wrap">
        <h1 class="text-center mt-10">{{ item.blog.title }}</h1>
        <div style="width:100%;display:flex;justify-content:center; margin: 20px 0px 20px 0;">
          <v-btn v-show="manager == '1'" @click="toggleDeleteBtn()" width="7vw" height="2.5vw" color="#e1651f">
            <span class="linkText">Delete</span>
            <ModalConfirm @toggleModalEvent="toggleDeleteBtn()" :isOpen="this.isModalOpen" :title="'Are you sure ?'"
            :content="'Do you want to delete this blog?'" @callbackEvent="deletePost" />
          </v-btn>
          <div style="width:5%"></div>
          <v-btn v-show="manager == '1'" @click="this.routeToEditBlog" width="7vw" height="2.5vw" color="#e1651f">
            <span class="linkText">Edit</span>
          </v-btn>
        </div>
      </v-layout>
      <v-layout align-center justify-center>
        <v-img max-height="30vw" max-width="70vw" :src="item.blog.image" style="border-radius:10px;"></v-img>
      </v-layout>
    </v-container>

    <div class="blog-content">
      <h3>WRITTEN ON {{ item.blog.date }}</h3>
      <paragraph class="text-justify" style='font-family: "Roboto", "sans-serif";' :content="item.blog.content">
      </paragraph>
    </div>

    <div class="reply">
      <h2>Reply</h2>
      <comment v-if="user !== null" :id="item.blog.id" />
      <div v-for="comment in comments.slice().reverse().filter(
        (_, index) => index >= (page - 1) * 2 && index <= page * 2 - 1
      )" :key="comment.id">
        <comment-list-item :comment="comment" />
      </div>
      <div class="text-center">
        <v-pagination class="mt-4 mb-8" v-model="modelPage" color="#e1651f" :length="
          comments.length % 2 === 0
            ? Math.floor(comments.length / 2)
            : Math.floor(comments.length / 2) + 1
        " circle></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue";
import Paragraph from "../components/Paragraph.vue";
import $ from "jquery";
import CommentListItem from "../components/CommentListItem.vue";
import ModalConfirm from "../components/ModalConfirm.vue";
export default {
  components: { Paragraph, Comment, CommentListItem, ModalConfirm },
  name: "blogDetail",
  data() {
    var managerValue = "0";
    var userValue = null;
    if (localStorage.getItem("User") != null) {
      managerValue = JSON.parse(localStorage.getItem("User")).manager;
      userValue = JSON.parse(localStorage.getItem("User"));
    }
    return {
      page: 1,
      isLoading: false,
      formData: {
        // Vue Object Data will be convert into Observer
      },
      item: [],
      comments: [],
      numBlog: this.$route.params.id,
      manager: managerValue,
      user: userValue,
      isModalOpen: false,
    };
  },
  computed: {
    modelPage: {
      get() {
        return this.page;
      },
      set(value) {
        this.page = value;
      },
    },
  },
  methods: {
    toggleDeleteBtn() {
      this.isModalOpen = !this.isModalOpen;
    },
    reloadPage() {
      this.$router.push("/blog");
    },

    routeToEditBlog() {
      this.$router.push({
        name: "adminEditBlog",
        params: { id: this.$route.params.id },
      });
    },

    deletePost() {
      const token = localStorage.getItem("UserToken");
      var __this = this;

      var settings = {
        url: `${process.env.VUE_APP_API_URL}/admin/delete_blog/{${this.numBlog}}`,
        method: "POST",
        timeout: 0,
        data: {},
        headers: {
          "Bear-Token": token,
        },
      };

      $.ajax(settings).then(() => {
        __this.reloadPage();
      });
    },

    GetBlogData() {
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/blog/{${this.numBlog}}`,
        method: "GET",
        timeout: 0,
        data: {},
        headers: {},
      };

      $.ajax(settings).then((response) => {
        this.isLoading = false;
        const a = JSON.parse(response).response;
        this.item = a;
        this.comments = this.item.comments;
      });
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.GetBlogData();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.blog-content {
  padding: 5vw;
  font-family: "Roboto", "sans-serif";
}

.reply {
  padding: 0vw 5vw 5vw 5vw;
}

.linkText {
  color: white;
  font-size: 1vw;
}

.title {
  min-height: 70px;
}
</style>
