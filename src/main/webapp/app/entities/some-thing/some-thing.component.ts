import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISomeThing } from 'app/shared/model/some-thing.model';
import { SomeThingService } from './some-thing.service';
import { SomeThingDeleteDialogComponent } from './some-thing-delete-dialog.component';

@Component({
  selector: 'jhi-some-thing',
  templateUrl: './some-thing.component.html'
})
export class SomeThingComponent implements OnInit, OnDestroy {
  someThings?: ISomeThing[];
  eventSubscriber?: Subscription;

  constructor(protected someThingService: SomeThingService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.someThingService.query().subscribe((res: HttpResponse<ISomeThing[]>) => {
      this.someThings = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSomeThings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISomeThing): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSomeThings(): void {
    this.eventSubscriber = this.eventManager.subscribe('someThingListModification', () => this.loadAll());
  }

  delete(someThing: ISomeThing): void {
    const modalRef = this.modalService.open(SomeThingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.someThing = someThing;
  }
}
