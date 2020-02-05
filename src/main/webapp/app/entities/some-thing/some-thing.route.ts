import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISomeThing, SomeThing } from 'app/shared/model/some-thing.model';
import { SomeThingService } from './some-thing.service';
import { SomeThingComponent } from './some-thing.component';
import { SomeThingDetailComponent } from './some-thing-detail.component';
import { SomeThingUpdateComponent } from './some-thing-update.component';

@Injectable({ providedIn: 'root' })
export class SomeThingResolve implements Resolve<ISomeThing> {
  constructor(private service: SomeThingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISomeThing> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((someThing: HttpResponse<SomeThing>) => {
          if (someThing.body) {
            return of(someThing.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SomeThing());
  }
}

export const someThingRoute: Routes = [
  {
    path: '',
    component: SomeThingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SomeThings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SomeThingDetailComponent,
    resolve: {
      someThing: SomeThingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SomeThings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SomeThingUpdateComponent,
    resolve: {
      someThing: SomeThingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SomeThings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SomeThingUpdateComponent,
    resolve: {
      someThing: SomeThingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SomeThings'
    },
    canActivate: [UserRouteAccessService]
  }
];
