import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  availableItems: any[] = [];
  selectedItems: any[] = [];
  currentSelectItems: any[] = [];

  ngOnInit() {
    this.availableItems = [
      { id: '1', name: 'Item 1'},
      { id: '2', name: 'Item 2'},
      { id: '3', name: 'Item 3'},
      { id: '4', name: 'Item 4'},
      { id: '5', name: 'Item 5'},
      { id: '6', name: 'Item 6'},
    ]
  }

  onItemsMoved(event): void {
    this.currentSelectItems = event.selected;
  }
}
