import { SentimentData } from './sentimentData.model';

export interface SentimentDetails {
  data: Array<SentimentData>;
  symbol: string;
}
