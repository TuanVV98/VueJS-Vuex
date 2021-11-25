import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
// import data from '../../../dummy-data/coaches-data.js';
export default {
  namespaced: true,
  state: {
    lastFetch: null,
    coaches: []
  },
  mutations,
  actions,
  getters,
};
