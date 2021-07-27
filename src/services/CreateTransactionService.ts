import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository'
import CategoriesRepository from '../repositories/CategoriesRepository'

interface newTransaction {
  title: string
  value: number
  type: 'income' | 'outcome'
  category: string
}

class CreateTransactionService {
  public async execute({ title , value, type, category }: newTransaction): Promise<any> {
    const transaction = getCustomRepository(TransactionsRepository)
    const categories = getCustomRepository(CategoriesRepository)

    const { total } = await transaction.getBalance()

    if(type === "outcome" && total < value){
      throw new AppError("Você não possui saldo suficiente")
    }

    let transactionCategory = await categories.findOne({
      where: { title: category }
    })

    if(!transactionCategory){
      console.log(transactionCategory)
      transactionCategory = categories.create({ title: category })

      await categories.save(transactionCategory)
    }

    const newTransaction = transaction.create({
      title,
      type,
      value,
      category: transactionCategory
    })

    await transaction.save(newTransaction) 

    return newTransaction
  }
}

export default CreateTransactionService;
