
import { deleteApiRequest, getApiRequest, postApiRequest } from '../api/request';


const getAllUserUrl = 'customers/allUser';
const loginUrl = 'pos/authentication/login';
const registerUrl = 'pos/authentication/register';
const logoutUrl = 'pos/authentication/logout';
const validateUrl = 'pos/authentication/validate';
const sendOtpUrl = 'pos/api/password/send-otp';
const verifyOtpUrl = 'pos/api/password/verify-otp';
const resetPasswordUrl = 'pos/api/password/reset';


export const getAllUser = ((data, params) => {
    return getApiRequest(getAllUserUrl, data, params)
}
);

export const validateSession = ((data, params) => {
    return getApiRequest(validateUrl, data, params)
});

export const getLogin = ((data, params) => {
    return postApiRequest(loginUrl, data, params)
});

export const logout = ((data, params) => {
    return deleteApiRequest(logoutUrl, data, params)
});


export const getSignUp = ((data, params) => {
    return postApiRequest(registerUrl, data, params)
});

export const sendOtp = ((data, params) => {
    return postApiRequest(sendOtpUrl, data, params)
});

export const verifyOtp = ((data, params) => {
    return postApiRequest(verifyOtpUrl, data, params)
});

export const resetPassword = ((data, params) => {
    return postApiRequest(resetPasswordUrl, data, params)
});