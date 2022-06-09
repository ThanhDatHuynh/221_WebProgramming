<template>
  <div>
    <!-- User Admin Item -->
    <v-container
      :class="`elevation-2`"
      v-if="type == 'User'"
      elevation="3"
      :style="[style]"
    >
      <v-row align="center" justify="center">
        <v-col :style="[element, primary]">
          {{ items[0] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[1] }}
        </v-col>
        <v-col :style="[element, secondary]">
          {{ items[2] }}
        </v-col>
        <v-col :style="[element, secondary]">
          {{ items[3] }}
        </v-col>
        <v-col>
          <Button
            :style="[element]"
            text="Delete"
            :width="'96px'"
            :height="'27px'"
            @onClick="handleSubmit"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- User Admin Header -->
    <v-container v-else-if="type == 'UserHeader'" :style="[styleHeader]">
      <v-row align="center" justify="center">
        <v-col :style="[element, primary]">
          {{ items[0] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[1] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[2] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[3] }}
        </v-col>
        <v-col>
          <div class="add-btn ">
            <Button width="96px" height="27px" text="White Button" />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dish Admin Item -->
    <v-container
      :class="`elevation-2`"
      v-else-if="type == 'Dish'"
      :style="[style]"
    >
      <v-row align="center" justify="center">
        <v-col :style="[element, primary]">
          {{ items[0] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[1] }}
        </v-col>
        <v-col :style="[element, secondary]">
          <img :style="[dishImage]" :src="items[2]" :alt="items[2]" />
        </v-col>
        <v-col :style="[element, secondary]">
          {{ items[3].slice(0, 60) + "..." }}
        </v-col>
        <div>
          <v-col>
            <Button
              :style="[element]"
              text="Edit"
              :width="'90px'"
              :height="'27px'"
              @onClick="handleEditBtnClick"
            />
          </v-col>
        </div>
        <div>
          <v-col>
            <Button
              :style="[element]"
              text="Delete"
              :width="'90px'"
              :height="'27px'"
              @onClick="handleSubmit"
            />
          </v-col>
        </div>
      </v-row>
    </v-container>

    <!-- Dish Admin Header -->
    <v-container v-else-if="type == 'DishHeader'" :style="[styleHeader]">
      <v-row align="center" justify="center">
        <v-col :style="[element, primary]">
          {{ items[0] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[1] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[2] }}
        </v-col>
        <v-col :style="[element, primary]">
          {{ items[3] }}
        </v-col>
        <div>
          <v-col>
            <div class="add-btn">
              <Button
                @onClick="handleAddBtnClick"
                text="Add Product"
                width="207px"
                height="53px"
              />
            </div>
          </v-col>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  name: "AdminItem",
  components: { Button },
  props: {
    width: String,
    height: String,
    items: Array,
    type: String,
    imgSize: String,
  },
  methods: {
    handleAddBtnClick() {
      this.$router.push({ name: "adminCreateDish" });
    },

    handleEditBtnClick() {
      this.$router.push({
        name: "adminEditDish",
        params: { id: this.items[0] },
      });
    },

    handleSubmit() {
      this.$emit("onSubmit");
    },
  },
  data() {
    return {
      style: {
        margin: "20px auto",
        width: this.width,
        height: this.height,
        borderRadius: "20px",
        background: "#f7fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      styleHeader: {
        margin: "10px auto",
        width: this.width,
        height: this.height,
        borderRadius: "20px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      element: {
        textAlign: "center",
      },
      primary: {
        fontFamily: "Roboto",
        fontSize: "18px",
        fontWeight: "700",
        color: "#2a4365",
      },
      secondary: {
        fontFamily: "Poppins",
        fontSize: "14px",
        lineHeight: "160%",
        textDecorationLine: "underline",
        color: "#6a6a6a",
        padding: "0 15px",
      },
      dishImage: {
        width: this.imgSize,
        height: this.imgSize,
        borderRadius: "10px",
        margin: "0 20px",
      },
    };
  },
};
</script>

<style></style>
