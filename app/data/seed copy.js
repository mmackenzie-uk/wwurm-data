
import { openDb } from './db.js' 

async function setup() {
 
    const db = await openDb()
    // Define table schema
   await db.exec(`
       CREATE TABLE IF NOT EXISTS products (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name VARCHAR(255) NOT NULL
       );
   `);

   await db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL
        );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS productsCategory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoryId  INTEGER,
      productId INTEGER,
      FOREIGN KEY (categoryId) REFERENCES categories(categoryId),
      FOREIGN KEY (productId) REFERENCES products(productId)
      );
  `);


  await db.run( 'INSERT INTO products (name) VALUES (?)', 'one');
  await db.run( 'INSERT INTO products (name) VALUES (?)', 'two');
  await db.run( 'INSERT INTO products (name) VALUES (?)', 'three');


  const res1 = await db.run('INSERT INTO categories (name) VALUES (?)', 'necklace');
  const res2 = await db.run('INSERT INTO categories (name) VALUES (?)', 'bracelets');
 const res3 =  await db.run('INSERT INTO categories (name) VALUES (?)', 'rings');

 console.log("res ", res1)
 console.log("res ", res2)
 console.log("res ", res3)


  await db.run('INSERT INTO productsCategory (productId, categoryId) VALUES (?, ?)', 1,1);
  await db.run('INSERT INTO productsCategory (productId, categoryId) VALUES (?, ?)', 1,2);
  await db.run('INSERT INTO productsCategory (productId, categoryId) VALUES (?, ?)', 2,3);
  await db.run('INSERT INTO productsCategory (productId, categoryId) VALUES (?, ?)', 3,1);
   
  await db.close();
   
}

setup()
  .catch(err => {
    console.error(err.message)
  })  