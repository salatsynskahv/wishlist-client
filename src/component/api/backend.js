import axios from "axios";

axios.create({
    baseURL: process.env.REACT_APP_SERVER_HOST
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})