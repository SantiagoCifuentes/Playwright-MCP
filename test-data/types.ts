export interface TransferTestData {
  transactionType: string;
  toAccount: string;
  amount: string;
  description: string;
}

export interface BillPaymentEntry {
  billType: string;
  serviceProvider: string;
  accountReference: string;
  amount: string;
  paymentMethod: string;
}

export type BillPaymentsTestData = BillPaymentEntry[];
