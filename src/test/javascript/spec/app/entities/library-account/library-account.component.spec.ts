import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SQuLcProjectTestModule } from '../../../test.module';
import { LibraryAccountComponent } from 'app/entities/library-account/library-account.component';
import { LibraryAccountService } from 'app/entities/library-account/library-account.service';
import { LibraryAccount } from 'app/shared/model/library-account.model';

describe('Component Tests', () => {
  describe('LibraryAccount Management Component', () => {
    let comp: LibraryAccountComponent;
    let fixture: ComponentFixture<LibraryAccountComponent>;
    let service: LibraryAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [LibraryAccountComponent],
        providers: []
      })
        .overrideTemplate(LibraryAccountComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LibraryAccountComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LibraryAccountService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LibraryAccount(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.libraryAccounts && comp.libraryAccounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
