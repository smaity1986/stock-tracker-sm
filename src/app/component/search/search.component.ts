import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  stockModel = {
    stockInput: '',
  };

  searchArr = [];

  listDataSet = [];

  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSubmit(data) {
    let searchVal = data.stockInput.toUpperCase();
    if (!this.checkIfExists(searchVal)) {
      this.searchArr.push(searchVal);
      localStorage.setItem('searchVal', JSON.stringify(this.searchArr));
      this.newItemEvent.emit(searchVal);
    }
  }

  checkIfExists(symbol) {
    var isMatched = false;
    let symbolArr = localStorage.getItem('searchVal');
    if (!symbolArr) {
      return isMatched;
    }

    JSON.parse(symbolArr).map((v, k) => {
      if (v == symbol) {
        isMatched = true;
        return;
      }
    });
    return isMatched;
  }
}
