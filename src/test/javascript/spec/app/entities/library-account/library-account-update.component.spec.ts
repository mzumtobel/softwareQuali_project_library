import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { LibraryAccountUpdateComponent } from 'app/entities/library-account/library-account-update.component';
import { LibraryAccountService } from 'app/entities/library-account/library-account.service';
import { LibraryAccount } from 'app/shared/model/library-account.model';

describe('Component Tests', () => {
  describe('LibraryAccount Management Update Component', () => {
    let comp: LibraryAccountUpdateComponent;
    let fixture: ComponentFixture<LibraryAccountUpdateComponent>;
    let service: LibraryAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [LibraryAccountUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LibraryAccountUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LibraryAccountUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LibraryAccountService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LibraryAccount(123);
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
        const entity = new LibraryAccount();
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
