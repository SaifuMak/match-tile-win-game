// 'use server';

import AXIOS_INSTANCE from "../../../lib/axios";


export const registerUser = async (userData) => {
    try {
        const response = await AXIOS_INSTANCE.post('/api/register/', userData); // Adjust endpoint as needed
        return { success: true, data: response.data };

    } catch (error) {
        console.error('Registration error:', error);

        return { success: false, error: error.response ? error.response.data.error : 'Network Error! please try again.' };
    }
}  
