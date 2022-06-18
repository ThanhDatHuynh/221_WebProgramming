<template>
  <v-container fluid>
    <v-row align="center">
      <div class="comment">
        <v-container fluid>
          <v-lazy>
            <v-textarea
              hide-details
              outlined
              rows="3"
              auto-grow
              style="padding = 0"
              placeholder="Say something"
              v-model="commentData"
              @change="handleChange($event)"
            ></v-textarea>            
          </v-lazy>
          <p v-show="isFail" style="color:red;">{{cmtMessage}}</p>
        </v-container>
      </div>
      <v-spacer />
      <div>
        <v-btn color="#e1651f" @click="PostComment" class="button">
          <div class="buttonText">Send</div>
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
  name: "comment",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      cmtMessage: "",
      isFail: false,
      commentData: "",
      userToken: localStorage.getItem("UserToken"),
      userID: JSON.parse(localStorage.getItem("User")).id,
      user: JSON.parse(localStorage.getItem("User")),
    };
  },

  methods: {
    handleChange(value) {
      if (value == "") {
        this.isFail = true;
        this.cmtMessage = "Please type something in comment!";
      }
      else {
        this.isFail = false;
        this.cmtMessage = "";
      }
    },
    reloadPage() {
      this.$router.go(this.$router.current);
    },

    PostComment() {
      const __this = this;
      if (this.commentData == "") {
        this.isFail = true;
        this.cmtMessage = "Please type something in comment!";
        return;
      }
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/comment/create`,
        method: "POST",
        timeout: 0,
        data: {
          blogId: this.id,
          description: this.commentData,
          userId: "",
        },
        headers: {
          "Bear-Token": this.userToken,
        },
      };

      $.ajax(settings).then((response) => {
        this.isLoading = false;
        const a = JSON.parse(response).response;
        this.item = a;
        __this.reloadPage();
      });
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
