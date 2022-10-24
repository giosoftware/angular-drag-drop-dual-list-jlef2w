import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IListBoxItem, IItemsMovedEvent } from '../dual-list-box';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-drag-drop-dual-list',
  templateUrl: './drag-drop-dual-list.component.html',
  styleUrls: ['./drag-drop-dual-list.component.css'],
})
export class DragDropDualListComponent {

  // array of items to display in left box
  @Input() set availables(items: Array<{}>) {
    this.availableItems = [...(items || []).map((item: {}, index: number) => ({
      value: item[this.valueField].toString(),
      text: item[this.textField],
    }))];
  }
  // array of items to display in right box
  @Input() set selects(items: Array<{}>) {
    this.selectedItems = [...(items || []).map((item: {}, index: number) => ({
      value: item[this.valueField].toString(),
      text: item[this.textField],
    }))];
  }
  // field to use for value of option
  @Input() valueField = 'id';
  // field to use for displaying option text
  @Input() textField = 'name';
  // text displayed over the available items list box
  @Input() availableText = 'Available items';
  // text displayed over the selected items list box
  @Input() selectedText = 'Selected items';
  // set placeholder text in available items list box
  @Input() availableFilterPlaceholder = 'Filter...';
  // set placeholder text in selected items list box
  @Input() selectedFilterPlaceholder = 'Filter...';

  // event called when items are moved between boxes, returns state of both boxes and item moved
  @Output() itemsMoved: EventEmitter<IItemsMovedEvent> = new EventEmitter<IItemsMovedEvent>();

  availableItems: Array<IListBoxItem> = [];
  selectedItems: Array<IListBoxItem> = [];
  listBoxForm: FormGroup;

  constructor(public fb: FormBuilder) {

    this.listBoxForm = this.fb.group({
      availableSearchInput: [''],
      selectedSearchInput: [''],
    });
  }

  drop(event: CdkDragDrop<IListBoxItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    // clear marked available items and emit event
    this.itemsMoved.emit({
      available: this.availableItems,
      selected: this.selectedItems,
      movedItems: event.container.data.filter((v, i) => i === event.currentIndex),
      from: 'available',
      to: 'selected',
    });
  }
}
