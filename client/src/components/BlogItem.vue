<template>
  <div class="blog-card">
    <v-card
      :to="'/blog/' + blog.id"
      class="mx-auto my-12"
      width="311"
      height="400"
    >
      <div>
        <v-img height="208" :src="blog.image" />
      </div>
      <p class="blog-title">{{ blog.title }}</p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "BlogItem",
  props: {
    blog: Object,
  },
};
</script>

<style scoped>
.blog-title {
  font-size: 22px;
  font-family: "Roboto, sans-serif",;
  font-weight: 500;
  text-align: center;
  padding: 5% 8% 6% 8%;
}

.blog-card {
  padding: 20px;
  animation: example 700ms ease-out;
  animation-fill-mode: backwards;
  transition: transform .1.5s; /* Animation */
}
@keyframes example {
  from {
    opacity: 0;
    transform: scale(0.3);
    filter: hue-rotate(180deg);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: hue-rotate(0deg);
  }
}
</style>