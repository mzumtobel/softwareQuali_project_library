import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SQuLcProjectTestModule } from '../../../test.module';
import { LibUserComponent } from 'app/entities/lib-user/lib-user.component';
import { LibUserService } from 'app/entities/lib-user/lib-user.service';
import { LibUser } from 'app/shared/model/lib-user.model';

describe('Component Tests', () => {
  describe('LibUser Management Component', () => {
    let comp: LibUserComponent;
    let fixture: ComponentFixture<LibUserComponent>;
    let service: LibUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [LibUserComponent],
        providers: []
      })
        .overrideTemplate(LibUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LibUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LibUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LibUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.libUsers && comp.libUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
