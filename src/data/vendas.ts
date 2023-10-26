import { faker } from "@faker-js/faker";

export interface Venda {
    date: Date
    product: string;
    clientName: string 
    clientEmail: string
    price: number;
    status: string;
    paymentMethod: string
  }
  
export function generateRandomVendas(): [number, Venda[]] {
    const vendas: Venda[] = [];
    
    // Generate a random number of Venda objects (between 1 and 10)
    const numberOfVendas = faker.datatype.number({min: 31000, max: 50000})
    
    const dayValue = 1 * 24 * 60 * 60 * 1000

    const fiveDaysAgo = new Date(new Date().getTime() - dayValue*15)
    let lastFakeDate = faker.date.recent()
    let valorLiquido = 0

    for (let i = 0; i < numberOfVendas; i++) {

      const status =  lastFakeDate > fiveDaysAgo ? faker.helpers.arrayElement(['Pago', 'Cancelado',  'Aguardando pagamento']) : faker.helpers.arrayElement(['Pago', 'Cancelado'])

      const randomDate = lastFakeDate;
      const randomProduct = faker.helpers.arrayElement(["Sócio Ganhando com Músicas", "Aplicativo Ganhando com Músicas", "Estratégia fortune Insta money"])
      const randomClientName = faker.name.fullName();
      const randomClientEmail = faker.internet.email(randomClientName);
      let randomPrice = 56.32
      if (randomProduct === "Sócio Ganhando com Músicas") {
        randomPrice = 23.74
      } else if (randomProduct === "Aplicativo Ganhando com Músicas") {
        randomPrice = 135.70
      } 

      const randomStatus = status;
      const randomPaymentMethod = faker.helpers.arrayElement(["Cartão de crédito", "Pix"])

      valorLiquido += randomPrice
      
      const venda: Venda = {
        date: randomDate,
        product: randomProduct,
        clientName: randomClientName,
        clientEmail: randomClientEmail,
        price: randomPrice,
        status: randomStatus,
        paymentMethod: randomPaymentMethod
      };
      
      vendas.push(venda);

      let num = faker.datatype.number({min: 1, max: 5})
      lastFakeDate = new Date(lastFakeDate.getTime() - dayValue*num);
    }
    
    return [valorLiquido, vendas];
  }