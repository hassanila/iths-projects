import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Contact from '../views/ContactView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:limit?',
            name: 'home',
            component: Home,
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
    ],
})

export default router
