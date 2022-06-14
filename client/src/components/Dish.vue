<template>
  <v-card 
  :to="'/menu/' + dish.id"
  class="mx-8 my-10 zoom-out" 
  width="330" 
  height="400"
  >
    <div>
      <v-img height="220" :src="dish.image" />
    </div>
    <div class="dish-container">
      <p class="dish-title">{{ dish.name }}</p>
      <p class="dish-description">{{ dish.description }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Dish",
  props: {
    dish: Object,
  },
};
</script>

<style scoped>
@import url("//db.onlinewebfonts.com/c/c8e8fcd5d85d9b587022fe0a79809b73?family=Friz+Quadrata");
.dish-container {
  padding: 4% 8% 0% 8%;
}
.zoom-out {
      transition: transform .1.5s; /* Animation */
}
.zoom-out:hover {
  transform: scale(1.05); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
.dish-title,
.dish-description,
.dish-price {
  margin: 3px 0px;
}
.dish-title {
  font-size: 24px;
  /* font-family: Oleo Script Swash Caps; */
  font-weight: 500;
}
.dish-description {
  font-size: 14px;
  color: #6a6a6a;
  letter-spacing: 0.5px;
}
</style>
