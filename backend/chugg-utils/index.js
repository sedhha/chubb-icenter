import { getBearerToken } from "./auth"
const chuggVariables = {
    appID: process.env.CHUGG_APP_ID,
    appKey: process.env.CHUGG_APP_KEY,
    resource: process.env.CHUGG_RESOURCE,
    apiVersion: process.env.CHUGG_API_VERSION,
    bearerToken: undefined,
    expiresTime: -1,

    get token() {
        return new Promise(async (resolve) => {
            const currentTime = new Date().getTime();
            if ((currentTime + 30000) > this.expiresTime) {
                const newToken = await getBearerToken();
                if (newToken?.token_type !== 'Bearer')
                    return ''
                this.expiresTime = (+newToken.expires_on) * 1000
                this.bearerToken = newToken.access_token
            }
            console.log("Reaches here")
            resolve(this.bearerToken)
        })
    }
}

export { chuggVariables }