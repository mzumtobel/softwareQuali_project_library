import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { SomeThingUpdateComponent } from 'app/entities/some-thing/some-thing-update.component';
import { SomeThingService } from 'app/entities/some-thing/some-thing.service';
import { SomeThing } from 'app/shared/model/some-thing.model';

describe('Component Tests', () => {
  describe('SomeThing Management Update Component', () => {
    let comp: SomeThingUpdateComponent;
    let fixture: ComponentFixture<SomeThingUpdateComponent>;
    let service: SomeThingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [SomeThingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SomeThingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SomeThingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SomeThingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SomeThing(123);
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
        const entity = new SomeThing();
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
