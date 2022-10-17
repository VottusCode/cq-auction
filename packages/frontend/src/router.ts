import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("./pages/index.vue"),
    },
    {
        path: "/presentation",
        component: () => import("./pages/presentation.vue"),
    },
    {
        path: "/add-item",
        component: () => import("./pages/add-item.vue")
    }
];

export const router = createRouter({
    routes,
    history: createWebHistory()
})