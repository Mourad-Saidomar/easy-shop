<script setup>
  import { useCartStore } from '../stores/cartStore.js'
  import { useRouter } from 'vue-router'
  
  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  });

  const cartStore = useCartStore()
  const router = useRouter()
</script>

  <template>
    <article class="col-md-6 col-lg-3 mb-4">
      <div class="bs-card card glass-effect shadow-sm rounded-4 p-3 h-100">
        <img :src="product.image" :alt="product.title" class="glass-effect rounded-4 object-fit-cover">
        <div class="card-body text-white px-0">
          <p class="text-center p-1 rounded-5 glass-effect small text-uppercase">{{ product.category }}</p>
          <h5 class="card-title fw-bold mb-3 text-truncate">{{ product.title }}</h5>
          <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="fw-bold fs-5">{{ product.price }} €</span>
              <span class="fw-bold rounded-3 px-2 py-1 glass-effect small"> {{ product.rating }} / 5</span>
            </div>
        </div>
        <div class="d-flex justify-content-between gap-2 mt-auto">
          <button class="btn glass-effect text-white rounded-5 flex-grow-1" 
            @click="router.push(`/products/${product.id}`)"
            >
              Détails
          </button>

          <button class="btn btn-outline-primary text-white rounded-5 flex-grow-1" 
            @click="cartStore.addToCart(product)"
            >
              Ajouter
          </button>
        </div>
      </div>
    </article>
</template>
