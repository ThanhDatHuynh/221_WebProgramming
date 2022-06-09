<template>
  <div v-if="isSuccess" :style="[style]">
    <div
      class="info-item"
      :style="[styleInfo]"
      v-for="(value, key, index) in notes"
      :key="index"
    >
      <p>{{ key }}: {{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReservationNote",
  props: {
    isSuccess: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: Object,
    },
  },
  data() {
    return {
      style: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      },
      styleInfo: {
        // width: "50%",
        // fontSize: "110%",
        // display: "flex",
        // justifyContent: "center",
        // marginTop: "20px",
        // fontFamily: "Poppins",
        // fontWeight: "400",
      },
    };
  },
};
</script>

<style>
.info-item {
  width: 50%;
  font-size: 110%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: "Poppins";
  font-weight: 400;
}

@media screen and (max-width: 900px) {
  .info-item {
    width: 100%;
  }
}
</style>
