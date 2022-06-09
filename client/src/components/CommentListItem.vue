<template>
  <v-container fluid>
    <v-row align="center">
      <div class="comment" style="width = 70%">
        <v-container fluid>
          <span class="comment_title"> {{ comment.username }} </span>
          <v-lazy>
            <v-textarea
              hide-details
              outlined
              rows="3"
              auto-grow
              style="padding = 0"
              disabled
              :value="comment.description"
            ></v-textarea>
          </v-lazy>
        </v-container>
      </div>
      <v-spacer />
      <div>
        <v-btn
          v-show="userID == comment.user_id || this.manager == 1"
          color="#e1651f"
          @click="DeleteComment"
          class="button"
        >
          <div class="buttonText">Delete</div>
        </v-btn>
      </div>
      <v-spacer />
      <v-spacer />
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import $ from "jquery";
export default {
  name: "commentListItem",
  data() {
    var managerValue = "0";
    var userValue = null;
    var userID = "";
    if (localStorage.getItem("User") != null) {
      managerValue = JSON.parse(localStorage.getItem("User")).manager;
      userValue = JSON.parse(localStorage.getItem("User"));
      userID = JSON.parse(localStorage.getItem("User")).id;
    }

    return {
      user: userValue,
      manager: managerValue,
      userID: userID,
    };

    // return {
    //   user: JSON.parse(localStorage.getItem("User")),
    // };
  },
  props: {
    comment: Object,
  },
  methods: {
    reloadPage() {
      this.$router.go(this.$router.current);
    },

    DeleteComment() {
      var __this = this;
      if (this.manager != "1") {
        const token = localStorage.getItem("UserToken");
        var settings = {
          url: `${process.env.VUE_APP_API_URL}/comment/delete/{${this.$props.comment.id}}`,
          method: "POST",
          timeout: 0,
          data: {
            blogId: this.$props.comment.blog_id,
          },
          headers: {
            "Bear-Token": token,
          },
        };

        $.ajax(settings).done(function () { __this.reloadPage() });
      } else {
        const token = localStorage.getItem("UserToken");
        //const __this = this;
        settings = {
          url: `${process.env.VUE_APP_API_URL}/admin/delete_comment/{${this.$props.comment.id}}`,
          method: "POST",
          timeout: 0,
          data: {},
          headers: {
            "Bear-Token": token,
          },
        };
        $.ajax(settings).done(function () { __this.reloadPage() });
      }
    },
  },
};
</script>

<style scoped>
.comment {
  width: 65vw;
}
.buttonText {
  color: white;
}
.comment_title {
  font-weight: 600;
  color: #c7632a;
}
.button {
  width: 100px;
}
@media (max-width: 35em) {
  .comment {
    width: 55vw;
  }
  .button {
    width: 70px;
  }
}
</style>
