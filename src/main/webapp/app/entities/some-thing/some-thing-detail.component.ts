import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISomeThing } from 'app/shared/model/some-thing.model';

@Component({
  selector: 'jhi-some-thing-detail',
  templateUrl: './some-thing-detail.component.html'
})
export class SomeThingDetailComponent implements OnInit {
  someThing: ISomeThing | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ someThing }) => {
      this.someThing = someThing;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
