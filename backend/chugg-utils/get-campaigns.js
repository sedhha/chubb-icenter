import fetch from "node-fetch";
import { chuggVariables } from ".";
import { tempCache } from "../cache/Cache";

const dependentMap = {
    'Basic': '1',
    'Standard': '2',
    'Ultimate': '3'
};

export const getCampaignsFromFilters = async ({
    type,
    insurancePackage,
    minAmount,
    maxAmount
}) => {
    const resultFromCache = tempCache.getFromCache({
        type,
        insurancePackage,
        minAmount,
        maxAmount
    });
    if (resultFromCache) {
        return resultFromCache;
    }
    const summaryPromise = getSummary({ type });
    const offersPromise = getOffers({ type });
    const disclosurePromise = getDisclosures({ type });
    const [summaryResult, offersResult, disclosureResult] = await Promise.all([
        summaryPromise,
        offersPromise,
        disclosurePromise
    ]).then(data => data);
    const cards = [];
    const insurancePackageFilters = insurancePackage.split(",");
    const offersMap = {};
    const coverageDetailsMap = {};
    const benefitsMap = {};

    offersResult.forEach(entity => {
        const { offer_pricing } = entity;
        offer_pricing.forEach(element => {
            offersMap[element.offer.name] = JSON.parse(JSON.stringify(element));
        });
    })


    offersResult.forEach(entity => {
        const { coverage_details } = entity;
        coverage_details?.forEach(element => {
            coverageDetailsMap[element.coverage_id] = JSON.parse(JSON.stringify(element));
        });
    })

    offersResult.forEach(entity => {
        const benefits = entity?.benefits?.data?.benefits ?? [];
        benefits.forEach(element => {
            benefitsMap[`${element.offer_id}__${element.coverage_id ?? ''}`] = JSON.parse(JSON.stringify(element));
        });
    })



    summaryResult.offers.forEach(element => {
        if (insurancePackageFilters.includes(element.name)
            && offersMap[element.name]?.cost?.total >= Math.floor(minAmount)
            && offersMap[element.name]?.cost?.total <= Math.ceil(maxAmount)
        ) {
            const coverageDetails = offersMap[element.name].coverage_pricing.map(element => coverageDetailsMap[element.coverage.coverage_id] ?? ({}))
            const benefitsDetails = offersMap[element.name].coverage_pricing.map(item => {
                const key = `${dependentMap[element.name]}__${item.coverage.coverage_id ?? ''}`
                const altKey = `${dependentMap[element.name]}__`
                return benefitsMap[key] ?? benefitsMap[altKey]
            })
            cards.push({
                insuranceName: summaryResult.name,
                insuranceType: element.name,
                coverage_amounts: JSON.parse(JSON.stringify(element.coverages)),

                frequency: offersMap[element.name].offer.payment_frequency,
                discount: offersMap[element.name].offer.discount,
                for_type: offersMap[element.name].offer.for_type,
                premiumAmount: offersMap[element.name].cost.premium,
                premiumTax: offersMap[element.name].cost.tax,
                premiumTotal: offersMap[element.name].cost.total,
                coverage_pricing: JSON.parse(JSON.stringify(offersMap[element.name].coverage_pricing)),
                coverage_details: coverageDetails,
                benefits: benefitsDetails
            });
        }
    });
    tempCache.addToCache({
        result: { cards, disclosureResult }, type,
        insurancePackage,
        minAmount,
        maxAmount
    });
    return { cards, disclosureResult };

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

export const getDisclosures = async ({ type }) => {
    const cmp = `web-sg-${type}`
    const token = await chuggVariables.token
    return fetch(
        process.env.CHUGG_DISCLOSURES_ENDPOINT, {
        method: 'GET',
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