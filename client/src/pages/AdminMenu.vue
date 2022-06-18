<template>
  <div style="min-height:65vh" class="bg-5">
    <div class="d-flex flex-wrap justify-center">
      <AdminItem type="DishHeader" :width="'95vw'" :height="'100px'" :imgSize="'70px'"
        :items="['ID', 'Name', 'Image', 'Description', 'Price']" @onSubmit="toggleAddBtn" to="/admin/user" />
    </div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="dish in dishes.filter(
        (_, index) => index >= (page - 1) * 5 && index <= page * 5 - 1
      )" :key="dish.id">
        <AdminItem type="Dish" :width="'95vw'" :height="'100px'" :imgSize="'70px'"
          :items="[dish.id, dish.name, dish.image, dish.description, dish.price]"
          @onSubmit="toggleDeleteBtn(dish.id)" />
      </div>
    </div>
    <div class="text-center">
      <v-pagination class="mt-4 mb-8" v-model="modelPage" color="#e1651f" :length="
        dishes.length % 5 === 0
          ? Math.floor(dishes.length / 5)
          : Math.floor(dishes.length / 5) + 1
      " circle></v-pagination>
    </div>
    <ModalConfirm @toggleModalEvent="toggleDeleteBtn()" :isOpen="this.isDeleteModalOpen" :title="'Are you sure ?'"
      :content="'Do you want to delete this dish ?'" @callbackEvent="deleteDish" />
  </div>
</template>

<script>
import $ from "jquery";
import AdminItem from "../components/AdminItem.vue";
import ModalConfirm from "../components/ModalConfirm.vue";
export default {
  name: "adminMenu",
  components: {
    AdminItem,
    ModalConfirm,
  },
  data() {
    return {
      isDeleteModalOpen: false,
      idDish: 0,
      dishes: [],
      page: 1,
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
    // reloadPage() {
    //   window.location.reload();
    //   window.location.replace("http://localhost:8080/admin/menu");
    // },
    toggleAddBtn() {
      this.$router.push({ name: "adminUser" });
    },

    toggleDeleteBtn(id) {
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
      this.idDish = id;
    },

    deleteDish() {
      // var __this = this;
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/admin/delete_dish/{${this.idDish}}`,
        method: "POST",
        timeout: 0,
        headers: {
          "Bear-Token": localStorage.getItem("UserToken"),
        },
      };

      $.ajax(settings).done(() => {
        this.$router.go(this.$router.current);
      });
    },

    getMenu() {
      const __this = this;
      var settings = {
        url: `${process.env.VUE_APP_API_URL}/menu`,
        method: "GET",
        timeout: 0,
      };

      $.ajax(settings).done(function (response) {
        const a = JSON.parse(response).response;
        __this.dishes = a;
      });
    },
  },
  beforeMount() {
    this.getMenu();
  },
};
</script>
