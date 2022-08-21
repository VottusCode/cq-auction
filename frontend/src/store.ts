import { reactive, ref } from "vue";
import { AuctionItem } from "./api/ItemsRepository";
import { CreateWebSocket } from "./api/ws";

export const appState = reactive({
    customMessage: "",
    currentItem: null as number|null,
    items: [] as AuctionItem[]
});

export const ws = ref<CreateWebSocket|null>(null);