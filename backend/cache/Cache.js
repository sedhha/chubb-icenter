class TempCache {
    constructor() {
        this.cache = {};
        this.purchases = [];
    }

    addToCache({ type,
        insurancePackage,
        minAmount,
        maxAmount, result }) {
        const iPs = insurancePackage.split(",").sort().join("-");
        const key = `${type}__${iPs}__${Math.floor(minAmount)}__${Math.floor(maxAmount)}`;
        this.cache[key] = JSON.parse(JSON.stringify(result));

        const timeoutMillis = (3 * 60 * 1000);
        setTimeout(() => delete (this.cache[key]), timeoutMillis);
    }
    getFromCache({ type,
        insurancePackage,
        minAmount,
        maxAmount }) {
        const iPs = insurancePackage.split(",").sort().join("-");
        const key = `${type}__${iPs}__${Math.floor(minAmount)}__${Math.floor(maxAmount)}`;
        if (this.cache[key]) console.log("Returning from Cache")
        else console.log("Returning Fresh data")
        return this.cache[key];
    }
    addPurchase({ name, email, geoData }) {
        this.purchases.push({ name, email, geoData, time: new Date().toISOString() });
    }
    getPurchases() {
        return this.purchases;
    }
    bulkAddPurchase(purchase) {
        this.purchases = JSON.parse(JSON.stringify(purchase))
    }
}
const tempCache = new TempCache()
export { tempCache }