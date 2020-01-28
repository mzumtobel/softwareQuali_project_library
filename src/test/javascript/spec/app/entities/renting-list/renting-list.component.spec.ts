import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SQuLcProjectTestModule } from '../../../test.module';
import { RentingListComponent } from 'app/entities/renting-list/renting-list.component';
import { RentingListService } from 'app/entities/renting-list/renting-list.service';
import { RentingList } from 'app/shared/model/renting-list.model';

describe('Component Tests', () => {
  describe('RentingList Management Component', () => {
    let comp: RentingListComponent;
    let fixture: ComponentFixture<RentingListComponent>;
    let service: RentingListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [RentingListComponent],
        providers: []
      })
        .overrideTemplate(RentingListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RentingListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RentingListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RentingList(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rentingLists && comp.rentingLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
