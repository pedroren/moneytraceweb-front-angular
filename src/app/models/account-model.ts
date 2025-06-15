//int Id, string Name, string Description, decimal Balance, AccountType Type, bool IsEnabled
export type AccountModel = {
  id: number;
  name: string;
  description: string;
  balance: number;
  type: AccountType;
  isEnabled: boolean;
};
export enum AccountType {
  Debit = 'Debit',
  Credit = 'Credit'
}
