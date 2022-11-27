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
    this.stockDataService
      .getSentimentBySymbol(this.searchSymbol)
      .subscribe((details: Array<Object>) => {
        console.log(details, this.sentimentDetails);
        this.isLoaded = true;
        this.showLoader = false;
        let newDetails = [];

        details['data'].map((v, k) => {
          console.log(k, v);
          if (k > details['data'].length - 4) {
            newDetails[k] = v;
          }
        });
        console.log(newDetails);
        newDetails = newDetails.filter(function (element) {
          return element !== undefined;
        });
        console.log(newDetails);
        details['data'] = newDetails;
        this.sentimentDetails = details;
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
