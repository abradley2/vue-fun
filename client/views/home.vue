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
        <button v-on:click='removeTodo(todo.id)'>
          <i class='fa fa-2x fa-remove'></i>
        </button>
        <span>{{todo.title}}</span>
      </li>
    </ul>
    <button v-on:click='$store.dispatch("home/fetchMessage")'>Fetch Message</button>
    <h3>{{state.message}}</h3>
  </div>
</template>

<script>
const xhr = require('xhr')
var uid = 0

exports.store = {
  state: {
    filter: 'all',
    newTodo: 'New Todo',
    todos: [],
    message: ''
  },
  actions: {
    fetchMessage: function ({commit}) {
      xhr.get({
        url: '/message',
        json: true
      }, function (err, res) {
        if (!err) {
          commit('getMessage', res)
        }
      })
    } 
  },
  mutations: {
    getMessage: function (state, res) {
      state.message = res.body.message
    },
    editNewTodo: function(state, title) {
      state.newTodo = title
    },
    removeTodo: function (state, todoId) {
      state.todos = state.todos.filter(function (todo) {
        return todo.id !== todoId
      })
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
  },
  removeTodo: function (id) {
    this.$store.commit('home/removeTodo', id)
  }
}
</script>
