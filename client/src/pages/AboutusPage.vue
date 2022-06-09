<template>
    <div>
        <div class="d-flex flex-wrap justify-center mx-8 my-15">
            <div class="images mx-4">
                <img src="@/assets/About1.png" alt="Restaurant Information 1" />
            </div>
            <div class="images mx-4">
                <div :style="{ marginBottom: '8%' }"><img src="@/assets/About2.png" alt="Restaurant Information 2" />
                </div>
                <div :style="{ marginTop: '8%' }"><img src="@/assets/About3.png" alt="Restaurant Information 3" /></div>
            </div>
            <div class="text-wrapper">
                <div class="about-title">
                    <p>About Us</p>
                </div>
                <div class="about-description">
                    <p>Fish is one of the most wholesome foods that man can eat. In fact, people have been eating fish
                        throughout human history. These days, many cooks yearn Fish is one of the most wholesome foods
                        that man can eat. In fact,</p>
                    <p>Fish is one of the most wholesome foods that man can eat. In fact, people have been eating fish
                        throughout human history. These days, many cooks yearn Fish is</p>
                </div>
                <div class="btn-wrapper d-flex">
                    <Button @onClick="handleExploreBtnClick" text="Explore More" width="148px" height="53px"
                        to="/menu" />
                </div>
            </div>
        </div>
        <div class="mx-8 my-15">
            <div class="question-title">
                <p>Why to choose us?</p>
            </div>
            <div class="question-description d-flex justify-center">
                <p>Fish is one of the most wholesome foods that man can eat. In fact, people have been eating fish
                    throughout human</p>
            </div>
        </div>
        <div class="d-flex flex-wrap justify-center my-15">
            <div v-for="service in services" :key="service[0]">
                <Service :service="service" />
            </div>
        </div>
    </div>
</template>

<script>
import Button from "../components/Button.vue";
import Service from "../components/Service.vue";
export default {
    name: 'aboutUsPage',
    components: { Button, Service },
    data: () => ({
        services: [
            ["mdi-table-chair", "Service", "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services"],
            ["mdi-chef-hat", "Service", "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services"],
            ["mdi-truck-fast", "Service", "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services"],
            ["mdi-alarm-check", "Service", "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services"],
            ["mdi-phone-message", "Service", "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services"],
            ["mdi-silverware-fork-knife", "Service", "We provide best and fresh quality foods. We also gives you required signature dishes ad more nice and cool services"],
        ],
    }),
    methods: {
        handleExploreBtnClick() {
            this.$router.push({ name: "menu" });
        },
    }
}
</script>

<style scoped>
.text-wrapper {
    width: 35%;
    margin: 5% 2% 5% 7%;
}

.about-title,
.question-title {
    font-family: Oleo Script Swash Caps;
    font-size: 300%;
    margin: 0% 0% 5% 0%;
}

.about-description {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-bottom: 8%;
}

.question-title {
    text-align: center;
    margin: 0% 0% 0% 0%;
}

.question-description {
    text-align: center;
    margin: 0vh 35vw 2vh 35vw;
}

@media screen and (max-width: 1600px) {
    .text-wrapper {
        width: 35%;
        margin: 5% 2% 5% 7%;
    }

    .about-title,
    .question-title {
        font-family: Oleo Script Swash Caps;
        font-size: 300%;
        margin: 0% 0% 5% 0%;
    }

    .about-description {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin-bottom: 8%;
    }

    .question-title {
        text-align: center;
        margin: 0% 0% 0% 0%;
    }

    .question-description {
        text-align: center;
        margin: 0vh 30vw 2vh 30vw;
    }
}

@media screen and (max-width: 1200px) {
    .text-wrapper {
        width: 80%;
        margin: 5% 2% 5% 7%;
    }

    .about-title,
    .question-title {
        font-family: Oleo Script Swash Caps;
        font-size: 300%;
        margin: 0% 0% 5% 0%;
    }

    .about-description {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin-bottom: 8%;
    }

    .question-title {
        text-align: center;
        margin: 0% 0% 0% 0%;
    }

    .question-description {
        text-align: center;
        margin: 0vh 25vw 2vh 25vw;
    }
}

@media screen and (max-width: 700px) {
    .text-wrapper {
        width: 90%;
        margin: 5% 2% 5% 7%;
    }

    .images {
        display: none;
    }

    .btn-wrapper {
        justify-content: center;
    }

    .about-title,
    .question-title {
        font-family: Oleo Script Swash Caps;
        font-size: 300%;
        margin: 0% 0% 5% 0%;
        text-align: center;
    }

    .about-description {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin-bottom: 15%;
    }

    .question-description {
        text-align: center;
        margin: 0vh 15vw 2vh 15vw;
    }
}
</style>