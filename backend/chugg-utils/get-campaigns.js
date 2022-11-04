import fetch from "node-fetch";
import { chuggVariables } from ".";

export const getCampaignsFromFilters = async ({
    type,
    insurancePackage,
    minAmount,
    maxAmount
}) => {
    // TODO: Type is expected to be as string
    const summaryPromise = getSummary({ type });
    const offersPromise = getOffers({ type });
    const [summaryResult, offersResult] = await Promise.all([
        summaryPromise,
        offersPromise
    ]).then(data => data);
    const cards = [];
    const insurancePackageFilters = insurancePackage.split(",");
    const offersMap = {};
    offersResult.forEach(entity => {
        const { offer_pricing } = entity;
        offer_pricing.forEach(element => {
            offersMap[element.offer.name] = JSON.parse(JSON.stringify(element));
        });
    })

    summaryResult.offers.forEach(element => {
        if (insurancePackageFilters.includes(element.name)
            && offersMap[element.name].cost.total >= minAmount
            && offersMap[element.name].cost.total <= maxAmount
        ) {
            cards.push({
                name: summaryResult.name,
                type: element.name,
                coverage_amounts: JSON.parse(JSON.stringify(element.coverages)),

                frequency: offersMap[element.name].offer.payment_frequency,
                discount: offersMap[element.name].offer.discount,
                for_type: offersMap[element.name].offer.for_type,
                premiumAmount: offersMap[element.name].cost.premium,
                premiumTax: offersMap[element.name].cost.tax,
                premiumTotal: offersMap[element.name].cost.total,
                coverage_pricing: JSON.parse(JSON.stringify(offersMap[element.name].coverage_pricing))

            });
        }
    });
    return cards;

}
const getSummary = async ({ type }) => {
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

const getOffers = async ({ type }) => {
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