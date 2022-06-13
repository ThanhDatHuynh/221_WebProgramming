<template>
    <div class="container" style="min-height:60vh">
        <div class="title-wrapper">
            <div class="menu-title">
                <p>Your Cart</p>
            </div>
        </div>
        <div v-if="data.length > 0">
            <div>
                <div v-for="food in this.data" :key="food.id" class="row align-items-center justify-center rounded"
                    :v-show="cart[food.id] >= 0" style="background-color:#f2f2f2; margin:5px">
                    <div class="col-3 text-center" style="flex-wrap:wrap; align-self:center">{{ food.name }}</div>
                    <div class="col-3 text-center" style="flex-wrap:wrap; align-self:center"><img :src="food.image"
                            style="max-width:100px; border-radius:5px" /></div>
                    <div class="col-1 text-center" style="flex-wrap:wrap; align-self:center">
                        <span @click="() => decrFoodQuantity(food.id)">
                            <font-awesome-icon icon="fa-solid fa-circle-minus" />
                        </span>
                    </div>
                    <div class="col-1 text-center" style="flex-wrap:wrap; align-self:center">
                        {{ cart[food.id] }}
                    </div>
                    <div class="col-1 text-center" style="flex-wrap:wrap; align-self:center">
                        <span @click="() => incrFoodQuantity(food.id)">
                            <font-awesome-icon icon="fa-solid fa-circle-plus" />
                        </span>
                    </div>
                    <div class="col-3 text-center" style="flex-wrap:wrap; align-self:center">{{ food.price *
                            cart[food.id]
                    }} $</div>
                </div>
            </div>
            <div>
                <div class="row align-items-center justify-center rounded" style="background-color:#f2f2f2; margin:5px">
                    <div class="col-3 text-center" style="flex-wrap:wrap; align-self:center">Total:</div>
                    <div class="col-3 text-center" style="flex-wrap:wrap; align-self:center"></div>
                    <div class="col-3 text-center" style="flex-wrap:wrap; align-self:center"></div>
                    <div class="col-3 text-center" style="flex-wrap:wrap; align-self:center">{{ data.reduce((result,
                            food) => result + (food.price * cart[food.id]), 0)
                    }}$</div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="title-wrapper">
                <div class="menu-title">
                    <p>Please choose some food!</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
//import Button from "../components/Button";

import $ from "jquery";
// import Dish from "../components/Dish.vue";
// import Button from "../components/Button.vue";
export default {
    name: "MenuDetailPage",
    components: {
        //Button,
    },
    data() {
        return {
            localCart: {}, // for update
            data: {},
        };
    },
    methods: {
        getData() {
            const __this = this;
            var settings = {
                url: `${process.env.VUE_APP_API_URL}/menu`,
                method: "GET",
                timeout: 0,
            };
            $.ajax(settings)
                .done(function (response) {
                    let a = JSON.parse(response).response;
                    __this.data = a.filter((food) => {
                        return __this.cart[food.id] && __this.cart[food.id] > 0;
                    });
                })
            __this.localCart = __this.cart;
        },
        decrFoodQuantity(key) {
            let currentCart = this.cart;
            if (currentCart[key] > 0) {
                --currentCart[key];
                if (currentCart[key] == 0) {
                    delete currentCart[key];
                    this.data = this.data.filter((food) => {
                        return this.cart[food.id] && this.cart[food.id] > 0;
                    });
                }
                this.cart = currentCart;
                this.localCart = this.cart;
                this.updateCart(currentCart);
            }
            this.$forceUpdate()
        },
        incrFoodQuantity(key) {
            let currentCart = this.cart;
            ++currentCart[key];
            this.cart = currentCart;
            this.localCart = this.cart;
            this.updateCart(currentCart);
            this.$forceUpdate();
        },
    },
    inject: ['cart', 'updateCart'],
    beforeMount() {
        this.getData();
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap");

.title-wrapper {
    margin-bottom: 4%;
}

.menu-title {
    font-family: Oleo Script Swash Caps;
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
