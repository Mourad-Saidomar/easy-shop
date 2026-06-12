<script setup>
  import { useCartStore } from '../stores/cartStore'

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })

  const cartStore = useCartStore()
</script>

<template>
  <article class="card glass-effect rounded-5 border-light shadow-sm m-3">
    <div class="card-body text-white">
      <div class="row g-3 d-flex justify-content-between align-items-center">

        <div class="col-6">
          <div class="row align-items-center">
            <div class="col-5">
              <div class="ratio ratio-1x1 glass-effect rounded-5">
                <img :src="item.image" class="border-light p-2" :alt="item.title">
              </div>
            </div>
            <div class="col-7">
              <span class="badge text-bg-secondary text-uppercase mb-2">{{ item.category }}</span>
              <h3 class="h5 fw-bold mb-2">{{ item.title }}</h3>
              <strong>{{ item.price }} EUR</strong>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="row align-items-center">
            <div class="col-12 mb-3">
              <div class="d-flex justify-content-end gap-5 mb-3">
                <strong class="d-flex align-items-center fs-5">
                  {{ (item.price * item.quantity).toFixed(2) }} EUR
                </strong>
                <div class="d-flex align-items-center gap-2">
                  <button class="btn btn-outline-light btn-sm" type="button"
                    @click="cartStore.decreaseQuantity(item.id)">
                    -
                  </button>
                  <span class="badge text-bg-dark px-3 py-2">{{ item.quantity }}</span>
                  <button class="btn btn-outline-light btn-sm" type="button"
                    @click="cartStore.increaseQuantity(item.id)">
                    +
                  </button>
                </div>
              </div>
              <div class="col-12 d-flex justify-content-end">
                <button class="btn btn-outline-danger rounded-5 btn-sm" type="button"
                  @click="cartStore.removeFromCart(item.id)">
                  Retirer
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </article>
</template>