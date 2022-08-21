<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { createWebSocket, UpdateData } from "../api/ws";
import { appState, ws } from "../store";

export default defineComponent({
    setup() {
        watch(
            ws,
            (s) => {
                if (s) {
                    const { socket, emitter } = s;

                    socket.addEventListener("open", () => {
                        socket.send("update");
                    });

                    emitter.on("update", (data: UpdateData) => {
                        appState.currentItem = data.currentItem;
                        appState.customMessage = data.customMessage;
                        appState.items = data.items;
                    })
                }
            },
            { immediate: true }
        );

        ws.value = createWebSocket();
    },
});
</script>
