export default {
    requests(state) {
        // state | getters | rootState | rootGetters
        return state.requests;
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};