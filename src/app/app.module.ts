import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroCounterSearchComponent } from './hero-counter-search/hero-counter-search.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppComponent, HeroCounterSearchComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, MatAutocompleteModule, BrowserAnimationsModule, MatFormFieldModule
  , MatInputModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
