import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    const balance = transactions.reduce((accumulator, currentValue) => {
      switch(currentValue.type){
        case "income":
          accumulator.income += Number(currentValue.value)
          break
        case "outcome":
          accumulator.outcome += Number(currentValue.value)
          break
        default:
          break
      }

      return accumulator
    }, {
      income: 0,
      outcome: 0
    })

    return {
      income: balance.income,
      outcome: balance.outcome,
      total: balance.income - balance.outcome
    }
  }
}

export default TransactionsRepository;
