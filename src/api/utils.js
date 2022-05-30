

export function sendGet(url, param, baseURL) {
    return fetch(`${baseURL}${url}${param ? `/${param}` : ''}`)
        .then(response => response.json())
        .catch(e => {
        });
}

export function update(type, url, param, payload, baseURL) {
    return fetch(`${baseURL}${url}${param ? `/${param}` : ''}`, {
        method: type,
        //mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            return Promise.resolve()
        }
    });
}

export function sendPost(url, param, payload, baseURL) {
    return update('POST', url, param, payload, baseURL);
}

export function sendPut(url, param, payload, baseURL) {
    return update('PUT', url, param, payload, baseURL);
}

export function sendDelete(url, param, payload, baseURL) {
    return update('DELETE', url, param, payload, baseURL);
}