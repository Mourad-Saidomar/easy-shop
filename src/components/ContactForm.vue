<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive({})
const submitted = ref(false)

function validateForm() {
  errors.name = form.name.trim().length >= 2 ? '' : 'Le nom doit contenir au moins 2 caracteres.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ''
    : 'Veuillez saisir un email valide.'
  errors.message =
    form.message.trim().length >= 15 ? '' : 'Le message doit contenir au moins 15 caracteres.'

  return !errors.name && !errors.email && !errors.message
}

function submitForm() {
  submitted.value = false

  if (!validateForm()) {
    return
  }

  form.name = ''
  form.email = ''
  form.message = ''
  submitted.value = true
}
</script>

<template>
  <form class="card border-0 shadow-sm bg-body-secondary" novalidate @submit.prevent="submitForm">
    <div class="card-body d-grid gap-3">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="contact-name" class="form-label fw-semibold">Nom</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
            placeholder="Votre nom"
            @blur="validateForm"
          />
          <div v-if="errors.name" class="invalid-feedback d-block">
            {{ errors.name }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="contact-email" class="form-label fw-semibold">Email</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            placeholder="vous@email.com"
            @blur="validateForm"
          />
          <div v-if="errors.email" class="invalid-feedback d-block">
            {{ errors.email }}
          </div>
        </div>
      </div>

      <div>
        <label for="contact-message" class="form-label fw-semibold">Message</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="7"
          class="form-control"
          :class="{ 'is-invalid': errors.message }"
          placeholder="Expliquez votre demande"
          @blur="validateForm"
        ></textarea>
        <div v-if="errors.message" class="invalid-feedback d-block">
          {{ errors.message }}
        </div>
      </div>

      <button class="btn btn-primary align-self-start rounded-5" type="submit">Envoyer le message</button>
      <div v-if="submitted" class="alert alert-success mb-0" role="alert">
        Votre message a bien été préparé.
      </div>
    </div>
  </form>
</template>
