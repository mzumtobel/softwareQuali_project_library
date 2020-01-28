import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILibraryAccount, LibraryAccount } from 'app/shared/model/library-account.model';
import { LibraryAccountService } from './library-account.service';
import { LibraryAccountComponent } from './library-account.component';
import { LibraryAccountDetailComponent } from './library-account-detail.component';
import { LibraryAccountUpdateComponent } from './library-account-update.component';

@Injectable({ providedIn: 'root' })
export class LibraryAccountResolve implements Resolve<ILibraryAccount> {
  constructor(private service: LibraryAccountService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILibraryAccount> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((libraryAccount: HttpResponse<LibraryAccount>) => {
          if (libraryAccount.body) {
            return of(libraryAccount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LibraryAccount());
  }
}

export const libraryAccountRoute: Routes = [
  {
    path: '',
    component: LibraryAccountComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibraryAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LibraryAccountDetailComponent,
    resolve: {
      libraryAccount: LibraryAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibraryAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LibraryAccountUpdateComponent,
    resolve: {
      libraryAccount: LibraryAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibraryAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LibraryAccountUpdateComponent,
    resolve: {
      libraryAccount: LibraryAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LibraryAccounts'
    },
    canActivate: [UserRouteAccessService]
  }
];
