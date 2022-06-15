<template>
  <div class="edit-blog-wrapper">
    <ModalConfirm @toggleModalEvent="toggleModalOpen('createBlog')" :isOpen="this.isCreateBlogModalOpen"
      :title="'Create Blog Confirm'" :content="'You are about to create new blog'" @callbackEvent="handleSubmit" />
    <ModalConfirm @toggleModalEvent="toggleModalOpen('editBlog')" :isOpen="this.isEditBlogModalOpen"
      :title="'Edit Blog Confirm'" :content="'You are about to edit your blog'" @callbackEvent="handleSubmit" />
    <div class="reservation-title">
      <p>Create/Edit Blog</p>
    </div>
    <div class="form-wrapper">
      <Form :type="'EditBlog'" :data="formData" :errorMessages="errorMessages" @onFormChange="handleFormChange"
        @onSubmit="
          $route.name === 'adminCreateBlog'
            ? toggleModalOpen('createBlog')
            : toggleModalOpen('editBlog')
        " />
      <div v-show="isFormSubmited" class="reservation-note" ref="note">
        <div ref="noteTitle" class="note-title"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form.vue";
import * as yup from "yup";
import $ from "jquery";
import ModalConfirm from "../components/ModalConfirm.vue";

export default {
  name: "EditBlogPage",
  components: { Form, ModalConfirm },
  data() {
    return {
      isFormSubmited: false,
      currentBlogId: null,
      isCreateBlogModalOpen: false,
      isEditBlogModalOpen: false,
      formData: {
        // Vue Object Data will be convert into Observer
        imageUrl: "",
        blogTitle: "",
        blogContent: "",
      },
      errorMessages: {
        imageUrl: "",
        blogTitle: "",
        blogContent: "",
      },

      // Add field with name in errorMessages for others' validation
      schema: yup.object().shape({
        blogTitle: yup.string().min(10).label("Title"),
        imageUrl: yup.string().url().min(0).label("Image URL"),
      }),
    };
  },
  beforeMount() {
    this.currentBlogId = this.$route.params.id;
    if (this.currentBlogId) {
      this.GetBlogData();
    }
  },

  methods: {
    toggleModalOpen(type) {
      if (type === "createBlog") {
        this.isCreateBlogModalOpen = !this.isCreateBlogModalOpen;
      } else if (type === "editBlog") {
        this.isEditBlogModalOpen = !this.isEditBlogModalOpen;
      }
    },

    GetBlogData() {
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/blog/{${this.currentBlogId}}`,
        method: "GET",
        timeout: 0,
        data: {},
        headers: {},
      };

      $.ajax(settings).then((response) => {
        response = JSON.parse(response);
        if (response.status === 200) {
          const blog = response.response.blog;
          this.formData.imageUrl = blog.image;
          this.formData.blogTitle = blog.title;
          this.formData.blogContent = blog.content;
        } else {
          alert("Cannot get blog to edit");
        }
      });
    },

    async handleInputValidation({ name, value }) {
      let validationResult = await this.schema
        .validate({ [name]: value })
        .catch((error) => {
          return error;
        });
      if (validationResult.errors) {
        this.errorMessages[name] = validationResult.errors[0];
        return false;
      } else {
        this.errorMessages[name] = "";
        return true;
      }
    },

    handleFormChange(newData) {
      this.formData[newData.name] = newData.value;
      this.handleInputValidation(newData);
    },

    async handleSubmit() {
      let titleOK = await this.handleInputValidation({ name: "blogTitle", value: this.formData.blogTitle });
      let imageUrlOK = await this.handleInputValidation({ name: "imageUrl", value: this.formData.imageUrl });
      if (!titleOK || !imageUrlOK) { this.toggleModalOpen("createBlog"); return; }
      var __this = this;
      const formData = JSON.parse(JSON.stringify(this.formData));

      const UserToken = localStorage.getItem("UserToken");
      if (UserToken === "") {
        alert("Please login admin account before to edit or create blog");
        return;
      }

      this.isFormSubmited = true;
      if (this.$route.name === "adminCreateBlog") {
        /**
         * Handle Edit Profile
         */
        this.toggleModalOpen("createBlog");
        let settings = {
          url: `${process.env.VUE_APP_API_URL}/admin/create_blog`,
          method: "post",
          timeout: 0,
          data: {
            image: formData.imageUrl,
            title: formData.blogTitle,
            content: formData.blogContent,
          },
          headers: {
            "Bear-Token": UserToken,
          },
        };
        $.ajax(settings).done(function (response) {
          response = JSON.parse(response);
          if (response.status == 200) {
            __this.$refs.noteTitle.innerHTML = "Your Blog Have Been Created";
            __this.$router.replace({ name: "blog" });
          } else {
            __this.$refs.noteTitle.innerHTML = response.message;
          }
        });
      } else if (this.$route.name === "adminEditBlog") {
        /**
         * Handle Edit Password
         */
        this.toggleModalOpen("editBlog");
        let settings = {
          url: `${process.env.VUE_APP_API_URL}/admin/update_blog/{${this.currentBlogId}}`,
          method: "post",
          timeout: 0,
          data: {
            image: formData.imageUrl,
            title: formData.blogTitle,
            content: formData.blogContent,
          },
          headers: {
            "Bear-Token": UserToken,
          },
        };
        $.ajax(settings).done(function (response) {
          response = JSON.parse(response);
          if (response.status == 200) {
            __this.$refs.noteTitle.innerHTML = "Your Blog Have Been Edited";
            __this.$router.replace({ name: "blog" });
          } else {
            __this.$refs.noteTitle.innerHTML = response.message;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.edit-blog-wrapper {
  margin: 50px 0 50px 0;
}

.reservation-title {
  font-family: Oleo Script Swash Caps;
  text-align: center;
  font-size: 500%;
  margin: 0px 0px 50px 0px;
}

.reservation-note {
  margin: 20px auto;
  width: 100%;
  border-radius: 20px;
  background-color: #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.reservation-note>* {
  width: 100%;
}

.note-title {
  font-family: Roboto, 'san-serif';
  text-align: center;
  font-size: 200%;
  margin: 20px 0 20px 0;
}

.form-wrapper {
  width: 50%;
  margin: auto;
}

@media screen and (max-width: 1700px) {
  .form-wrapper {
    width: 60%;
  }
}

@media screen and (max-width: 1400px) {
  .form-wrapper {
    width: 70%;
  }
}

@media screen and (max-width: 1000px) {
  .form-wrapper {
    width: 80%;
  }
}

@media screen and (max-width: 700px) {
  .form-wrapper {
    width: 90%;
  }
}
</style>
