import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DxDataGridModule } from 'devextreme-angular';
import { FormArrayState, SetValueAction } from 'ngrx-forms';
import { GridItemModel, ItemModel } from '../../form-state/model';
import { FORM_ID } from '../../form-state/state';

@Component({
  selector: 'app-data-grid-form-items',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
  ],
  templateUrl: './data-grid-form-items.component.html',
  styleUrls: ['./data-grid-form-items.component.scss']
})
export class DataGridFormItemsComponent implements OnChanges {

  @Input() formState: FormArrayState<ItemModel>;

  protected gridItems: GridItemModel[] = [];

  constructor(
    private store: Store,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formState']) {
      const currentChanges: FormArrayState<ItemModel> = changes['formState'].currentValue;

      this.gridItems = currentChanges.value
        .map((item, index) => ({
          __storeIndex: index,
          ...item
        }));
    }
  }

  rowUpdating(e: any): void {
    if (e && e.newData) {
      const changedProperty = Object.keys(e.newData)[0];
      const value = e.newData[changedProperty];
      const action = new SetValueAction(`${FORM_ID}.items.${e.key}.${changedProperty}`, value);
      this.store.dispatch(action);
    }
  }

}
