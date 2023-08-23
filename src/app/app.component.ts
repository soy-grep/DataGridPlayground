import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  DxButtonModule,
  DxLoadIndicatorModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextBoxModule
} from 'devextreme-angular';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { appComponentActions } from './form-state/app-component-actions';
import { DocumentModel } from './form-state/model';
import { documentFormStateSelector, loadInProgressSelector, recalculateInProgressSelector } from './form-state/state';
import { DataGridItemsComponent } from './items/data-grid-items/data-grid-items.component';
import { SimpleItemsComponent } from './items/simple-items/simple-items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DxButtonModule,
    DxTextBoxModule,
    DxTextBoxModule,
    NgrxFormsModule,
    SimpleItemsComponent,
    DataGridItemsComponent,
    DxSelectBoxModule,
    DxLoadPanelModule,
    DxLoadIndicatorModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  protected formState$: Observable<FormGroupState<DocumentModel>>;

  protected recalculationInProgress$: Observable<boolean>;
  protected loadInProgress$: Observable<boolean>;

  protected currentItemsEditorVariant: 'simple' | 'dx' = 'dx';

  protected itemsEditorVariants: { value: 'simple' | 'dx', text: string }[] = [
    { value: 'simple', text: 'Simple *ngFor and <table>' },
    { value: 'dx', text: 'DevExtreme DataGrid' },
  ];

  constructor(
    private store: Store,
  ) {
    this.formState$ = store.select(documentFormStateSelector);
    this.recalculationInProgress$ = store.select(recalculateInProgressSelector);
    this.loadInProgress$ = store.select(loadInProgressSelector);
  }

  ngOnInit(): void {
    this.loadDocumentById(1);
  }

  loadEmptyDocument(): void {
    this.store.dispatch(appComponentActions.loadEmptyDocument());
  }

  loadDocumentById(id: number): void {
    this.store.dispatch(appComponentActions.loadDocumentById({ id }));
  }
}
