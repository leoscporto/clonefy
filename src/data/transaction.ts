import { faker } from '@faker-js/faker';
import { getStartOfDay, isSameDay } from '@utils/dateProcessing';

const products = [1, 2, 3, 4, 5];

export interface Transaction {
    product_id: number;
    card_approval: boolean;
    refund: boolean;
    chargeback: boolean;
    one_click: boolean;
    boleto_conversion: boolean;
    generated_slip: boolean;
    transaction_date: Date;
  }
  
export function generateTransaction(product_id: number, start: Date, end: Date | null): Transaction {

  let endDay = end ?? start
  let startDay = start

  if (isSameDay(startDay,endDay)) {
    endDay = new Date()
    startDay = getStartOfDay(start)
  }

  let boleto_conversion = false 
  let chargeback = false 
  let refund = false

  let odds = faker.datatype.number({min: 0, max: 100})

  if (odds > 85 ) {
    refund = true
  } else if (odds > 90) {
    chargeback = true 
  } else if (odds > 95) {
    boleto_conversion = true
  }

  const transaction: Transaction = {
    product_id: product_id,
    card_approval: faker.datatype.boolean(),
    refund: refund,
    chargeback: chargeback,
    one_click: faker.datatype.boolean(),
    boleto_conversion: boleto_conversion,
    generated_slip: faker.datatype.boolean(),
    transaction_date: faker.date.between(startDay,endDay),
  };
  return transaction;
}

export function generateTransactions(product: string, num_vendas: number, start: Date, end: Date | null) {
  let transactions = []

  for (let i = 0; i < num_vendas; i++) {
    transactions.push(generateTransaction(faker.datatype.number({min: 1, max:products.length}), start, end))
  }
  
  return transactions
}