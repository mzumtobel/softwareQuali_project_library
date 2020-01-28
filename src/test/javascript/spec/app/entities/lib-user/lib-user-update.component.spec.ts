import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { LibUserUpdateComponent } from 'app/entities/lib-user/lib-user-update.component';
import { LibUserService } from 'app/entities/lib-user/lib-user.service';
import { LibUser } from 'app/shared/model/lib-user.model';

describe('Component Tests', () => {
  describe('LibUser Management Update Component', () => {
    let comp: LibUserUpdateComponent;
    let fixture: ComponentFixture<LibUserUpdateComponent>;
    let service: LibUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [LibUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LibUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LibUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LibUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LibUser(123);
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
        const entity = new LibUser();
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
