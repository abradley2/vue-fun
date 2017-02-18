const jiff = require('jiff')
const _ = require('lodash')

let patches = []
let currentPatch = -1

function diff (store) {
  _.assign(store.mutations, {
    _nextPatch: function (state) {
      if (currentPatch === patches.length - 1) return
      const nextState = state.patch(
        patches[currentPatch].next,
        state
      )
      currentPatch = currentPatch + 1
      _.assign(state, nextState)
    },
    _prevPatch: function (state) {
      if (currentPatch === 0) return
      const prevState = state.patch(
        patches[currentPatch].prev,
        state
      )
      currentPatch = currentPatch - 1
      _.assign(state, prevState)
    }
  })
  let prevState = _.cloneDeep(store.state)
  store.subscribe(function (mutation, state) {
    if (mutation.type === '_nextPatch' || mutation.type === '_prevPatch') return
    if (currentPatch >= patches.length) patches = patches.slice(0, currentPatch)
    let newState = _.cloneDeep(state)
    patches.push({
      next: jiff.diff(prevState, newState),
      prev: jiff.diff(newState, prevState)
    })
    prevState = newState
    console.log('patches,', patches)
  })
}

module.exports = diff
