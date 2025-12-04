

import AXIOS_INSTANCE from "../../../lib/axios";

export const getParticipants = async (page = 1, query = "") => {
    try {
        const response = await AXIOS_INSTANCE.get(`/api/participants/?page=${page}&query=${query}`);  // Adjust endpoint as needed
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Participants fetching error:', error);
        return { success: false, error: error.response ? error.response.data.error : 'Network Error! please try again.' };
    }
}

export const getWinners = async (page = 1, query = "") => {
    try {
        const response = await AXIOS_INSTANCE.get(`/api/winners/?page=${page}&query=${query}`);  // Adjust endpoint as needed
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Winners fetching error:', error);
        return { success: false, error: error.response ? error.response.data.error : 'Network Error! please try again.' };
    }
}