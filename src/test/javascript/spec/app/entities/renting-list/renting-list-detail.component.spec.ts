import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { RentingListDetailComponent } from 'app/entities/renting-list/renting-list-detail.component';
import { RentingList } from 'app/shared/model/renting-list.model';

describe('Component Tests', () => {
  describe('RentingList Management Detail Component', () => {
    let comp: RentingListDetailComponent;
    let fixture: ComponentFixture<RentingListDetailComponent>;
    const route = ({ data: of({ rentingList: new RentingList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [RentingListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RentingListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RentingListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load rentingList on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rentingList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
