<template>
  <div class="container">
    <div class="my-5 d-flex justify-content-center align-items-center gap-4">
      <h1>Czequestria Auction Admin</h1>

      <router-link
        target="_blank"
        to="/presentation"
        id="startPresentation"
        class="btn btn-primary"
      >
        Start presentation
      </router-link>
    </div>

    <div id="message" class="my-5">
      <h4 class="text-center mb-3">Show custom message</h4>
      <div class="d-flex gap-4">
        <input
          type="text"
          class="form-control"
          v-model="appState.customMessage"
        />
        <button class="btn btn-outline-primary" @click="updateCustomMessage">
          Show
        </button>
        <button
          class="btn btn-outline-primary"
          @click="
            appState.customMessage = '';
            updateCustomMessage();
          "
        >
          Clear
        </button>
      </div>
    </div>

    <div id="current" class="my-5" v-if="currentItem">
      <h3>Current item:</h3>
      <div id="desc">
        {{ appState.items.findIndex((i) => i.id === currentItem?.id) + 1 }}:
        {{ currentItem.description }}
      </div>

      <div class="d-flex gap-2">
        <input v-model="currentBid" type="number" class="form-control" />
        <button class="btn btn-primary" @click="updateCurrentBid">
          Set current bid
        </button>
        <button class="btn btn-primary" @click="updateSold">Set sold</button>
      </div>
    </div>

    <div id="list my-5">
      <div class="text-center mb-3 d-flex justify-content-center gap-4">
        <h4>Auction items</h4>
        <router-link to="/add-item" class="btn btn-primary">Create</router-link>
        <button class="btn btn-outline-danger" @click="() => updateCurrentItem(null)">Clear current item</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="col">ID</th>
            <th class="col">Price</th>
            <th class="col">Donated by</th>
            <th class="col">Description</th>
            <td class="col">Sold</td>
            <th class="col d-flex justify-content-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in appState.items" :key="item.id">
            <td>{{ item.id + 1 }}</td>
            <td>{{ item.currentPrice }}</td>
            <td>{{ item.donatedBy }}</td>
            <td>
              <s v-if="item.sold">{{ item.description }}</s
              ><span v-else>{{ item.description }} </span>
            </td>
            <td>{{ item.sold }}</td>
            <td class="d-flex justify-content-end gap-2">
                <button
                :disabled="item.sold"
                class="btn btn-outline-success"
                @click="() => updateCurrentItem(item.id)"
              >
                Set current
              </button>
              <button
                :disabled="item.sold"
                class="btn btn-outline-danger"
                @click="() => deleteItem(item)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="total">
      Total:
      {{
        appState.items
          .filter(({ sold }) => sold)
          .reduce((partial, curr) => partial + curr.currentPrice, 0)
      }}
      CZK
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { appState } from "../store";
import { BiddingRepository } from "../api/BiddingRepository";
import { AuctionItem, ItemsRepository } from "../api/ItemsRepository";
import { DataRepository } from "../api/DataRepository";

export default defineComponent({
  setup() {
    const currentBid = ref(0);

    const currentItem = computed(() =>
      appState.currentItem
        ? appState.items.find((i) => i.id === appState.currentItem)
        : null
    );

    watch(currentItem, (item) => (currentBid.value = item?.currentPrice ?? 0));

    const updateCustomMessage = async () => {
      await DataRepository.setCustomMessage(appState.customMessage);
    };

    const updateCurrentItem = async (itemId: number | null) => {
      await BiddingRepository.setCurrentItem(itemId);
    };

    const deleteItem = async (item: AuctionItem) => {
      await ItemsRepository.deleteItem(item.id);
    };

    const updateCurrentBid = async () => {
      await ItemsRepository.updateItem(currentItem.value!.id, {
        currentPrice: currentBid.value,
      });
    };

    const updateSold = async () => {
      await BiddingRepository.setAsSold();
    };

    return {
      appState,
      currentItem,
      updateCustomMessage,
      updateCurrentItem,
      deleteItem,
      updateCurrentBid,
      updateSold,
      currentBid,
    };
  },
});
</script>
