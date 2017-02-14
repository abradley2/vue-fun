const Vue = require('vue')
const xhr = require('xhr')

const home = require('./views/home.vue')

const routes = {
  '/': home
}

document.addEventListener('DOMContentLoaded', function () {
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  ;(new Vue({
    el: '#app',
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
  })())
})

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
