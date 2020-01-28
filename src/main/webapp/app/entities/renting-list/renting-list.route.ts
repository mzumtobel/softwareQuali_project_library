import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRentingList, RentingList } from 'app/shared/model/renting-list.model';
import { RentingListService } from './renting-list.service';
import { RentingListComponent } from './renting-list.component';
import { RentingListDetailComponent } from './renting-list-detail.component';
import { RentingListUpdateComponent } from './renting-list-update.component';

@Injectable({ providedIn: 'root' })
export class RentingListResolve implements Resolve<IRentingList> {
  constructor(private service: RentingListService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRentingList> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rentingList: HttpResponse<RentingList>) => {
          if (rentingList.body) {
            return of(rentingList.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RentingList());
  }
}

export const rentingListRoute: Routes = [
  {
    path: '',
    component: RentingListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RentingLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RentingListDetailComponent,
    resolve: {
      rentingList: RentingListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RentingLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RentingListUpdateComponent,
    resolve: {
      rentingList: RentingListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RentingLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RentingListUpdateComponent,
    resolve: {
      rentingList: RentingListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RentingLists'
    },
    canActivate: [UserRouteAccessService]
  }
];
