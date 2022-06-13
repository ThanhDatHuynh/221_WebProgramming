
<template>
    <div>
        <div class="title-wrapper">
            <div class="menu-title">
                <p>{{ this.data.name }}</p>
            </div>
        </div>
        <div class="text-center">
            <img :src="this.data.image" style="border-radius:10px;" />
        </div>
        <div class="text-center my-15" style="font-size:20px">
            <p>{{ this.data.description }}</p>
        </div>
        <div class="btn-wrapper d-flex flex-wrap justify-center">
            <Button @onClick="handleBtnClick" text="Add To Cart" width="148px" height="53px"  v-show="user != null"/>
        </div>
    </div>
</template>

<script>
import Button from "../components/Button";

import $ from "jquery";
// import Dish from "../components/Dish.vue";
// import Button from "../components/Button.vue";
export default {
    name: "MenuDetailPage",
    components: {
        Button,
    },
    data() {
        var managerValue = null;
        var userValue = null;
        if (localStorage.getItem("User") != null) {
            managerValue = JSON.parse(localStorage.getItem("User")).manager;
            userValue = localStorage.getItem("User");
        }
        console.log(userValue);
        return {
            data: {},
            user: userValue,
            manager: managerValue,
        };
    },
    methods: {
        getMenuDetail() {
            const __this = this;
            var settings = {
                url: `${process.env.VUE_APP_API_URL}/menu/{${this.$route.params.id}}`,
                method: "GET",
                timeout: 0,
            };

            $.ajax(settings)
                .done(function (response) {
                    const a = JSON.parse(response).response;
                    __this.data = a;
                })
        },
        handleBtnClick() {
            let currentCart = this.cart;
            let foodID = this.$route.params.id;
            if (!currentCart[foodID]) currentCart[foodID] = 1;
            else ++currentCart[foodID];
            this.updateCart(currentCart);
            this.cart = currentCart;
            this.$forceUpdate();
        },

    },
    inject: ['cart', 'updateCart'],
    beforeMount() {
        this.getMenuDetail();
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");

.title-wrapper {
    margin-bottom: 4%;
}

.menu-title {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 500%;
    margin: 2% 0% -1% 0%;
}

.menu-description {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-align: center;
    margin: 0% 8% -1% 8%;
}

.btn-wrapper {
    margin: 25px 0 65px 0;
}
</style>
