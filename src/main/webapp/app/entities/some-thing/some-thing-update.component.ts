import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISomeThing, SomeThing } from 'app/shared/model/some-thing.model';
import { SomeThingService } from './some-thing.service';

@Component({
  selector: 'jhi-some-thing-update',
  templateUrl: './some-thing-update.component.html'
})
export class SomeThingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected someThingService: SomeThingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ someThing }) => {
      this.updateForm(someThing);
    });
  }

  updateForm(someThing: ISomeThing): void {
    this.editForm.patchValue({
      id: someThing.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const someThing = this.createFromForm();
    if (someThing.id !== undefined) {
      this.subscribeToSaveResponse(this.someThingService.update(someThing));
    } else {
      this.subscribeToSaveResponse(this.someThingService.create(someThing));
    }
  }

  private createFromForm(): ISomeThing {
    return {
      ...new SomeThing(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISomeThing>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
