import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MainComponent } from './component/main/main.component';
import { ListComponent } from './component/list/list.component';
import { SearchComponent } from './component/search/search.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    MainComponent,
    ListComponent,
    SearchComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
