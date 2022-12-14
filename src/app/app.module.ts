import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MainComponent } from './component/main/main.component';
import { ListComponent } from './component/list/list.component';
import { SearchComponent } from './component/search/search.component';
import { SentimentComponent } from './component/sentiment/sentiment.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HelloComponent,
    MainComponent,
    ListComponent,
    SearchComponent,
    SentimentComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
