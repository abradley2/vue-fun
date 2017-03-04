const Vue = require('vue')
const Vuex = require('vuex')
const Router = require('vue-router')
const xhr = require('xhr')

const routes = []
const stores = {
  state: {
    app: 'StarterApp'
  }
}

Vue.use(Router)
Vue.use(Vuex)

init('home', ['/', '/home'], require('./views/home.vue'))

const router = new Router({routes})
const store = new Vuex.Store(stores)

new Vue({
  router,
  store
}).$mount('#app')

// function to init a module and have it's routes/stores/component added to the app
function init (namespace, paths, config) {
  const store = config.store
  const view = initView(namespace, config)
  initRoute(paths, view)
  if (store) initStore(namespace, store)
}

// initialize the route of a module
function initRoute (path, component) {
  if (Array.isArray(path)) {
    return path.map(function (p) {
      return initRoute(p, component)
    })
  }
  routes.push({path, component})
}

// for convenience, give every vue a computed that has access to it's store
function initView (namespace, config) {
  config.computed = Object.assign(config.computed || {}, {
    state: function () {
      return this.$store.state[namespace]
    }
  })
  return config
}

// for convenience, add the 'store' property of every vue as a module in the main store
function initStore (namespace, store) {
  if (!stores.modules) stores.modules = {}
  store.namespaced = true
  stores.modules[namespace] = store
}

if (process.env.NODE_ENV === 'development') {
  // wrap the xhr library used to hit the dev server when on local
  const methods = ['post', 'put', 'patch', 'head', 'del', 'get']

  methods.forEach(function (method) {
    xhr[method] = (function (func) {
      return function (config, cb) {
        if (config.url[0] === '/') {
          config.url = `http://localhost:3000${config.url}`
        }
        return func(config, cb)
      }
    }(xhr[method]))
  })
}
