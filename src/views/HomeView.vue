<script setup>
import AdvantageCard from '../components/AdvantageCard.vue'
import heroImage from '../assets/img/image.png'

const advantages = [
  {
    icon: '01',
    title: 'Selection claire',
    text: 'Des produits presentes avec les informations essentielles pour comparer rapidement.',
  },
  {
    icon: '02',
    title: 'Panier instantane',
    text: 'Ajoutez, ajustez ou retirez vos articles sans perdre votre progression.',
  },
  {
    icon: '03',
    title: 'Interface responsive',
    text: 'Une boutique agreable a utiliser sur ordinateur, tablette et mobile.',
  },
]
</script>

<template>
  <section class="container py-5">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <div class="d-grid gap-3">
          <p class="text-info text-uppercase fw-semibold mb-0 small text-md-center text-lg-start">Boutique en ligne</p>
          <h1 class="display-4 fw-bold text-white">Des produits utiles, une expérience simple.</h1>
          <p class="lead mb-0 text-white">
            ShopEasy centralise les essentiels du quotidien avec une navigation claire, des fiches
            produits lisibles et un panier fluide.
          </p>
          <div class="d-flex flex-wrap gap-2">
            <RouterLink class="btn btn-primary btn-lg" to="/products">Voir les produits</RouterLink>
            <RouterLink class="btn btn-outline-light btn-lg" to="/contact">Nous contacter</RouterLink>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-md-12 col-sm-12 d-md-none d-lg-block">
        <div class="position-relative rounded-3 overflow-hidden shadow-lg">
          <div class="">
            <img
              :src="heroImage"
              alt=""
              class="w-100 h-100 object-fit-cover"
            />
          </div>
          <div class="position-absolute top-0 end-0 m-3 rounded-3 glass-effect text-white bg-opacity-75 px-3 py-2 text-end">
            <div class="small">Livraison</div>
            <div class="fw-bold fs-4">48h</div>
          </div>
          <div class="position-absolute bottom-0 start-0 m-3 rounded-3 glass-effect text-white bg-opacity-75 px-3 py-2">
            <div class="small">Note clients</div>
            <div class="fw-bold fs-4">4.8/5</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="py-5">
      <div class="row align-items-end g-3 mb-4">
        <div class="col-lg-8">
          <p class="text-info text-uppercase fw-semibold mb-2 small">Pourquoi ShopEasy</p>
          <h2 class="fw-bold mb-0 text-white">Une boutique simple, rapide et lisible.</h2>
        </div>
      </div>
      <div class="row">
        <!-- une incrementation dans i pour la numerotation de icon -->
         
        <AdvantageCard
          v-for="(advantage, index) in advantages"
          :key="index"
          class="col-lg-4 col-md-6 col-sm-12"
          :title="advantage.title"
          :icon="advantage.icon"
          :text="advantage.text"
        />
        
          <AdvantageCard
          class="col-lg-4 col-md-6 col-sm-12"
          
          v-for="advantage in advantages "
          :key="advantage.title"
          :icon="advantage.icon"
          :text="advantage.text"
          />
      </div>
    </div>
  </section>
</template>
