import axios from './axiosInstances';

export const getApiRequest = (async (url, data, params) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            data: data || {},
            params: params || {},
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
});

// export const getApiRequest = async ({ method = 'get', url, data, params }) => {
//     try {
//         const response = await axios({
//             method,
//             url,
//             data,
//             params,
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || error;
//     }
// };