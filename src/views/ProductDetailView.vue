<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cartStore.js';
import { Produit } from '../assets/js/productList.js';

const route = useRoute();
const cartStore = useCartStore();

const product = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    // Récupérer l'ID depuis l'URL
    const productId = route.params.id;
    
    try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await res.json();
        
        // Formatter le produit pour correspondre à la classe existante
        product.value = new Produit(
            data.id,
            data.title,
            data.description,
            data.category,
            data.price,
            data.thumbnail,
            data.rating,
            data.stock
        );
    } catch (error) {
        console.error("Erreur de chargement du produit:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <section class="container mb-5">
        <div class="col-4 mt-4 pt-4">
            <p class="text-info text-uppercase fw-semibold mb-2 small ">Fiche produit</p>
            <h1 class="display-5 fw-bold text-white">Détails du produit</h1>
        </div>
        <RouterLink class="btn btn-outline-primary text-white rounded-5 my-3" to="/products">
            Retour aux produits
        </RouterLink>
        
        <div v-if="isLoading" class="text-white">
            Chargement...
        </div>

        <div v-else-if="product" class="row glass-effect p-3 rounded-5">
            <div class="col-5">
                <div class="card glass-effect rounded-5 shadow-sm">
                    <div class="ratio ratio-1x1">
                        <img :src="product.image" :alt="product.title" class="p-4 object-fit-contain" />
                    </div>
                </div>
            </div>

            <div class="col-7">
                <div class="d-flex flex-column justify-content-between text-white h-100">
                    <div class="d-grid gap-3">
                        <span class="badge p-3 rounded-5 glass-effect text-uppercase align-self-start">{{ product.category }}</span>
                        <h1 class="display-5 fw-bold mb-0">{{ product.title }}</h1>
                        <p class="lead">{{ product.description }}</p>
                    </div>
                    <div class="">
                        <div class="row mb-4">
                            <div class="col">
                                <div class="card glass-effect border-0 shadow-sm">
                                    <div class="card-body">
                                        <div class="text-white small">Prix</div>
                                        <div class="fw-bold text-white fs-5">{{ product.price }} €</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card glass-effect border-0 shadow-sm">
                                    <div class="card-body">
                                        <div class="text-white small">Évaluation</div>
                                        <div class="fw-bold text-white fs-5">{{ product.rating }} / 5</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card glass-effect border-0 shadow-sm">
                                    <div class="card-body">
                                        <div class="text-white small">En Stock</div>
                                        <div class="fw-bold text-white fs-5">{{ product.stock }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="col-12 btn btn-outline-primary text-white rounded-5 py-3 fw-bold shadow-sm" type="button" @click="cartStore.addToCart(product)">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else class="text-white mt-5">
            Produit introuvable.
        </div>
    </section>
</template>
