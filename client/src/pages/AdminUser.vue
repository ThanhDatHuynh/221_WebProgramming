<template>
    <div>
        <div class="d-flex flex-wrap justify-center">
            <AdminItem
                type="UserHeader"
                :width="'100vw'"
                :height="'100px'"
                :imgSize="'70px'"
                :items="['ID', 'Name', 'Email', 'Phone']"
            /> 
        </div>
        <div class="d-flex flex-wrap justify-center">
            <div v-for="user in users" :key="user.id">
                <AdminItem
                    type="User"
                    :width="'100vw'"
                    :height="'100px'"
                    :imgSize="'70px'"
                    :items="[user.id, user.username, user.email, user.phoneNumber]"
                    @onSubmit="toggleDeleteBtn(user.id)"
                /> 
            </div>
        </div>
        <ModalConfirm
            @toggleModalEvent="toggleDeleteBtn()"
            :isOpen="this.isDeleteModalOpen"
            :title="'Are you sure ?'"
            :content="'Do you want to delete this user ?'"
            @callbackEvent="deleteUser"
        />
    </div>
</template>

<script>
import $ from "jquery";
import AdminItem from "../components/AdminItem.vue";
import ModalConfirm from "../components/ModalConfirm.vue";
export default {
    name: "adminUser",
    components: {
        AdminItem,
        ModalConfirm,
    },
    data() {
        return {
            isDeleteModalOpen: false,
            idUser: 0,
            users: [],
        };
    },
    methods: {
        // reloadPage() {
        //     window.location.reload();
        //     window.location.replace("http://localhost:8080/admin/user");
        // },

        toggleDeleteBtn(id) {
            this.isDeleteModalOpen = !this.isDeleteModalOpen;
            this.idUser = id;
        },

        deleteUser() {
            var settings = {
                url: `${process.env.VUE_APP_API_URL}/admin/delete_user/{${this.idUser}}`,
                method: "POST",
                timeout: 0,
                headers: {
                    "Bear-Token": localStorage.getItem("UserToken"),
                },
            };

            $.ajax(settings)
                .done(() => {
                    this.$router.go(this.$router.current)
                })
        },

        getUser() {
            const __this = this;
            var settings = {
                url: `${process.env.VUE_APP_API_URL}/admin/users`,
                method: "GET",
                timeout: 0,
                headers: {
                    "Bear-Token": localStorage.getItem("UserToken"),
                },
            };

            $.ajax(settings)
                .done(function(response) {
                    const a = JSON.parse(response).response;
                    __this.users = a;
                })
        },
    },
    beforeMount() {
        this.getUser();
    },
}
</script>