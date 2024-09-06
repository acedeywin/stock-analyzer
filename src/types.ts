export interface StockData {
  Date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ticker: string;
}

export interface StockReturn extends StockData {
  dailyReturn: number;
}

export interface FormValues {
  ticker: string;
  startDate: string;
  endDate: string;
}

export interface StockFormProps {
  onSubmit: (values: FormValues) => void;
}

export interface StockChartProps {
  data: StockReturn[];
}

export interface StockTableProps {
  data: StockReturn[];
}

export interface TableDefinitionProps {
  header: string;
  data: keyof StockReturn;
}

export interface InputDefinitionProps {
  name: keyof FormValues;
  label: string;
  type: string;
}

export interface Paginationrops {
  data: StockReturn[];
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  currentPage: number;
}
