import fetch from "node-fetch";
import { chuggVariables } from ".";

export const getCampaignsFromFilters = async ({
    type,
    insurancePackage,
    minAmount,
    maxAmount
}) => {
    const summaryPromise = getSummary({ type });
    const offersPromise = getOffers({ type });
    const [summaryResult, offersResult] = await Promise.all([
        summaryPromise,
        offersPromise
    ]).then(data => data);

    const { offers, name } = offersResult;
    const filteredOffers = offers?.reduce((acc, curr) => {
        if (curr?.name === insurancePackage.label)
            acc[curr.name] = curr;
        return acc;
    }, {}) ?? {};
    const { payment_frequency, offer_pricing } = summaryResult;

    const filteredSummaries = offer_pricing?.reduce((acc, curr) => {
        if (
            curr?.offer?.name === insurancePackage.label
            &&
            curr?.cost?.total >= minAmount
            &&
            curr?.cost?.total <= maxAmount
        )
            acc[curr.offer.name] = curr;
        return curr;
    }, {}) ?? {};

    const mergedResults = [];

    Object.keys(filteredSummaries).forEach(key => {
        const summary = filteredSummaries[key];
        if (filteredOffers[key]) {
            const result = {
                insuranceName: summary.name,
                insuranceType: insurancePackage.label,
                coverageAmount: 0
            };

        }
    });





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