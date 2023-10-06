import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "point_of_sales",
  });

  // query database

  try {
    const [results] = await connection.execute(query, values);
    connection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}
