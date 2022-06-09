<template>
  <div class="text-center">
    <v-dialog v-model="isOpen" width="500">
      <v-card>
        <v-card-title>
          <h2>
            {{ title }}
          </h2>
        </v-card-title>

        <v-card-text class="content">
          {{ content }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="gray" @click="toggleModalOpen(false)">
            Cancel
          </v-btn>
          <v-btn color="#E1651F" @click="toggleModalOpen(true)">
            <span class="white--text">Confirm</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    isOpen: {
      type: Boolean,
    },
  },
  methods: {
    toggleModalOpen(isConfirm) {
      if (isConfirm) {
        this.$emit("callbackEvent");
      } else {
        this.$emit("toggleModalEvent");
      }
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 14px;
  font-size: 18px;
  font-weight: 500;
  padding: 5% 8% 6% 8%;
  color: black;
}
</style>
