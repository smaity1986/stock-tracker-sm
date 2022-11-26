import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() data;

  constructor() {}

  ngOnInit() {
    console.log('List-', this.data);
  }

  removeStock(symbol) {
    let symbols = localStorage.getItem('searchVal');
    let stocks = localStorage.getItem('stockArr');

    let symbolArr = JSON.parse(symbols);
    let stockArr = JSON.parse(stocks);
    console.log(symbol, symbolArr, stockArr);

    stockArr.map((v, k) => {
      if (v.displaySymbol == symbol) {
        stockArr.splice(k, 1);
        return;
      }
    });
    symbolArr.map((v, k) => {
      if (v == symbol) {
        symbolArr.splice(k, 1);
        return;
      }
    });
    document.getElementById('stock' + symbol).remove();
    if (symbolArr.length && stockArr.length) {
      localStorage.setItem('searchVal', JSON.stringify(symbolArr));
      localStorage.setItem('stockArr', JSON.stringify(stockArr));
    } else {
      localStorage.removeItem('searchVal');
      localStorage.removeItem('stockArr');
      localStorage.removeItem('isback');
    }
  }
}
