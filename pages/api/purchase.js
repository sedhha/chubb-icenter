// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tempCache } from "../../backend/cache/Cache"

export default async function handler(req, res) {
    if (!req.query.view) {
        const { body } = req;
        tempCache.addPurchase({ ...body })
        return res.status(201).json({})
    }
    else {
        if (req.query.view !== process.env.SECRET_KEY)
            return res.status(401).json({})
        if (req.query.bulkAdd !== undefined) {
            tempCache.bulkAddPurchase(req.body);
            return res.status(201).json(tempCache.getPurchases())
        }
        return res.status(200).json(tempCache.getPurchases())
    }
}
