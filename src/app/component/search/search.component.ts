import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  stockModel = {
    stockInput: '',
  };

  constructor(private stockDataService: StockDataService) {}

  ngOnInit() {}

  onSubmit(data) {
    let searchVal = data.stockInput.toUpperCase();
    console.log(searchVal);
    this.stockDataService.getStockBySymbol(searchVal).subscribe((d) => {
      console.log(d);
    });
  }
}
