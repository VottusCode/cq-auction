<template>
    <div class="container mt-4">
        <h1>Czequestria Auction Admin</h1>

        <div class="my-4">
            <router-link target="_blank" to="/presentation" id="startPresentation" class="btn btn-success">
                Start presentation
            </router-link>
        </div>

        <div id="gotoItem" class="my-4">
            <h3>Show auction item:</h3>
            <div class="d-flex gap-4">
                <select class="form-select" @input="(e) => updateCurrentItem(e?.target?.value ?? null)">
                    <option :value="null">--</option>
                    <option v-for="item in appState.items" :key="item.id" :value="item.id">
                        {{ item.id + 1 }}. {{ item.description }}
                    </option>
                </select>
            </div>
        </div>

        <div id="message" class="my-4">
            <h3>Show custom message:</h3>
            <div class="d-flex gap-4">
                <input type="text" class="form-control" v-model="appState.customMessage" />
                <button class="btn btn-outline-primary" @click="updateCustomMessage">Show</button>
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

        <div id="current" class="my-4" v-if="currentItem">
            <h3>Current item:</h3>
            <div id="desc">
                {{ appState.items.findIndex((i) => i.id === currentItem?.id) + 1 }}: {{ currentItem.description }}
            </div>

            <div class="d-flex gap-2">
                <input v-model="currentBid" type="number" class="form-control" />
                <button class="btn btn-primary" @click="updateCurrentBid">Set current bid</button>
                <button class="btn btn-primary" @click="updateSold">Set sold</button>
            </div>
        </div>

        <div id="list">
            <div class="d-flex gap-2 mb-6">
                <h3>List of all items:</h3>

                <router-link to="/add-item" class="btn btn-primary">Create</router-link>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Price</th>
                        <th>Donated by</th>
                        <th>Description</th>
                        <td>Sold</td>
                        <th>Actions</th>
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
                        <td>
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
            {{ appState.items.filter(({ sold }) => sold).reduce((partial, curr) => partial + curr.currentPrice, 0) }}
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
            appState.currentItem ? appState.items.find((i) => i.id === appState.currentItem) : null
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
            await ItemsRepository.updateItem(currentItem.value!.id, { currentPrice: currentBid.value });
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
