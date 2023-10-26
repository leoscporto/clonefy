import { faker } from "@faker-js/faker";

export interface Saque {
    date: Date;
    price: number;
    status: string;
  }
  
  export function generateRandomSaques(): [number, Saque[]] {
    const vendas: Saque[] = [];
    
    // Generate a random number of Venda objects (between 1 and 10)
    const numberOfVendas = faker.datatype.number({min: 15, max: 105})
    
    const dayValue = 1 * 24 * 60 * 60 * 1000

    const fiveDaysAgo = new Date(new Date().getTime() - dayValue*30)
    let lastFakeDate = faker.date.recent()
    let valorPendente = 0

    for (let i = 0; i < numberOfVendas; i++) {

      const status = faker.helpers.arrayElement(['Sucesso', 'Falhou'])

      const randomDate = lastFakeDate;
      const randomPrice = faker.datatype.number({min: 150, max: 1943, precision: 0.01})
      const randomStatus = status;
      
      const saque: Saque = {
        date: randomDate,
        price: randomPrice,
        status: randomStatus,
      };
      
      vendas.push(saque);

      let num = faker.datatype.number({min: 1, max: 5})
      lastFakeDate = new Date(lastFakeDate.getTime() - dayValue*num);
    }
    
    return [valorPendente, vendas];
  }