import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockDataService } from '../../services/stock-data.service';
import { finalize } from 'rxjs';

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
  lable: string;
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
    this.lable = localStorage.getItem('sentiment_name');
    this.getDetails();
  }

  getDetails() {
    this.showLoader = true;
    var d = new Date();
    let to = this.formatDate(d.toLocaleDateString());
    d.setMonth(d.getMonth() - 3);
    let from = this.formatDate(d.toLocaleDateString());
    this.stockDataService
      .getSentimentBySymbol(this.searchSymbol, from, to)
      .pipe(
        finalize(() => {
          this.isLoaded = true;
          this.showLoader = false;
        })
      )
      .subscribe({
        error: (err) => {
          this.sentimentDetails = [];
        },
        next: (details) => {
          this.sentimentDetails = details;
        },
        complete: () => {},
      });
  }

  getMonthName(id: number) {
    id = id > 0 ? id - 1 : 1;
    return this.monthList[id];
  }

  goBacktoList() {
    this.router.navigate(['']);
  }

  formatDate(date: string) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
