import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ListStockData } from '../../models/listStockData.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() data: Array<ListStockData> = [];
  @Output() removeItemEvent = new EventEmitter<string>();

  stockArr: Array<ListStockData> = [];

  constructor(private router: Router) {}

  ngOnInit() {}

  removeStock(symbol: string) {
    let stocks = localStorage.getItem('stockArr');
    this.stockArr = JSON.parse(stocks);

    this.stockArr.map((v, k) => {
      if (v['displaySymbol'] == symbol) {
        this.stockArr.splice(k, 1);
        return;
      }
    });

    let stocksSym = localStorage.getItem('searchSymbol');
    let symArr = JSON.parse(stocksSym);
    symArr.map((v: string, k: number) => {
      if (v == symbol) {
        symArr.splice(k, 1);
        return;
      }
    });

    document.getElementById('stock' + symbol).remove();
    this.removeItemEvent.emit(symbol);
    if (this.stockArr.length) {
      localStorage.setItem('stockArr', JSON.stringify(this.stockArr));
      localStorage.setItem('searchSymbol', JSON.stringify(symArr));
    } else {
      localStorage.removeItem('stockArr');
      localStorage.removeItem('searchSymbol');
      localStorage.removeItem('sentiment_name');
    }
  }

  goToDetails(searchVal: string, name: string) {
    localStorage.setItem('sentiment_name', name);
    this.router.navigate(['/sentiment/' + searchVal]);
  }
}
