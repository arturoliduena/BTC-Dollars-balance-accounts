import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService, Account, Statement } from './app.service';

@Controller('accounts')
export class AppController {
  constructor(private readonly appService: AppService) { }
  accounts: Account[][] = [];
  statements: { [id: string]: Statement[]; } = {};

  @Get(':page')
  getAccounts(@Param() params): Account[] {
    const { page } = params;
    if (page < 1) return [];

    let accounts = this.accounts[page];
    if (!accounts) {
      const newAccounts = this.appService.getAccounts(page, 10);
      this.accounts[page] = newAccounts;
      return newAccounts;
    };

    return accounts;
  };

  @Get('/statements/:accountId')
  getStatements(@Param() params): Statement[] {
    const { accountId } = params;
    if (accountId < 1) return [];

    let statements = this.statements[accountId];
    if (!statements) {
      const newStatements = this.appService.genarateStatements(10);
      this.statements[accountId] = newStatements;
      return newStatements;
    };
    return statements;
  };

  @Get('/detail/:accountId')
  getAccount(@Param() params, @Query() query): Account | null {
    const { accountId } = params;
    const { page } = query;
    return this.accounts[page] ? this.accounts[page].find(ac => ac.id == accountId) : null;
  };
  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  };
}
