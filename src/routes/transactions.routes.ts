import { Router } from 'express';
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {

  const transactionsRepository = getCustomRepository(TransactionsRepository)

  const transactions = await transactionsRepository.find()
  const balance = await transactionsRepository.getBalance()

  return response.status(200).json({ transactions, balance })
 
});

transactionsRouter.post('/', async (request, response) => {
  const newTransaction = new CreateTransactionService()
  try{
    const myTransaction = await newTransaction.execute(request.body)
    return response.status(200).json(myTransaction)
  }catch(err){
    console.log(err)
    return response.status(err.statusCode).json({ message: err.message})
  }

});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
