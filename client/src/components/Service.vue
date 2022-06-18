<template>
  <v-card class="service-card" width="374" elevation="6">
    <div class="service-container">
        <div class="service-icon">
            <v-icon x-large color="#e1651f">{{service[0]}}</v-icon>
        </div>
        <p class="service-title">{{service[1]}}</p>
        <p class="service-description">{{service[2]}}</p>
    </div>
  </v-card>
</template>

<script>
export default {
    name: 'Service',
    props: {
        service: Array,
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap');
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
}    .service-card {
     margin: 30px 70px;
    animation: example 700ms ease-out;
  animation-fill-mode: backwards;
  transition: transform .1.5s; /* Animation */
    }
    .service-container {
        padding: 2% 4%;
    }
    .service-icon {
        padding: 5% 45%;
    }
    .service-description, .service-title {
        text-align: center;
    }
    .service-title {
        font-size: 24px;
        font-family: Oleo Script Swash Caps;
    }
@media screen and (max-width: 1550px) {
    .service-card {
        margin: 30px 30px;
    }
    .service-container {
        padding: 2% 4%;
    }
    .service-icon {
        padding: 5% 45%;
    }
    .service-description, .service-title {
        text-align: center;
    }
    .service-title {
        font-size: 24px;
        font-family: Oleo Script Swash Caps;
    }
}
</style>
