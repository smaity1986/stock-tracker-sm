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

  listDataSet = [];

  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSubmit(data) {
    let searchVal = data.stockInput.toUpperCase();
    let searchArr = [];
    searchArr.push(searchVal);
    localStorage.setItem('searchVal', JSON.stringify(searchArr));
    this.newItemEvent.emit(searchVal);
  }
}
