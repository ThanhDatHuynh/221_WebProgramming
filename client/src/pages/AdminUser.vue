<template>
    <div style="min-height:65%;">
        <div class="d-flex flex-wrap justify-center">
            <AdminItem type="UserHeader" :width="'100vw'" :height="'100px'" :imgSize="'70px'"
                :items="['ID', 'Name', 'Email', 'Phone', 'Manager']" />
        </div>
        <div class="d-flex flex-wrap justify-center">
            <div v-for="user in users.filter(
                (_, index) => index >= (page - 1) * 5 && index <= page * 5 - 1
            )" :key="user.id">
                <AdminItem type="User" :width="'100vw'" :height="'100px'" :imgSize="'70px'"
                    :items="[user.id, user.username, user.email, user.phoneNumber, user.manager, user.block]"
                    @onSubmit="toggleDeleteBtn(user.id)" @onBlock="toggleBlockBtn(user.id)" />
            </div>
        </div>
        <div class="text-center">
            <v-pagination class="mt-4 mb-8" v-model="modelPage" color="#e1651f" :length="
                users.length % 5 === 0
                    ? Math.floor(users.length / 5)
                    : Math.floor(users.length / 5) + 1
            " circle></v-pagination>
        </div>
        <ModalConfirm @toggleModalEvent="toggleDeleteBtn()" :isOpen="this.isDeleteModalOpen" :title="'Are you sure ?'"
            :content="'Do you want to delete this user?'" @callbackEvent="deleteUser" />
        <ModalConfirm @toggleModalEvent="toggleBlockBtn()" :isOpen="this.isBlockModalOpen" :title="'Are you sure ?'"
            :content="'Do you want to do this?'" @callbackEvent="blockUser" />
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
            page: 1,
            isDeleteModalOpen: false,
            isBlockModalOpen: false,
            idUser: 0,
            idUserBlock: 0,
            users: [],
        };
    }, computed: {
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
        //     window.location.reload();
        //     window.location.replace("http://localhost:8080/admin/user");
        // },

        toggleDeleteBtn(id) {
            this.isDeleteModalOpen = !this.isDeleteModalOpen;
            this.idUser = id;
        },

        toggleBlockBtn(id) {
            this.isBlockModalOpen = !this.isBlockModalOpen;
            this.idUserBlock = id;
        },

        blockUser() {
            var restUser = undefined
            this.users.forEach(user => {
                if (user.id == this.idUserBlock) restUser = user;
            });
            var restURL = restUser.block ? "unblock_user" : "block_user";
            var settings = {
                url: `${process.env.VUE_APP_API_URL}/admin/${restURL}`,
                method: "POST",
                timeout: 0,
                data: {
                    email: restUser.email
                },
                headers: {
                    "Bear-Token": localStorage.getItem("UserToken"),
                },
            };
            $.ajax(settings)
                .done(() => {
                    this.$router.go(this.$router.current);
                });
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
                url: `${process.env.VUE_APP_API_URL}/admin/get_block_users`,
                method: "GET",
                timeout: 0,
                headers: {
                    "Bear-Token": localStorage.getItem("UserToken"),
                },
            };
            var blockUsers = [];
            $.ajax(settings).done(function (response) {
                blockUsers = JSON.parse(response).response;
                settings = {
                    url: `${process.env.VUE_APP_API_URL}/admin/users`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Bear-Token": localStorage.getItem("UserToken"),
                    },
                };
                $.ajax(settings)
                    .done(function (response) {
                        const a = JSON.parse(response).response;
                        a.forEach(user => {
                            if (Array(blockUsers).find(blockUser => user.email == blockUser) != undefined) {
                                user.block = true;
                            } else {
                                user.block = false;
                            }
                        });
                        __this.users = a;
                    })
            });


        },
    },
    beforeMount() {
        this.getUser();
    },
}
</script>