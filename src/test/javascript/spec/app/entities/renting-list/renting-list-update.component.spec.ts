import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { RentingListUpdateComponent } from 'app/entities/renting-list/renting-list-update.component';
import { RentingListService } from 'app/entities/renting-list/renting-list.service';
import { RentingList } from 'app/shared/model/renting-list.model';

describe('Component Tests', () => {
  describe('RentingList Management Update Component', () => {
    let comp: RentingListUpdateComponent;
    let fixture: ComponentFixture<RentingListUpdateComponent>;
    let service: RentingListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [RentingListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RentingListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RentingListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RentingListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RentingList(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RentingList();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
