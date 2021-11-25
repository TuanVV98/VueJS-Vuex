import axios from "axios";

export default {
    async registerCoach(context, data) {
        const coachData = {
            // id: 'c3',
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.hourlyRate,
            areas: data.areas,
            linkImage: data.linkImage
        }
        console.log('first : ' + data.first + " name :" + coachData.firstName + " areas : " + coachData.linkImage);

        const response = await axios.post("http://localhost:8080/api/coaches",
            coachData
        )

        const responseData = response.data.data;

        console.log(responseData);
        if (response.status != 201) {
            const error = new Error(responseData.message || 'Failed to feted!');
            throw error;
        }
        context.commit('registerCoach', responseData);
    },
    async loadCoaches(context,payload) {

        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const response = await axios.get("http://localhost:8080/api/coaches");

        const responseData = response.data.data;

        console.log(response);
        if (response.status != 200) {
            const error = new Error(responseData.message || 'Failed to feted!');
            throw error;
        }

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: responseData[key].id,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
                linkImage: responseData[key].linkImage,
            }

            coaches.push(coach);
        }

        // console.log(coaches.firstName);
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    },
    async updateCoach(context, data) {
        const coachData = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.hourlyRate,
            areas: data.areas,
            linkImage: data.linkImage
        }

        const response = await axios.put(`http://localhost:8080/api/coaches/${data.id}`,
            coachData
        );
        const responseData = response.data;

        console.log(responseData);
        if (response.status != 200) {
            const error = new Error(responseData.message || 'Failed to feted!');
            throw error;
        }
        context.commit('updateCoach', coachData)
    },
    async deletedCoach(context, data) {
        console.log("data", data);
        console.log("context");

        const response = await axios.delete(`http://localhost:8080/api/coaches/${data}`, data);

        const responseData = response.data;
        if (response.status != 200) {
            const error = new Error(responseData.message || 'Failed to feted!');
            throw error;
        }
        context.commit('deletedCoach', data)
        // const response = await axios.delete("")
    }
}