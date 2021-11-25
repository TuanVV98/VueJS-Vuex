import axios from "axios"

export default {
    async contactCoach(context, payload) {
        const newRequest = {
            email: payload.email,
            message: payload.message,
            coachId: payload.coachId
        }

        console.log(newRequest)
        const response = await axios.post("http://localhost:8080/api/requests", newRequest);
        const responseData = response.data;

        if (response.status != 201) {
            const error = new Error(responseData.message || 'Failed to send request!');
            throw error;
        }

        context.commit('addRequest', responseData);
    },

    async fetchRequests(context) {

        const response = await axios.get("http://localhost:8080/api/requests");

        const responseData = response.data.data;

        if (response.status != 200) {
            const error = new Error(responseData.message || 'Failed to send request!');
            throw error;
        }
        const requests = [];

        for (const key in responseData) {
            const request = {
                id: responseData[key].id,
                coachId: responseData[key].coachId,
                email: responseData[key].email,
                message: responseData[key].message
            };
            requests.push(request);
        }

        context.commit("setRequests", requests)
        // const response = await axios.get("");
        // const responseData = response.data;

    }
}