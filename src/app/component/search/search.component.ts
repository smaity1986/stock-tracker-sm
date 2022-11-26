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
      this.searchArr.push(searchVal);
      localStorage.setItem('searchVal', JSON.stringify(this.searchArr));
      this.newItemEvent.emit(searchVal);
      this.stockModel.stockInput = '';
      this.isSubmitted = false;
    }
  }

  checkIfExists(symbol) {
    var isMatched = false;
    let symbolArr = localStorage.getItem('searchVal');
    if (!symbolArr) {
      this.searchArr = [];
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
