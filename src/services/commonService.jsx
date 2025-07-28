
import { getApiRequest } from '../api/request';


const getAllUserUrl = 'customers/allUser';


export const getAllUser = ((data, params) => {
    getApiRequest(getAllUserUrl, data, params)
}
);