import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  sentimentDetails: object;
  searchSymbol: string;
  isLoaded = false;
  showLoader = false;
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
    private stockDataService: StockDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchSymbol = this._activatedRoute.snapshot.params.symbol;
    this.getDetails();
  }

  getDetails() {
    this.showLoader = true;
    this.stockDataService
      .getSentimentBySymbol(this.searchSymbol)
      .subscribe((details) => {
        this.isLoaded = true;
        this.showLoader = false;
        this.sentimentDetails = details;
        console.log(details);
      });
  }

  getMonthName(id: number) {
    id = id > 0 ? id - 1 : 1;
    return this.monthList[id];
  }

  goBacktoList() {
    localStorage.setItem('isback', '1');
    this.router.navigate(['']);
  }
}
