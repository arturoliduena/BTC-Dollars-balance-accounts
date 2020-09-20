import { Injectable } from '@nestjs/common';
import { firstName, lastName} from './data';

export type Account = {
  id: string,
  name: string,
  category: string,
  tags: string[],
  balance: number,
  availableBalance: number,
}

export type Statement = {
  confirmedDate: string,
  orderId: string,
  transactionType: string,
  debit: number | null,
  credit: number | null,
  balance: number,
};

type Transaction = {
  transactionType: string,
  debit: number | null,
  credit: number | null,
  balance: number,
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAccounts(page: number, quantity: number = 1): Account[] {
    const accounts = [];
    for (let index = (page * 10); index < ((page * 10) + quantity); index++) {
      accounts.push(this.createAccounts(index))
    }
    return accounts;
  }

  createAccounts(index: number): Account {
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: this.generateName(),
      category: `category${index}`,
      tags: [`tag${index}`, `tag2${index + 1}`],
      balance: Number((Math.random() * 10).toFixed(2)),
      availableBalance: Number((Math.random() * 10).toFixed(2)),
    }
  }

  capFirst(string: string): string {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateName(): string {
    return this.capFirst(firstName[this.getRandomInt(0, firstName.length + 1)]) + ' ' + this.capFirst(lastName[this.getRandomInt(0, lastName.length + 1)]);
  }
  
  randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  generateRandomDate = () => {
    let date = this.randomDate(new Date(2012, 0, 1), new Date());
    return String(date).split(' ').slice(0, 4).join(' ');
  }
  
  generateRandomTransaction = (): Transaction => {
    const random_boolean = Math.random() >= 0.5;
    return {
      transactionType: random_boolean ? 'Payment sent' : 'Payment received',
      debit: random_boolean ? Number((Math.random() * 10).toFixed(2)) : null,
      credit: random_boolean ? null : Number((Math.random() * 10).toFixed(2)),
      balance: Number((Math.random() * 10).toFixed(2)),
    }
  }
  
  genarateStatements = (quantity: number = 1): Statement[] => {
    const statements = [];
    for (let index = 0; index <= quantity; index++) {
      const { transactionType, debit, credit, balance } = this.generateRandomTransaction()
      statements.push(
        {
          confirmedDate: this.generateRandomDate(),
          orderId: Math.random().toString(36).substr(2, 9),
          transactionType,
          debit,
          credit,
          balance,
        }
      )
    }
    return statements;
  };

}
