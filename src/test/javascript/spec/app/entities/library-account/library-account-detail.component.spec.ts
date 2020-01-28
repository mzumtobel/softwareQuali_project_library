import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { LibraryAccountDetailComponent } from 'app/entities/library-account/library-account-detail.component';
import { LibraryAccount } from 'app/shared/model/library-account.model';

describe('Component Tests', () => {
  describe('LibraryAccount Management Detail Component', () => {
    let comp: LibraryAccountDetailComponent;
    let fixture: ComponentFixture<LibraryAccountDetailComponent>;
    const route = ({ data: of({ libraryAccount: new LibraryAccount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [LibraryAccountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LibraryAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LibraryAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load libraryAccount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.libraryAccount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
