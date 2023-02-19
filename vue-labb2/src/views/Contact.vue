<script setup>
import ContactForm from "../components/ContactForm.vue";
import EnteredFormData from "../components/EnteredFormData.vue";
</script>

<script>
export default {
  data() {
    return {
      formData: null
    }
  },
  methods: {
    saveFormData(data) {
      this.formData = data

    }
  },


}
</script>


<template>
  <main>
    <ContactForm @formSent="saveFormData"></ContactForm>
    <EnteredFormData :data="formData"/>
  </main>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
