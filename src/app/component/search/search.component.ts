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

  stockArr = [];

  listDataSet = [];
  isSubmitted = false;
  showError = false;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSubmit(data) {
    this.isSubmitted = true;
    let searchVal = data.stockInput.toUpperCase();
    this.showError = false;
    if (!searchVal && this.isSubmitted) {
      this.showError = true;
      return;
    }
    if (!this.checkIfExists(searchVal)) {
      //this.searchArr.push(searchVal);
      // localStorage.setItem('searchVal', JSON.stringify(this.searchArr));
      this.newItemEvent.emit(searchVal);
      this.stockModel.stockInput = '';
      this.isSubmitted = false;
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
