import { query } from "@/lib/db";

export default async function handler(req, res) {
  const queryParams = req.query;
  const { id } = queryParams;
  if (req.method === "GET") {
    const products = await query({
      query:
        "SELECT * FROM `products` WHERE `ID` LIKE ? OR `NAME` LIKE ? OR `BRAND` LIKE ?",
      values: [`%${id}%`, `%${id}%`, `%${id}%`],
    });
    // console.log(products);
    res.status(200).json({ products: products });
  }
}
