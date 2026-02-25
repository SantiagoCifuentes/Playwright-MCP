import base, { expect as baseExpect } from '@playwright/test';
import { transferData, billPaymentsData } from '../test-data';

type TestData = {
  transferData: typeof transferData;
  billPaymentsData: typeof billPaymentsData;
};

export const test = base.extend<{ testData: TestData }>({
  testData: async ({}, use) => {
    await use({ transferData, billPaymentsData });
  }
});

export const expect = baseExpect;

export default test;
