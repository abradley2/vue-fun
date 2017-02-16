<style>
  .red {
    color: #f00;
  }
</style>

<template>
  <div>
    <h1 class="red">{{testComputed}}</h1>
    <button v-on:click="editMessage">Do Something</button>
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
  editMessage: function () {
    console.log(this.$store.state.home)
    this.$store.commit('home/setMessage', 'button clicked!')
  }
}
</script>
