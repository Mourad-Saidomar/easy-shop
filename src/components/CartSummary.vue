<script setup>
  import { useCartStore } from '../stores/cartStore.js'
  const cartStore = useCartStore()
</script>

<template>
  <aside class="border-0 shadow-sm text-white">
    <div class="card-body d-grid gap-3">
      <h2 class="h4 fw-bold mb-0">Résumé</h2>
      <div class="d-flex justify-content-between">
        <span class="text-white">Articles</span>
        <strong>{{ cartStore.totalItems }}</strong>
      </div>
      <div class="d-flex justify-content-between">
        <span>Livraison</span>
        <strong>Offerte</strong>
      </div>
      <div class="d-flex justify-content-between border-top border-secondary-subtle pt-3">
        <span class="fw-semibold">Total</span>
        <strong class="fs-5">{{ cartStore.totalPrice.toFixed(2) }} EUR</strong>
      </div>
      <button class="btn btn-primary rounded-5">Commander</button>
      <button class="btn btn-outline-light rounded-5" type="button"
        @click="cartStore.clearCart()">
        Vider le panier
      </button>
    </div>
  </aside>
</template>