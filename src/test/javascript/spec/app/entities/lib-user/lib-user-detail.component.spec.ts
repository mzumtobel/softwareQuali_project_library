import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SQuLcProjectTestModule } from '../../../test.module';
import { LibUserDetailComponent } from 'app/entities/lib-user/lib-user-detail.component';
import { LibUser } from 'app/shared/model/lib-user.model';

describe('Component Tests', () => {
  describe('LibUser Management Detail Component', () => {
    let comp: LibUserDetailComponent;
    let fixture: ComponentFixture<LibUserDetailComponent>;
    const route = ({ data: of({ libUser: new LibUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [LibUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LibUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LibUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load libUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.libUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
