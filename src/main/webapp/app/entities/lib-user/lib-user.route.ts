import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILibUser, LibUser } from 'app/shared/model/lib-user.model';
import { LibUserService } from './lib-user.service';
import { LibUserComponent } from './lib-user.component';
import { LibUserDetailComponent } from './lib-user-detail.component';
import { LibUserUpdateComponent } from './lib-user-update.component';

@Injectable({ providedIn: 'root' })
export class LibUserResolve implements Resolve<ILibUser> {
  constructor(private service: LibUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILibUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((libUser: HttpResponse<LibUser>) => {
          if (libUser.body) {
            return of(libUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LibUser());
  }
}

export const libUserRoute: Routes = [
  {
    path: '',
    component: LibUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LibUserDetailComponent,
    resolve: {
      libUser: LibUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LibUserUpdateComponent,
    resolve: {
      libUser: LibUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LibUserUpdateComponent,
    resolve: {
      libUser: LibUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];
