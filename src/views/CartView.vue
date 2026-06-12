<script setup>
    import CartSummary from '../components/CartSummary.vue'
    import CartItem from '../components/CartItem.vue'
    import { useCartStore } from '../stores/cartStore.js'

    const cartStore = useCartStore()
</script>

<template>
  <section class="container my-4 pt-4">
    <p class="text-info text-uppercase fw-semibold mb-2 small">Votre sélection</p>
    <h1 class="display-5 fw-bold mb-3 text-white">Panier</h1>
    <p class="lead text-white mb-0">
      Consultez les articles ajoutés et ajustez les quantités avant validation.
    </p>
  </section>

  <section class="container g-4">
    <RouterLink class="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold shadow-sm text-white mb-3"
      to="/products">Voir les produits</RouterLink>

    <div class="row d-flex justify-content-around">
      <div class="col-lg-8">
        <div class="glass-effect rounded-5 m-1 py-2">
          <div v-if="cartStore.items.length === 0"
            class="alert pt-4 text-white" role="alert">
            Votre panier est vide.
          </div>
          <CartItem
            v-for="item in cartStore.items"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>

      <div class="col-lg-4 text-white text-center">
        <div class="card glass-effect rounded-5 m-1 py-2">
          <CartSummary />
        </div>
      </div>
    </div>
  </section>
</template>