<template>
  <form v-if="!formIsSent">

    <label for="name">Namn: </label>
    <input
        id="name"
        placeholder="Ditt Namn"
        type="text"
        v-model="name"
    />

    <label for="message">Meddelande: </label>
    <textarea
        id="message"
        placeholder="Meddelande..."
        rows="10"
        cols="30"
        minlength="8"
        required
        v-model="message"
    ></textarea>

    <label for="tel">Tel. nr.: </label>
    <input id="tel" placeholder="Tel.nr." type="tel" v-model="tel" />

    <label for="email">Email: </label>
    <input id="email" required placeholder="Email" type="email" v-model="email" />



    <input type="button" value="Skicka" @click="sendForm">
  </form>
  <h2 v-else>Tack {{email}}! Vi har mottagit ditt meddelande.</h2>

  <p id="error" v-if="showError">EMAIL IS REQUIRED</p>
  <p id="invalidForm" v-if="!formIsValid">All fields are required!</p>
</template>

<script>
export default {
  name: "contactForm",
  data() {
    return {
      message: '',
      name: '',
      tel: '',
      email: '',
      formIsSent: false,
      showError: false
    }
  },
  methods: {
    sendForm() {
      if (this.email) {
        this.showError = false;
        this.formIsSent = true;
        this.$emit('formSent', {name: this.name, message: this.message, tel: this.tel, email: this.email})
      } else {
        this.showError = true;
      }

    }
  },
  computed: {
    formIsValid() {
      return this.message && this.name && this.tel && this.email
    }
  },
  watch: {
    message(newMessage) {
      // this is useful for showing "User is typing..." in a chat app
      console.log('User is typing message...')
    }
  },
  emits: ['formSent']
}
</script>

<style scoped>
form input, form textarea {
  display: block;
}
#error, #invalidForm {
  font-size: 2.5rem;
  color: red;
}
</style>