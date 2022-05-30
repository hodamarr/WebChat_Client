import { sendGet, sendPost, sendPut } from './utils';

export function getContacts(userName, baseURL) {
    return sendGet(`/api/${userName}/contacts/`, undefined, baseURL);
}

export function getContact(id, userName, baseURL) {
    return sendGet(`/api/${userName}/contacts/${id}`, undefined, baseURL);
}

export function postContact(userName, payload, baseURL) {
    return sendPost(`/api/${userName}/contacts/`, undefined, payload, baseURL);
}

export function putContact(id, userName, payload, baseURL) {
    return sendPut(`/api/${userName}/contacts/${id}`, undefined, payload, baseURL);
}

export function getMessages(id,userName, baseURL) {
    return sendGet(`/api/${userName}/contacts/${id}/messages/`,undefined ,baseURL);
}

export function sendMessage(id, userName, payload, baseURL) {
    return sendPost(`/api/${userName}/contacts/${id}/messages/`, undefined, payload ,baseURL);
 }

 export function TransferMessage(id, payload, baseURL) {
    return sendPost(`/api/transfer/`, undefined, payload, baseURL);
 }

 export function isLogin(id, baseURL){
     return sendPost(`/api/users/login/`, undefined, id, baseURL);
 }

 export function getUser(id, baseURL){
     return sendGet(`/api/users/${id}`, undefined, baseURL);
    }

export function postUser(payload, baseURL){
    sendPost(`/api/users/`, undefined, payload, baseURL);
}
export function postInvetation(payload, baseUrl){
    sendPost(`/api/invitations/`,undefined, payload, baseUrl)
}