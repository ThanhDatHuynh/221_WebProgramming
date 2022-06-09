<template>
  <div class="d-flex flex-column mb-6 align-center">
    <div class="CustomTitle">
      {{ title }}
    </div>
    <div class="CustomContent">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
  },
  props: ["title", "content"],
};
</script>

<style scoped>
.CustomTitle {
  font-weight: 800;
  font-family: "Oleo Script Swash Caps", cursive;
  font-size: 44px;
}

.CustomContent {
  width: 50vw;
  align-content: center;
  font-size: 18px;
  font-weight: 300;
  color: black;
  font-family: "Poppins", sans-serif;
}
</style>