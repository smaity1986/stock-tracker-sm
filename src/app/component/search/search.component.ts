import { Component, OnInit } from '@angular/core';
import {StockDataService} from '../../services/stock-data.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
 

  stockModel = {
    stockInput : ''
  }

  constructor(private stockDataService:StockDataService) {}

  ngOnInit() {}

  onSubmit(data) {
    console.log(data);
    this.stockDataService.getStockBySymbol(data)

  }
}
