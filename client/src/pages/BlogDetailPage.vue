<template>
  <div v-if="!isLoading" id="blog-detail">
    <v-container>
      <v-layout align-center justify-space-around style="flex-wrap:wrap">
        <h1 class="text-center mt-10">{{ item.blog.title }}</h1>
        <div style="width:100%;display:flex;justify-content:center; margin: 20px 0px 20px 0;">
          <v-btn v-show="manager == '1'" @click="this.deletePost" width="7vw" height="2.5vw" color="#e1651f">
            <span class="linkText">Delete</span>
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

    <div class="blogContent">
      <h3>WRITTEN ON {{ item.blog.date }}</h3>
      <paragraph class="text-justify" :content="item.blog.content"></paragraph>
    </div>

    <div class="reply">
      <h2>Reply</h2>
      <comment v-if="user !== null" :id="item.blog.id" />
      <div v-for="comment in comments.slice().reverse()" :key="comment.id">
        <comment-list-item :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue";
import Paragraph from "../components/Paragraph.vue";
import $ from "jquery";
import CommentListItem from "../components/CommentListItem.vue";
export default {
  components: { Paragraph, Comment, CommentListItem },
  name: "blogDetail",
  data() {
    var managerValue = "0";
    var userValue = null;
    if (localStorage.getItem("User") != null) {
      managerValue = JSON.parse(localStorage.getItem("User")).manager;
      userValue = JSON.parse(localStorage.getItem("User"));
    }
    return {
      isLoading: false,
      formData: {
        // Vue Object Data will be convert into Observer
      },
      item: [],
      comments: [],
      numBlog: this.$route.params.id,
      manager: managerValue,
      user: userValue,
    };
  },

  methods: {
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
.blogContent {
  padding: 5vw;
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
