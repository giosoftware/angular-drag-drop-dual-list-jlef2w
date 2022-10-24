import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DragDropDualListComponent } from './drag-drop-dual-list/drag-drop-dual-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ArraySortPipe, ArrayFilterPipe } from './array.pipes';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, DragDropModule ],
  declarations: [ AppComponent, DragDropDualListComponent, ArraySortPipe, ArrayFilterPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
