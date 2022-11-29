import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListStockData } from '../../models/listStockData.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  stockArr: Array<ListStockData> = [];

  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSubmit(data: NgForm) {
    let searchVal = data.controls.stockInput.value.toUpperCase();
    if (!this.checkIfExists(searchVal)) {
      this.newItemEvent.emit(searchVal);
      data.reset();
    }
  }

  checkIfExists(symbol: string) {
    var isMatched = false;
    let stockArr = localStorage.getItem('stockArr');
    if (!stockArr) {
      this.stockArr = [];
      return isMatched;
    }
    this.stockArr = JSON.parse(stockArr);
    this.stockArr.map((v) => {
      if (v['displaySymbol'] == symbol) {
        isMatched = true;
        return;
      }
    });

    return isMatched;
  }
}
