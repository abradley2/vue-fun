const createRepository = require('json-git').default
const _ = require('lodash')

const repository = createRepository()

let initialCommit = true

const vueGit = function (store) {
  const prevState = _.cloneDeep(store.state)
  if (initialCommit) repository.commit('vue', 'initialState', prevState)
  initialCommit = false
  store.subscribe(function (mutation, state) {
    const newState = _.cloneDeep(state)
    repository.commit(
      'vue',
      mutation.type,
      newState
    )
  })
}

module.exports = vueGit
