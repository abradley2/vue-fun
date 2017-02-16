<style>
  .red {
    color: #f00;
  }
</style>

<template>
  <div>
    <h1 class='red'>{{state.message}}</h1>
    <input type='text' v-on:input='editMessage' />
  </div>
</template>

<script>
exports.store = {
  state: {
    message: 'Hello World'
  },
  mutations: {
    setMessage: function (state, msg) {
      state.message = msg
    }
  }
}

exports.methods = {
  editMessage: function (e) {
    this.$store.commit('home/setMessage', e.target.value)
  }
}
</script>
