<script setup>
import { reactive, ref, computed } from 'vue';
import { user as UserClass } from "../assets/js/users.js";

const user = reactive(new UserClass());

const touched = reactive({
    nom: false,
    email: false,
    message: false,
});

const submitted = ref(false);

const errors = computed(() => {
    return {
        name: touched.nom && user.nom.trim().length < 2 ? 'Le nom doit contenir au moins 2 caractères.' : '',
        email: touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) ? 'Veuillez saisir un email valide.' : '',
        message: touched.message && user.message.trim().length < 15 ? 'Le message doit contenir au moins 15 caractères.' : ''
    }
});

const isFormValid = computed(() => {
    return user.nom.trim().length >= 2 &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) &&
           user.message.trim().length >= 15;
});

function handleSubmit() {
    touched.nom = true;
    touched.email = true;
    touched.message = true;

    if (isFormValid.value) {
        submitted.value = true;
        // Optionally reset the form
        user.nom = '';
        user.email = '';
        user.message = '';
        touched.nom = false;
        touched.email = false;
        touched.message = false;
    } else {
        submitted.value = false;
    }
}
</script>

<template>
  <section class="container min-vh-100">
    <div class="row">
        <div class="col-lg-4 col-md-12 col-sm-12 my-4 pt-4">
            <p class="text-info text-uppercase fw-semibold mb-2 small ">Contact</p>
            <h1 class="display-5 fw-bold mb-3 text-white">Une question sur la boutique ?</h1>
            <p class="lead mb-0 text-white ">
            Envoyez un message via le formulaire.
            </p>
        </div>
        <div class="col-lg-8 col-md-12 col-sm-12 mt-5 pt-5 ">
            <form class="card border-0 shadow-sm rounded-5 p-3 glass-effect" @submit.prevent="handleSubmit" novalidate>
                <div class="card-body d-grid gap-3">
                    <div class="row g-3">
                        <div class="col-md-6">
                        <label for="contact-name" class="form-label fw-semibold text-white">Nom Prénom</label>
                        <input
                            id="contact-name"
                            v-model.trim="user.nom"
                            type="text"
                            class="form-control bg-transparent text-white border-light rounded-5 glass-effect"
                            :class="{ 'is-invalid': errors.name }"
                            placeholder="Votre nom"
                            @blur="touched.nom = true"
                        />
                        <div v-if="errors.name" class="invalid-feedback d-block">
                            {{ errors.name }}
                        </div>
                        </div>
        
                        <div class="col-md-6">
                        <label for="contact-email" class="form-label fw-semibold text-white">Email</label>
                        <input
                            id="contact-email"
                            v-model.trim="user.email"
                            type="email"
                            class="form-control bg-transparent text-white border-light rounded-5 glass-effect"
                            :class="{ 'is-invalid': errors.email }"
                            placeholder="vous@email.com"
                            @blur="touched.email = true"
                        />
                        <div v-if="errors.email" class="invalid-feedback d-block">
                            {{ errors.email }}
                        </div>
                        </div>
                    </div>
        
                    <div>
                        <label for="contact-message" class="form-label fw-semibold text-white">Message</label>
                        <textarea
                        id="contact-message"
                        v-model="user.message"
                        rows="7"
                        class="form-control bg-transparent text-white border-light pt-3 rounded-5 glass-effect"
                        :class="{ 'is-invalid': errors.message }"
                        placeholder="Expliquez votre demande"
                        @blur="touched.message = true"
                        ></textarea>
                        <div v-if="errors.message" class="invalid-feedback d-block">
                        {{ errors.message }}
                        </div>
                    </div>
        
                    <button class="btn btn-primary align-self-start rounded-5" type="submit">Envoyer le message</button>
                    <div v-if="submitted" class="alert alert-success mb-0 rounded-5" role="alert">
                        Votre message a bien été envoyé.
                    </div>
                </div>
            </form>
        </div>
    </div>
      
  </section>
</template>
