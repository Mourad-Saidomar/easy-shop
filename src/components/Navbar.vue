<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cartStore.js';

const cartStore = useCartStore();

// On crée une variable pour savoir si le menu mobile est ouvert ou fermé
const isMenuOpen = ref(false);

// Fonction pour ouvrir/fermer le menu sur mobile
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// Fonction pour fermer le menu quand on clique sur un lien
function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <!-- sticky-top permet de garder la barre fixe au défilement -->
  <header class="sticky-top z-3 mt-3">
    <div class="container">
      <!-- navbar-dark pour avoir l'icône du menu burger en blanc -->
      <nav class="navbar navbar-expand-lg navbar-dark shadow glass-effect rounded-5 p-2 px-3">
        
        <!-- Logo -->
        <RouterLink class="navbar-brand d-flex align-items-center fw-bold gap-2 text-white" to="/" @click="closeMenu">
          <span class="badge rounded-circle text-bg-primary d-inline-flex align-items-center justify-content-center">
            S
          </span>
          <span>ShopEasy</span>
        </RouterLink>

        <!-- Groupe visible uniquement sur Mobile : Bouton Panier + Bouton Burger -->
        <div class="d-flex align-items-center gap-2 ms-auto d-lg-none">
          <RouterLink class="btn rounded-5 text-white fw-bold shadow-sm glass-effect px-3 d-flex align-items-center gap-2" to="/cart" aria-label="Voir le panier" @click="closeMenu">
            <span class="badge text-bg-light text-dark">{{ cartStore.totalItems }}</span>
          </RouterLink>

          <button 
            class="navbar-toggler border-0 shadow-none" 
            type="button" 
            @click="toggleMenu"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <!-- Liens du menu (qui se cachent sur mobile) -->
        <!-- La classe "show" est ajoutée dynamiquement si isMenuOpen est vrai -->
        <div class="collapse navbar-collapse" :class="{ 'show': isMenuOpen }">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center gap-3 mt-3 mt-lg-0 text-center">
            <li class="nav-item w-100">
              <RouterLink class="nav-link text-white px-3 rounded-4" active-class="glass-effect" exact-active-class="glass-effect" to="/" @click="closeMenu">
                Accueil
              </RouterLink>
            </li>
            <li class="nav-item w-100">
              <RouterLink class="nav-link text-white px-3 rounded-4" active-class="glass-effect" exact-active-class="glass-effect" to="/products" @click="closeMenu">
                Produits
              </RouterLink>
            </li>
            <li class="nav-item w-100">
              <RouterLink class="nav-link text-white px-3 rounded-4" active-class="glass-effect" exact-active-class="glass-effect" to="/contact" @click="closeMenu">
                Contact
              </RouterLink>
            </li>
          </ul>

          <!-- Bouton Panier visible uniquement sur Bureau (Desktop) -->
          <RouterLink class="btn rounded-5 text-white fw-bold shadow glass-effect d-none d-lg-flex align-items-center gap-2" to="/cart">
            Panier
            <span class="badge text-bg-light text-dark">{{ cartStore.totalItems }}</span>
          </RouterLink>
        </div>

      </nav>
    </div>
  </header>
</template>
