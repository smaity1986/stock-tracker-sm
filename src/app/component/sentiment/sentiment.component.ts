import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  sentimentDetails: object;
  searchSymbol: string;
  monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private stockDataService: StockDataService
  ) {}

  ngOnInit() {
    this.searchSymbol = this._activatedRoute.snapshot.params.symbol;
    this.getDetails();
  }

  getDetails() {
    this.stockDataService
      .getSentimentBySymbol(this.searchSymbol)
      .subscribe((details) => {
        this.sentimentDetails = details;
        console.log(details);
      });
  }

  getMonthName(id: number) {
    id = id > 0 ? id - 1 : 1;
    return this.monthList[id];
  }
}
