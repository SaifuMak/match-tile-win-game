"use server"


import AXIOS_INSTANCE from "../../../lib/axios";

export const getParticipants = async () => {
    try {
        const response = await AXIOS_INSTANCE.get('/api/participants/');  // Adjust endpoint as needed
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Participants fetching error:', error);
        return { success: false, error: error.response ? error.response.data.error : 'Network Error! please try again.' };
    }
}