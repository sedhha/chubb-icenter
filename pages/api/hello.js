// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCampaignsFromFilters } from "../../backend/chugg-utils/get-campaigns"

export default async function handler(req, res) {
  const result = await getCampaignsFromFilters({
    type: req.query.id,
    insurancePackage: req.query.insurancePackage,
    minAmount: req.query.minAmount ?? 0,
    maxAmount: req.query.maxAmount ?? 1000000
  })
  res.status(200).json(result)
}
