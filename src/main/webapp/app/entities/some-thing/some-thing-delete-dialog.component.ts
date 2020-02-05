import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISomeThing } from 'app/shared/model/some-thing.model';
import { SomeThingService } from './some-thing.service';

@Component({
  templateUrl: './some-thing-delete-dialog.component.html'
})
export class SomeThingDeleteDialogComponent {
  someThing?: ISomeThing;

  constructor(protected someThingService: SomeThingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.someThingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('someThingListModification');
      this.activeModal.close();
    });
  }
}
