import fetch from "node-fetch"

export const getBearerToken = async () => fetch(process.env.CHUGG_AUTH_ENDPOINT, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'App_ID': process.env.CHUGG_APP_ID,
        'App_Key': process.env.CHUGG_APP_KEY,
        'Resource': process.env.CHUGG_RESOURCE,
        'apiVersion': process.env.CHUGG_API_VERSION
    }
}).then(res => res.json().then(data => data).catch(err => {
    console.log("Error while decoding res = ", err.message)
    return err.message
})).catch(error => {
    console.log("Error occured = ", error.message)
    return error.message
})