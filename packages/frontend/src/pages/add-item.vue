<template>
    <div class="container pt-4">
        <router-link to="/" class="btn btn-gray btn-outline-primary my-5">Jít zpět</router-link>

        <h3 class="mb-5">Add new item</h3>

        <form @submit.prevent="createItem">
            <div class="form-group mb-3">
                <label class="mb-2">Initial price</label>
                <input type="number" class="form-control" placeholder="Initial price" v-model="form.initialPrice" />
            </div>

            <div class="form-group mb-3">
                <label class="mb-2">Donator</label>
                <input type="text" class="form-control" placeholder="Donator" v-model="form.donatedBy" />
            </div>

            <div class="form-group mb-3">
                <label class="mb-2">Description</label>
                <input type="text" class="form-control" placeholder="Description" v-model="form.description" />
            </div>

            <div class="form-group mb-3">
                <label class="mb-2">Image file name (in public/img)</label>
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
