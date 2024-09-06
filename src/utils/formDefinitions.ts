import { InputDefinitionProps, TableDefinitionProps } from '@/types';

export const tableDefinition: TableDefinitionProps[] = [
  { header: 'Date', data: 'Date' },
  { header: 'Open', data: 'open' },
  { header: 'High', data: 'high' },
  { header: 'Low', data: 'low' },
  { header: 'Close', data: 'close' },
  { header: 'Volume', data: 'volume' },
  { header: 'Daily Return (%)', data: 'dailyReturn' },
];

export const optionDefinition = [
  { selection: 'Select a Ticker', value: '' },
  { selection: 'AAPL', value: 'AAPL' },
  { selection: 'MSFT', value: 'MSFT' },
  { selection: 'AMZN', value: 'AMZN' },
];

export const inputDefinition: InputDefinitionProps[] = [
  { name: 'startDate', label: 'Start Date', type: 'date' },
  { name: 'endDate', label: 'End Date', type: 'date' },
];
