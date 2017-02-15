<style>
  .red {
    color: #f00;
  }
</style>

<template>
  <div>
    <h1 class="red">{{msg}}</h1>
    <button>Do Something</button>
  </div>
</template>

<script>
exports.store = {
  state: {
    message: 'Hello World'
  }
}

exports.data = function () {
  return {
    msg: 'Hello World!'
  }
}
</script>
