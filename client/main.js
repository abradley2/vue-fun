const Vue = require('vue')
const Vuex = require('vuex')
const xhr = require('xhr')
const _ = require('lodash')

Vue.use(Vuex)

const routes = {}
const stores = {modules: {}}

init('home', ['/', require('./views/home.vue')])

document.addEventListener('DOMContentLoaded', function () {
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  new Vue({
    el: '#app',
    store: new Vuex.Store(stores),
    data: {
      currentRoute: window.location.pathname
    },
    computed: {
      ViewComponent: function () {
        return routes[this.currentRoute]
      }
    },
    render: function (h) {
      return h(this.ViewComponent)
    }
  })
})

function init (namespace, args) {
  const mod = args[args.length - 1]
  const view = _.omit(mod, 'store')
  const store = mod.store
  args.forEach(function (arg, idx) {
    if (idx !== args.length - 1) {
      routes[arg] = view
    }
  })
  store.namespaced = true
  stores.modules[namespace] = store
}

;['post', 'put', 'patch', 'head', 'del', 'get'].forEach(function (method) {
  xhr[method] = (function (send) {
    return function (config, cb) {
      if (
        process.env.NODE_ENV === 'development' &&
        config.url[0] === '/'
      ) {
        config.url = `http://localhost:3000${config.url}`
      }
      return send(config, cb)
    }
  })(xhr[method])
})
