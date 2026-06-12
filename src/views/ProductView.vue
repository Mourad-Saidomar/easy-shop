<script setup>
    import { ref, onMounted } from 'vue';
    import { Produit } from '../assets/js/productList.js';
    import { ProduitCategory } from '../assets/js/productCategories.js';
    import ProductCard from '../components/ProductCard.vue';
    import SkeletonCard from '../components/SkeletonCard.vue';

    const products = ref([]);
    const categories = ref([]);
    const selectedCategoryUrl = ref('');
    const showDropdown = ref(false);
    const isLoading = ref(true)


    const loadProducts = async (url = '') => {
        selectedCategoryUrl.value = url;
        const fetchUrl = url || 'https://dummyjson.com/products';
        
        try {
            const res = await fetch(fetchUrl);
            const data = await res.json();
            products.value = data.products.map(product => new Produit(
                product.id,
                product.title,
                product.description,
                product.category,
                product.price,
                product.thumbnail,
                product.rating,
                product.stock
            ));
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    };

    onMounted(async () => {
             
        await loadProducts();
        
        try {
          const resCategories = await fetch('https://dummyjson.com/products/categories');
          const dataCategories = await resCategories.json();
          // products.value = await res.json()
          categories.value = dataCategories.map(category => new ProduitCategory(
                category.slug,
                category.name,
                category.url
            ));
          } 

          catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
          } 
          
          finally {
            isLoading.value = false
          }
    });
    

</script>



<template>
  <section class="container my-4 pt-4">
    <p class="text-info text-uppercase fw-semibold mb-2 small ">Catalogue</p>
    <h1 class="display-5 fw-bold mb-3 text-white">Produits</h1>
    <p class="lead mb-0 text-white ">
      Parcourez les produits et ajoutez vos favoris au panier.
    </p>
  </section>
  <section>
    <div class="container mb-3">
      <div class="d-flex flex-wrap gap-2">         
        <div class="input-group mb-3 w-100">
          <input 
            type="text" 
            class="form-control rounded-pill px-4 py-2 bg-transparent text-white border-light" 
            placeholder="Rechercher un produit..." 
            @input="(e) => loadProducts(e.target.value ? `https://dummyjson.com/products/search?q=${e.target.value}` : '')"
          >
        </div>
        
        <button 
          @click="loadProducts('')"
          class="btn rounded-pill px-4 py-2 fw-semibold shadow-sm"
          :class="selectedCategoryUrl === '' ? 'btn-light text-dark' : 'btn-outline-light'"
        >
          Tous les produits
        </button>
        <button 
          v-for="category in categories.slice(0, 6)" 
          :key="category.slug" 
          @click="loadProducts(category.url)"
          class="btn rounded-pill px-4 py-2 fw-semibold shadow-sm"
          :class="selectedCategoryUrl === category.url ? 'btn-light text-dark' : 'btn-outline-light'"
        >
          {{ category.name }}
        </button>
        
        <div class="dropdown position-relative" v-if="categories.length > 4">
          <button 
            @click="showDropdown = !showDropdown"
            class="btn rounded-pill px-4 py-2 fw-semibold shadow-sm dropdown-toggle" 
            :class="categories.slice(8).some(c => c.url === selectedCategoryUrl) ? 'btn-light text-dark' : 'btn-outline-light'"
            type="button"
          >
            Plus de catégories
          </button>
          
          <ul 
            class="dropdown-menu dropdown-menu-dark shadow position-absolute mt-1" 
            :class="{ show: showDropdown }"
            style="z-index: 1050; max-height: 300px; overflow-y: auto;"
          >
            <li v-for="category in categories.slice(4)" :key="category.slug">
              <button 
                class="dropdown-item" 
                @click="loadProducts(category.url); showDropdown = false;"
                :class="{ active: selectedCategoryUrl === category.url }"
              >
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="container mb-5">
    <div class="row">
      <SkeletonCard v-if="isLoading" v-for="n in 4" :key="'sk-' + n" />
      
      <ProductCard
        v-else
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>


</template>
