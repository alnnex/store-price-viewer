// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const products = await query({
      query: "SELECT * FROM `products` ORDER BY `name` ASC",
      values: [],
    });
    const totalProducts = await query({
      query: "SELECT COUNT(*) as count FROM Products",
      values: [],
    });
    // console.log(products);
    res.status(200).json({ products: products, totalProducts: totalProducts });
  }

  if (req.method === "POST") {
    const { base64, barcode, name, brand, price } = req.body;
    const products = await query({
      query:
        "INSERT INTO `products`(`barcode`, `name`, `brand`, `picture`, `qty`, `price`) VALUES (?,?,?,?,?,?) ",
      values: [barcode, name, brand, base64, 1, price],
    });
    res.status(200).json({
      products: res.status(200).json({ products: products }),
      message: "Successfully Added",
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const product = await query({
      query: "DELETE FROM `products` WHERE `ID`=?",
      values: [id],
    });
    res.status(200).json({
      products: res.status(200).json({ products: product }),
      message: "Successfully Deleted",
    });
  }

  if (req.method === "PUT") {
    const { base64, barcode, id, name, brand, price } = req.body;
    const products = await query({
      query:
        "UPDATE `products` SET `barcode`=?,`name`=?,`brand`=?,`picture`=?,`price`=? WHERE `ID`=?",
      values: [barcode, name, brand, base64, price, id],
    });
    res.status(200).json({
      products: res.status(200).json({ products: products }),
      message: "Successfully Added",
    });
  }
}
