// helper functions for accessing api

// post request
async function apiPost(path, bodyJson) {
    const response = await fetch('/api/' + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyJson)
    });	
    return response.json();
}

// await apiGet('users/' + loginUserId)
async function apiGetUser(id) {
    const response = await fetch('/api/users/' + id);
    return response.json();
}

export {
    apiPost,
    apiGetUser
}