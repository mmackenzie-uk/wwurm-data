import categories from "./categories.json" with {type: "json"};
import products from "./products.json" with {type: "json"};

import { openDb } from './db.js' 

async function setup() {
 
    const db = await openDb()
    // Define table schema

    await db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL
      );
  `);

   await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      smallImage VARCHAR(512),
      mediumImage VARCHAR(512),
      largeImage VARCHAR(512),
      slug VARCHAR(255),
      description VARCHAR(512),
      price INTEGER NOT NULL,
      availability INTEGER NOT NULL,
      categoryId  INTEGER,
      FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
       );
   `);

  const arrCat = [];

  categories.map(({name, slug}) => { 
    const pr = db.run(`INSERT INTO categories (name, slug) VALUES (?, ?)`, name, slug );
    arrCat.push(pr);
  })
  await Promise.all(arrCat);
  const prodArr = [];

  products.map(({ 
    name, 
    price, 
    description, 
    smallImage, 
    mediumImage, 
    largeImage, 
    availability, 
    slug, 
    category
  }) => {
    // For ease of entering data, catgeory is entered by slug. Convert slug to Id
    const catIndex = categories.findIndex(({ slug }) => (slug === category)) + 1;
    const pr = db.run(
      `INSERT INTO products ( name, 
                              smallImage,
                              mediumImage,
                              largeImage,
                              slug,
                              description,
                              availability,
                              price,
                              categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                                name, 
                                JSON.stringify(smallImage), 
                                JSON.stringify(mediumImage), 
                                JSON.stringify(largeImage), 
                                slug,
                                description,
                                availability, 
                                Number(price * 100), 
                                catIndex
    );
    prodArr.push(pr);
  })
  await Promise.all(prodArr);
  await db.close();
}  

setup()
  .catch(err => {
    console.error(err.message)
  })  
