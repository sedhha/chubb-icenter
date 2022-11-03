// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getOffers, getSummary } from "../../backend/chugg-utils/get-campaigns"

export default async function handler(req, res) {
  const valuePromise = getSummary({ type: req.query.id ?? 'tra' })
  const offerPromise = getOffers({ type: req.query.id ?? 'tra' })
  const [val1, val2] = await Promise.all([
    valuePromise,
    offerPromise
  ]).then(data => data)
  res.status(200).json([val1, val2])
}

/*
[
  {
    "campaign_id": "web-sg-val",
    "name": "My Valuables Insurance",
    "offers": [
      {
        "offer_id": "1",
        "name": "Basic",
        "coverages": [
          {
            "coverage_id": "VAL001",
            "name": "Accidental Damage",
            "coverage_amounts": [
              {
                "amount": 10000,
                "insurance_type": "MI"
              }
            ],
            "core_coverage": true
          },
          {
            "coverage_id": "VAL002",
            "name": "Theft",
            "coverage_amounts": [
              {
                "amount": 10000,
                "insurance_type": "MI"
              }
            ],
            "core_coverage": true
          }
        ]
      },
      {
        "offer_id": "2",
        "name": "Standard",
        "coverages": [
          {
            "coverage_id": "VAL001",
            "name": "Accidental Damage",
            "coverage_amounts": [
              {
                "amount": 25000,
                "insurance_type": "MI"
              }
            ],
            "core_coverage": true
          },
          {
            "coverage_id": "VAL002",
            "name": "Theft",
            "coverage_amounts": [
              {
                "amount": 25000,
                "insurance_type": "MI"
              }
            ],
            "core_coverage": true
          }
        ]
      },
      {
        "offer_id": "3",
        "name": "Ultimate",
        "coverages": [
          {
            "coverage_id": "VAL001",
            "name": "Accidental Damage",
            "coverage_amounts": [
              {
                "amount": 50000,
                "insurance_type": "MI"
              }
            ],
            "core_coverage": true
          },
          {
            "coverage_id": "VAL002",
            "name": "Theft",
            "coverage_amounts": [
              {
                "amount": 50000,
                "insurance_type": "MI"
              }
            ],
            "core_coverage": true
          }
        ]
      }
    ]
  },
  [
    {
      "timestamp": "2022-10-01T12:34:56.789Z",
      "payment_frequency": 12,
      "offer_pricing": [
        {
          "offer": {
            "offer_id": "1",
            "name": "Basic",
            "payment_frequency": 12,
            "discount": 0,
            "for_type": "MainInsured"
          },
          "cost": {
            "premium": 15,
            "tax": 1.05,
            "total": 16.05,
            "currency": {
              "abbreviation": "SGD",
              "code": "SGD",
              "display": "symbol",
              "digitsInfo": "1.2-2"
            }
          },
          "coverage_pricing": [
            {
              "coverage": {
                "coverage_id": "VAL001",
                "level": "1",
                "name": "Accidental Damage",
                "amount": 10000,
                "core_coverage": true,
                "insured_type": {
                  "id": "1",
                  "name": "MainInsured"
                }
              },
              "cost": {
                "premium": 10,
                "tax": 0.7,
                "total": 10.7,
                "currency": {
                  "abbreviation": "SGD",
                  "code": "SGD",
                  "display": "symbol",
                  "digitsInfo": "1.2-2"
                }
              }
            },
            {
              "coverage": {
                "coverage_id": "VAL002",
                "level": "1",
                "name": "Theft",
                "amount": 10000,
                "core_coverage": true,
                "insured_type": {
                  "id": "1",
                  "name": "MainInsured"
                }
              },
              "cost": {
                "premium": 5,
                "tax": 0.35,
                "total": 5.35,
                "currency": {
                  "abbreviation": "SGD",
                  "code": "SGD",
                  "display": "symbol",
                  "digitsInfo": "1.2-2"
                }
              }
            }
          ],
          "aggregated_addon_coverage_pricing": []
        },
        {
          "offer": {
            "offer_id": "2",
            "name": "Standard",
            "payment_frequency": 12,
            "discount": 0,
            "for_type": "MainInsured"
          },
          "cost": {
            "premium": 30,
            "tax": 2.1,
            "total": 32.1,
            "currency": {
              "abbreviation": "SGD",
              "code": "SGD",
              "display": "symbol",
              "digitsInfo": "1.2-2"
            }
          },
          "coverage_pricing": [
            {
              "coverage": {
                "coverage_id": "VAL001",
                "level": "1",
                "name": "Accidental Damage",
                "amount": 25000,
                "core_coverage": true,
                "insured_type": {
                  "id": "1",
                  "name": "MainInsured"
                }
              },
              "cost": {
                "premium": 20,
                "tax": 1.4,
                "total": 21.4,
                "currency": {
                  "abbreviation": "SGD",
                  "code": "SGD",
                  "display": "symbol",
                  "digitsInfo": "1.2-2"
                }
              }
            },
            {
              "coverage": {
                "coverage_id": "VAL002",
                "level": "1",
                "name": "Theft",
                "amount": 25000,
                "core_coverage": true,
                "insured_type": {
                  "id": "1",
                  "name": "MainInsured"
                }
              },
              "cost": {
                "premium": 10,
                "tax": 0.7,
                "total": 10.7,
                "currency": {
                  "abbreviation": "SGD",
                  "code": "SGD",
                  "display": "symbol",
                  "digitsInfo": "1.2-2"
                }
              }
            }
          ],
          "aggregated_addon_coverage_pricing": []
        },
        {
          "offer": {
            "offer_id": "3",
            "name": "Ultimate",
            "payment_frequency": 12,
            "discount": 0,
            "for_type": "MainInsured"
          },
          "cost": {
            "premium": 45,
            "tax": 3.15,
            "total": 48.15,
            "currency": {
              "abbreviation": "SGD",
              "code": "SGD",
              "display": "symbol",
              "digitsInfo": "1.2-2"
            }
          },
          "coverage_pricing": [
            {
              "coverage": {
                "coverage_id": "VAL001",
                "level": "1",
                "name": "Accidental Damage",
                "amount": 50000,
                "core_coverage": true,
                "insured_type": {
                  "id": "1",
                  "name": "MainInsured"
                }
              },
              "cost": {
                "premium": 30,
                "tax": 2.1,
                "total": 32.1,
                "currency": {
                  "abbreviation": "SGD",
                  "code": "SGD",
                  "display": "symbol",
                  "digitsInfo": "1.2-2"
                }
              }
            },
            {
              "coverage": {
                "coverage_id": "VAL002",
                "level": "1",
                "name": "Theft",
                "amount": 50000,
                "core_coverage": true,
                "insured_type": {
                  "id": "1",
                  "name": "MainInsured"
                }
              },
              "cost": {
                "premium": 15,
                "tax": 1.05,
                "total": 16.05,
                "currency": {
                  "abbreviation": "SGD",
                  "code": "SGD",
                  "display": "symbol",
                  "digitsInfo": "1.2-2"
                }
              }
            }
          ],
          "aggregated_addon_coverage_pricing": []
        }
      ],
      "coverage_details": [
        {
          "coverage_id": "VAL001",
          "value": [
            {
              "name": "Accidental Damage",
              "type": "whats_included",
              "description": "Covers cost of repair or replacement of valuables for accidental damage"
            }
          ]
        },
        {
          "coverage_id": "VAL002",
          "value": [
            {
              "name": "Theft",
              "type": "whats_included",
              "description": "Covers the cost of replacement of valuables in the event of theft."
            }
          ]
        }
      ],
      "benefits": {
        "data": {
          "notes": [
            {
              "benefit_id": "valuables_limit",
              "title": null,
              "description": null,
              "value": [
                "Maximum value of any individual valuables does not exceed S$10,000"
              ]
            },
            {
              "benefit_id": "valuables_cover",
              "title": "Benefits",
              "description": null,
              "value": [
                "We will repair or replace your valuable(s) if damaged.",
                "We will replace your valuable(s) if stolen."
              ]
            },
            {
              "benefit_id": "valuables_claims",
              "title": "Maximum number of claims",
              "description": null,
              "value": [
                "Maximum of 2 claims per valuable",
                "Maximum of 1 theft claim per valuable"
              ]
            },
            {
              "benefit_id": "valuables_excess",
              "title": "Excess payable per claim",
              "description": null,
              "value": []
            }
          ],
          "benefits": [
            {
              "offer_id": "1",
              "id": "valuables_limit",
              "name": "Number of covered valuables",
              "description": "",
              "note": "",
              "amount": "1 valuable",
              "sub_benefits": []
            },
            {
              "offer_id": "2",
              "id": "valuables_limit",
              "name": "Number of covered valuables",
              "description": "",
              "note": "",
              "amount": "Up to 3 valuables",
              "sub_benefits": []
            },
            {
              "offer_id": "3",
              "id": "valuables_limit",
              "name": "Number of covered valuables",
              "description": "",
              "note": "",
              "amount": "Up to 5 valuables",
              "sub_benefits": []
            },
            {
              "offer_id": "1",
              "id": "valuables_cover",
              "name": "Maximum amount per valuable",
              "description": "",
              "note": "",
              "amount": "Up to S$10,000 per valuable",
              "sub_benefits": []
            },
            {
              "offer_id": "2",
              "id": "valuables_cover",
              "name": "Maximum amount per valuable",
              "description": "",
              "note": "",
              "amount": "Up to S$10,000 per valuable",
              "sub_benefits": []
            },
            {
              "offer_id": "3",
              "id": "valuables_cover",
              "name": "Maximum amount per valuable",
              "description": "",
              "note": "",
              "amount": "Up to S$10,000 per valuable",
              "sub_benefits": []
            },
            {
              "offer_id": "1",
              "id": "valuables_claims",
              "name": "Maximum number of claims per policy period",
              "description": "",
              "note": "",
              "amount": "Up to 2 claims in total",
              "sub_benefits": []
            },
            {
              "offer_id": "2",
              "id": "valuables_claims",
              "name": "Maximum number of claims per policy period",
              "description": "",
              "note": "",
              "amount": "Up to 5 claims in total",
              "sub_benefits": []
            },
            {
              "offer_id": "3",
              "id": "valuables_claims",
              "name": "Maximum number of claims per policy period",
              "description": "",
              "note": "",
              "amount": "Up to 10 claims in total",
              "sub_benefits": []
            },
            {
              "offer_id": "1",
              "id": "valuables_excess",
              "name": "Excess",
              "description": "",
              "note": "",
              "amount": "",
              "sub_benefits": [
                {
                  "id": "excess_1",
                  "name": "Excess for each accidental damage claim",
                  "amount": "S$1,000",
                  "description": ""
                },
                {
                  "id": "excess_2",
                  "name": "Excess for each theft claim",
                  "amount": "S$500",
                  "description": ""
                }
              ]
            },
            {
              "offer_id": "2",
              "id": "valuables_excess",
              "name": "Excess",
              "description": "",
              "note": "",
              "amount": "",
              "sub_benefits": [
                {
                  "id": "excess_1",
                  "name": "Excess for each accidental damage claim",
                  "amount": "S$1,000",
                  "description": ""
                },
                {
                  "id": "excess_2",
                  "name": "Excess for each theft claim",
                  "amount": "S$500",
                  "description": ""
                }
              ]
            },
            {
              "offer_id": "3",
              "id": "valuables_excess",
              "name": "Excess",
              "description": "",
              "note": "",
              "amount": "",
              "sub_benefits": [
                {
                  "id": "excess_1",
                  "name": "Excess for each accidental damage claim",
                  "amount": "S$1,000",
                  "description": ""
                },
                {
                  "id": "excess_2",
                  "name": "Excess for each theft claim",
                  "amount": "S$500",
                  "description": ""
                }
              ]
            }
          ]
        },
        "$ref": "https://ap.studio-uat.chubb.com/sapi/assets?file_name=valuables-benefits.json&country=sg&partner=partner-company&product=valuables&campaign=web-sg-val&locale=en-SG&accept=application/json&path=assets"
      }
    }
  ]
]
*/
