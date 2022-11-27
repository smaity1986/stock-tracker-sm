import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() data;
  @Output() removeItemEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit() {
    //console.log('List-', this.data);
  }

  removeStock(symbol: string) {
    let stocks = localStorage.getItem('stockArr');
    let stockArr = JSON.parse(stocks);
    //console.log(symbol, symbolArr, stockArr);

    stockArr.map((v, k) => {
      if (v.displaySymbol == symbol) {
        stockArr.splice(k, 1);
        return;
      }
    });

    document.getElementById('stock' + symbol).remove();
    this.removeItemEvent.emit(symbol);
    if (stockArr.length) {
      localStorage.setItem('stockArr', JSON.stringify(stockArr));
    } else {
      localStorage.removeItem('stockArr');
      localStorage.removeItem('sentiment_name');
    }
  }

  goToDetails(searchVal: string, name: string) {
    localStorage.setItem('sentiment_name', name);
    this.router.navigate(['/sentiment/' + searchVal]);
  }
}
