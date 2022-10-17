<template>
  <div class="presentation-container">
    <template v-if="currentItem">
      <img class="presentation-image" :src="`/img/${currentItem.image}`" />
      <div class="presentation-bid">
        Current bid: {{ currentItem.currentPrice }} CZK
      </div>
      <div class="presentation-donated">
        <p>{{ currentItem.id + 1 }}. {{ currentItem.description }}</p>
        <p>Donated by: {{ currentItem.donatedBy }}</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { appState } from "../store";
import Swal from "sweetalert2";

export default defineComponent({
  setup() {
    const currentItem = computed(() =>
      appState.currentItem
        ? appState.items.find((i) => i.id === appState.currentItem)
        : null
    );

    watch(
      () => appState.customMessage,
      (message) => {
        if (!message) return Swal.close();

        Swal.fire({
          titleText: message,
          showConfirmButton: false,
        });
      },
      { immediate: true }
    );

    watch(
      currentItem,
      (item, prev) => {
        if (!item && !!prev)
          return Swal.fire({
            titleText: `Sold for ${prev.currentPrice}`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
      },
      { immediate: true }
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
  background: linear-gradient(
    90deg,
    rgba(246, 189, 117, 1) 0%,
    rgba(100, 90, 235, 1) 100%
  );
}

.presentation-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.presentation-bid {
  position: absolute;
  top: 32px;
  right: 32px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.25);
  font-size: 1.75rem;
  border-radius: 32px;
  color: white;
}

.presentation-donated {
  position: absolute;
  bottom: 32px;
  left: 32px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  font-size: 1.5rem;
  border-radius: 32px;
  color: white;
}

.presentation-donated p {
  margin-bottom: 0 !important;
}
</style>
