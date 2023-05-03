import ResponseDto from "../Components/Dtos/ResponseDto";

export const getAllFlights = async (token) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const options = {
        method: "GET",
        mode: "cors",
        headers: headers
    };

    return fetch(`${process.env.REACT_APP_WEB_API}/flight/getAllFlights`, options)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.json().then((data) => {
                    console.log(data)
                    let response = new ResponseDto(null, res.status, null, data.flights, null);
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