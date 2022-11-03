// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { chuggVariables } from "../../backend/chugg-utils"
export default async function handler(req, res) {
  const value = await chuggVariables.token
  console.log("Value = ", value)
  res.status(200).json({ name: 'John Doe' })
}
