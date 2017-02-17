<style>
  .red {
    color: #f00;
  }
</style>

<template>
  <div class='center measure-wide'>
    <button v-on:click='addTodo'>Add Todo</button>
    <input type='text' v-on:input='editNewTodo' v-bind:value='state.newTodo'/>
    <ul v-for='todo in state.todos'>
      <li>
        <button><i class='fa fa-2x fa-remove'></i></button>
        <span>{{todo.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
let uid = 0

exports.store = {
  state: {
    filter: 'all',
    newTodo: 'New Todo',
    todos: []
  },
  mutations: {
    editNewTodo: function (state, title) {
      state.newTodo = title
    },
    addTodo: function (state, title) {
      state.newTodo = ''
      state.todos.push({
        id: uid++,
        title: title,
        completed: false
      })
    }
  }
}

exports.methods = {
  addTodo: function () {
    this.$store.commit('home/addTodo', this.state.newTodo)
  },
  editNewTodo: function (e) {
    this.$store.commit('home/editNewTodo', e.target.value)
  }
}
</script>
