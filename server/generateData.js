var faker = require('faker');

var database = { products: [] };

for (var i = 1; i <= 300; i++) {
    database.products.push({
        id: i,
        productName: faker.commerce.productName(),
        unitPrice: faker.commerce.price(),
        pkg: faker.random.word(),
        isDiscontinued: faker.random.boolean()
    });
}

console.log(JSON.stringify(database));
