import ResponseDto from "../Components/Dtos/ResponseDto";

export const login = async (User) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(User),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/login`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, data.token);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const forgotPassword = async (User) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(User),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/forgotPassword`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, data.token);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const resetPassword = async (User) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(User),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/resetPassword`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, data.token);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const getAllUsers = async (token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "GET",
        mode: "cors",
        headers: headers
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/getAllUsers`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, null, data.users, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};

export const addUser = async (user, token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(user),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/addUser`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
};

export const updateUser = async (user,token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(user),
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/user/updateUser`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null, null);
                    return response;
                });
            } else {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, data.message, null);
                    return response;
                });
            }
        })
        .catch((err) => console.log(err));
};
