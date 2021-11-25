export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoaches(state, payload) {
        console.log(state.coaches);
        state.coaches = payload;
    },
    updateCoach(state, payload) {

        console.log('state :', state.coaches);
        console.log('payload :', payload);
        // const tempCoach = state.categories.map((item) => item.id === ind ? data : item)

        // return{
        //     ...state,
        //     coaches:
        // }
    },
    deletedCoach(state, payload) {
        console.log('state :', state.coaches);
        console.log('payload :', payload);
        const tempCoach = state.coaches.filter(coach => coach.id != payload);
        console.log(tempCoach);
        return {
            ...state,
            coaches: tempCoach
        }
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
}