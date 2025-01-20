import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { TestComponent } from './test/test.component';
import { RiskPipe } from './pipes/risk.pipe';
import { ChildComponent } from './child/child.component';
import { DateCheckPipe } from './pipes/date-check.pipe';
import { HighlightDirective } from './/directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TestComponent,
    RiskPipe,
    ChildComponent,
    DateCheckPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
