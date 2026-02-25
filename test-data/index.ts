import transfer from './Transfer_TestData.json';
import bill from './BillPayments_TestData.json';
import { TransferTestData, BillPaymentsTestData } from './types';

export const transferData = transfer as TransferTestData;
export const billPaymentsData = bill as BillPaymentsTestData;

export default { transferData, billPaymentsData };
