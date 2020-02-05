import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { SomeThingDetailComponent } from 'app/entities/some-thing/some-thing-detail.component';
import { SomeThing } from 'app/shared/model/some-thing.model';

describe('Component Tests', () => {
  describe('SomeThing Management Detail Component', () => {
    let comp: SomeThingDetailComponent;
    let fixture: ComponentFixture<SomeThingDetailComponent>;
    const route = ({ data: of({ someThing: new SomeThing(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [SomeThingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SomeThingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SomeThingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load someThing on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.someThing).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
