<template>
    <div class="container mt-4">
        <router-link to="/" class="btn btn-gray btn-outline-primary mb-4">Jít zpět</router-link>
        <form @submit.prevent="createItem">
            <div class="form-group mb-2">
                <input type="number" class="form-control" placeholder="Initial price" v-model="form.initialPrice" />
            </div>

            <div class="form-group mb-2">
                <input type="text" class="form-control" placeholder="Donated by" v-model="form.donatedBy" />
            </div>

            <div class="form-group mb-2">
                <input type="text" class="form-control" placeholder="Description" v-model="form.description" />
            </div>

            <div class="form-group mb-2">
                <input type="text" class="form-control" placeholder="Image file name" v-model="form.image" />
            </div>

            <button type="submit" class="btn btn-primary">Vytvořit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { ItemsRepository } from "../api/ItemsRepository";

export default defineComponent({
    setup() {
        const form = reactive({
            initialPrice: 0,
            donatedBy: "",
            description: "",
            image: "placeholder.png",
        });

        const router = useRouter();

        const createItem = async () => {
            await ItemsRepository.createItem({
                donatedBy: form.donatedBy,
                description: form.description,
                currentPrice: form.initialPrice,
                image: form.image,
                sold: false,
            });

            router.push("/");
        };

        return {
            form,
            createItem,
        };
    },
});
</script>
