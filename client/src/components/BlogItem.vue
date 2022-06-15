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
}
</style>