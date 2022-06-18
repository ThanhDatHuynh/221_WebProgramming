<template>
    <div style="min-height:70%;">
        <div class="text-center">
            <v-pagination class="mt-4 mb-8" v-model="modelPage" color="#e1651f" :length="
                reservations.length % 5 === 0
                    ? Math.floor(reservations.length / 5)
                    : Math.floor(reservations.length / 5) + 1
            " circle></v-pagination>
            </div>
        <div class="d-flex flex-wrap justify-center">
            <AdminItem type="ReservationHeader" :width="'100vw'" :height="'100px'" :imgSize="'70px'"
                :items="['ID', 'Name', 'Date', 'Time']" />
        </div>
        <div class="d-flex flex-wrap justify-center">
            <div v-for="reservation in reservations.filter(
                (_, index) => index >= (page - 1) * 5 && index <= page * 5 - 1
            )" :key="reservation.id">
                <AdminItem type="Reservation" :width="'100vw'" :height="'100px'" :imgSize="'70px'"
                    :items="[reservation.id, reservation.name, reservation.date, reservation.time]"
                    @onSubmit="toggleDeleteBtn(user.id)" @onBlock="toggleBlockBtn(user.id)" />
                <modal-vue @on-close="() => onCloseReservation(reservation.id)"
                    :name="`modal-reservation-${reservation.id}`" :headerOptions="{
                        title: 'Reservation Information',
                    }" noFooter modalSize="lg">
                    <div style="padding:20px" class="text-center">
                        <table>
                            <tr>
                                <th>Reservation ID</th>
                                <td>{{ reservation.id }}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{{ reservation.name }}</td>
                            </tr>
                            <tr>
                                <th>User Email</th>
                                <td>{{ reservation.email }}</td>
                            </tr>
                            <tr>
                                <th>User Phone Number</th>
                                <td>{{ reservation.phoneNumber }}</td>
                            </tr>
                            <tr>
                                <th>Number Of Persons</th>
                                <td>{{ reservation.NoP }}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{{ reservation.date }}</td>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <td>{{ reservation.time }}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{{ reservation.description }}</td>
                            </tr>
                        </table>

                    </div>
                </modal-vue>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 10px;
    margin: auto;
    width: 80%;
}
</style>
<script>
import $ from "jquery";
import AdminItem from "../components/AdminItem.vue";
// import ModalConfirm from "../components/ModalConfirm.vue";
export default {
    name: "adminReservation",
    components: {
        AdminItem,
        //ModalConfirm,
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
    data() {
        return {
            page: 1,
            reservations: [],
            isDeleteModalOpen: false,
            isBlockModalOpen: false,
            idUser: 0,
            idUserBlock: 0,
            users: [],
        };
    },
    methods: {
        // reloadPage() {
        //     window.location.reload();
        //     window.location.replace("http://localhost:8080/admin/user");
        // },
        onCloseReservation(id) {
            this.$vm2.close(`modal-reservation-${id}`)
        },
        toggleDeleteBtn(id) {
            this.isDeleteModalOpen = !this.isDeleteModalOpen;
            this.idUser = id;
        },

        toggleBlockBtn(id) {
            this.isBlockModalOpen = !this.isBlockModalOpen;
            this.idUserBlock = id;
        },

        blockUser() {
            var restURL = this.users[parseInt(this.idUserBlock) - 1].block ? "unblock_user" : "block_user";
            var settings = {
                url: `${process.env.VUE_APP_API_URL}/admin/${restURL}`,
                method: "POST",
                timeout: 0,
                data: {
                    email: this.users[parseInt(this.idUserBlock) - 1].email
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
        getAllReservations() {
            const __this = this;
            var settings = {
                url: `${process.env.VUE_APP_API_URL}/admin/get_all_reservations`,
                method: "GET",
                timeout: 0,
                headers: {
                    "Bear-Token": localStorage.getItem("UserToken"),
                },
            };
            $.ajax(settings)
                .done(function (response) {
                    const a = JSON.parse(response);
                    if (a.status != 200) {
                        alert("Cannot get all reservations");
                    }
                    __this.reservations = a.response;
                }
                );
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
        //this.getUser();
        this.getAllReservations();
    },
}
</script>