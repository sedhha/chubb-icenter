// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDisclosures } from "../../backend/chugg-utils/get-campaigns"

export default async function handler(req, res) {
    const result = await getDisclosures({
        type: req.query.id,
    })
    res.status(200).json(result)
}
