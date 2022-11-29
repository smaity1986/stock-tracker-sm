import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  stockArr: Array<Object> = [];

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

    JSON.parse(stockArr).map((v, k) => {
      if (v.displaySymbol == symbol) {
        isMatched = true;
        return;
      }
    });

    return isMatched;
  }
}
