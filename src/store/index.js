import Vue from 'vue'
import Vuex from 'vuex'
import illustrations from './modules/illustrations'

Vue.use(Vuex)

const state = {
  title: document.title,
  subTitle: null
}

const getters = {
  title: state => state.title,
  subTitle: state => state.subTitle
}

const actions = {}

const mutations = {
  SET_TITLE: (state, { title }) => {
    state.title = title
  },

  SET_SUB_TITLE: (state, { subTitle }) => {
    state.subTitle = subTitle
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: { illustrations }
})