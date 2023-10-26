import { faker } from "@faker-js/faker";

export interface Product {
    label: string;
    id: number;
    description: string;
    price: number
  }
  
function generateRandomProduct(): Product {
  const product: Product = {
    label: faker.commerce.productName(),
    id: faker.datatype.number(),
    description: faker.lorem.words(10),
    price: parseFloat(faker.commerce.price()),
  };

  return product;
}

export function generateFakeProducts() : Product[] {

  const products : Product[] = []

  const numProducts = faker.datatype.number({min: 5, max: 10})
  
  for (let i = 0; i < numProducts; i++) {
    products.push(generateRandomProduct())
  }

  return products
}


  export const mockProducts: Product[] = [
    {
      label: "Product A",
      id: 1,
      description: "This is product A",
      price: 13
      
    },
    {
      label: "Product B",
      id: 2,
      description: "This is product B",
      price: 15
    },
    {
      label: "Product C",
      id: 3,
      description: "This is product C",
      price: 17,
    },
    {
      label: "Product D",
      id: 4,
      description: "This is product C",
      price: 22,
    },
    {
      label: "Product E",
      id: 5,
      description: "This is product C",
      price: 22,
    },
  ];
  
