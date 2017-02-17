const Vue = require('vue/dist/vue.common.js')
const Vuex = require('vuex')
const Router = require('vue-router')
const xhr = require('xhr')
const _ = require('lodash')

const routes = []
const stores = {}

Vue.use(Router)
Vue.use(Vuex)

init('home', ['/', '/home'], require('./views/home.vue'))

document.addEventListener('DOMContentLoaded', function () {
  const router = new Router({routes})
  const store = new Vuex.Store(stores)
  createVue({
    router,
    store
  }).$mount('#app')
})

// convenience function because "new" for side-effects is gross
function createVue (config) {
  return new Vue(config)
}

// function to init a module and have it's routes/stores/component added to the app
function init (namespace, paths, config) {
  const store = config.store
  const view = initView(namespace, config)
  initRoute(paths, view)
  if (store) initStore(namespace, store)
}

// initialize the route of a module
function initRoute (path, component) {
  if (Array.isArray(path)) return path.map(_.partial(initRoute, _, component))
  routes.push({path, component})
}

function initView (namespace, config) {
  config.data = function () {
    return {
      state: this.$store.state[namespace]
    }
  }
  return _.omit(config, ['store'])
}

// initialize the store of a module
function initStore (namespace, store) {
  if (!stores.modules) stores.modules = {}
  if (!stores.getters) stores.getters = {}
  stores.modules[namespace] = _.set(store, 'namespaced', true)
}

// wrap the xhr library used to hit the dev server when on local
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
