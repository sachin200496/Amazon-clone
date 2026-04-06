import axios from '../../api/axios.js';

export const getUsers = async () => {
    try {
        const response = await axios.get('/auth/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};