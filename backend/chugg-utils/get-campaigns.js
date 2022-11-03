import fetch from "node-fetch";
import { chuggVariables } from ".";

export const getCampaignsFromFilters = ({
    type,
    insurancePackage,
    minAmount,
    maxAmount
}) => {
    const summaryPromise = getSummary({ type });
}
export const getSummary = async ({ type }) => {
    const cmp = `web-sg-${type}`
    const token = await chuggVariables.token
    return fetch(process.env.CHUGG_CAMPAIGN_SUMMARY_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.CHUGG_OCP_APIM_SUBSCRIPTION_KEY,
            'apiVersion': '1',
            'country': 'sg',
            'partner': 'partner-company',
            'product': 'demo',
            'campaign': cmp,
            'campaign_id': cmp,
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json().then(data => data).catch(err => {
        console.log("Error Occured = ", err.message)
        return { error: err.message }
    })).catch(error => {
        console.log("Error Occured <> = ", { message: error.message })
        return { error: error.message }
    })
}

export const getOffers = async ({ type }) => {
    const cmp = `web-sg-${type}`
    const token = await chuggVariables.token
    return fetch(
        process.env.CHUGG_CAMPAIGN_OFFER_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.CHUGG_OCP_APIM_SUBSCRIPTION_KEY,
            'apiVersion': '1',
            'country': 'sg',
            'partner': 'partner-company',
            'product': 'demo',
            'campaign': cmp,
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json().then(data => data).catch(err => {
        console.log("Error Occured = ", err.message)
        return { error: err.message }
    })).catch(error => {
        console.log("Error Occured <> = ", { message: error.message })
        return { error: error.message }
    })
}