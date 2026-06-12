import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  
  state: () => ({
    items: []
    // Quand on ajoutera un produit, il ressemblera à ça :
    // { id: 1, title: 'T-shirt', price: 20, image: '...', category: '...', quantity: 1 }
  }),

  getters: {
    totalItems: (state) => {
      let total = 0;
      for (let item of state.items) {
        total = total + item.quantity;
      }
      return total;
    },

    // Calcule le prix total à payer
    totalPrice: (state) => {
      let total = 0;
      for (let item of state.items) {
        total = total + (item.price * item.quantity);
      }
      return total;
    }
  },

  actions: {
    // Ordre : Ajouter un produit au panier
    addToCart(product) {
      // On cherche si le produit est déjà dans notre liste
      const existing = this.items.find(item => item.id === product.id)
      
      if (existing) {
        // S'il y est déjà, on fait juste +1 sur la quantité
        existing.quantity++
      } else {
        // S'il n'y est pas, on l'ajoute à la liste avec une quantité de 1
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },

    // Ordre : Faire +1 sur la quantité d'un produit
    increaseQuantity(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity++
      }
    },

    // Ordre : Faire -1 sur la quantité d'un produit
    decreaseQuantity(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity-- // Si on en a plus de 1, on enlève 1
        } else {
          this.removeFromCart(productId) // Si on tombe à 0, on supprime carrément l'article
        }
      }
    },

    // Ordre : Vider tout le panier
    clearCart() {
      this.items = [] // On remet la liste à zéro
    }
  }
})