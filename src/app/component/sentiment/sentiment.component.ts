import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockDataService } from '../../services/stock-data.service';
import { finalize } from 'rxjs';
import { SentimentDetails } from '../../models/sentimentDetails.model';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  sentimentDetails: SentimentDetails;
  searchSymbol: string;
  isLoaded: boolean = false;
  showLoader: boolean = false;
  lable: string;
  monthList: Array<string> = [
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
    private activatedRoute: ActivatedRoute,
    private stockDataService: StockDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchSymbol = this.activatedRoute.snapshot.params.symbol;
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
          this.sentimentDetails['data'] = [];
        },
        next: (details) => {
          if (details['data'].length && details['data'].length < 3) {
            var lastMonth =
              details['data'][details['data'].length - 1]['month'];
            for (let i = details['data'].length + 1; i <= 3; i++) {
              lastMonth = lastMonth == 12 ? 1 : lastMonth + 1;
              details['data'][i - 1] = {
                change: 0,
                month: 0,
                mspr: 0,
                symbol: '',
                year: 0,
              };

              details['data'][i - 1]['month'] = lastMonth;
              details['data'][i - 1]['nodata'] = 1;
            }
          }
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
