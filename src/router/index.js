import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import ContactView from '../views/ContactView.vue'
import ProductsDetailView from '../views/ProductDetailView.vue'
import ProductsView from '../views/ProductView.vue'



const routes = [
    
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsView
    },
    {
        path: '/products/:id', // Route dynamique pour capturer l'ID du produit
        name: 'product-detail',
        component: ProductsDetailView
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactView
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router



