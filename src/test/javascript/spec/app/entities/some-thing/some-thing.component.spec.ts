import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SQuLcProjectTestModule } from '../../../test.module';
import { SomeThingComponent } from 'app/entities/some-thing/some-thing.component';
import { SomeThingService } from 'app/entities/some-thing/some-thing.service';
import { SomeThing } from 'app/shared/model/some-thing.model';

describe('Component Tests', () => {
  describe('SomeThing Management Component', () => {
    let comp: SomeThingComponent;
    let fixture: ComponentFixture<SomeThingComponent>;
    let service: SomeThingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SQuLcProjectTestModule],
        declarations: [SomeThingComponent],
        providers: []
      })
        .overrideTemplate(SomeThingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SomeThingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SomeThingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SomeThing(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.someThings && comp.someThings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
