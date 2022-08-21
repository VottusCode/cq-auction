<template>
    <div class="presentation-container">
        <template v-if="currentItem">
            <img class="presentation-image" :src="`/img/${currentItem.image}`" />
            <div class="presentation-bid">Current bid: {{ currentItem.currentPrice }} CZK</div>
            <div class="presentation-donated">
                <p>{{ currentItem.id + 1 }}. {{ currentItem.description }}</p>
                <p>Donated by: {{ currentItem.donatedBy }}</p>
            </div>
        </template>

        <h2 class="custom-title" v-if="appState.customMessage.trim().length >= 1">{{ appState.customMessage }}</h2>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { appState } from "../store";

export default defineComponent({
    setup() {
        const currentItem = computed(() =>
            appState.currentItem ? appState.items.find((i) => i.id === appState.currentItem) : null
        );

        return {
            currentItem,
            appState,
        };
    },
});
</script>

<style scoped>
.presentation-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(90deg, rgba(246,189,117,1) 0%, rgba(100,90,235,1) 100%);
}

.presentation-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.presentation-bid {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.25);
    font-size: 2rem;
    border-bottom-left-radius: 10px;
    color: white;
}

.presentation-donated {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.5);
    font-size: 1.5rem;
    border-top-right-radius: 10px;
    color: white;
}

.custom-title {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 25%;
    font-size: 3rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 2rem;
    border-radius: 10px;
    color: white;
}
</style>
