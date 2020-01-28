import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'library-account',
        loadChildren: () => import('./library-account/library-account.module').then(m => m.SQuLcProjectLibraryAccountModule)
      },
      {
        path: 'lib-user',
        loadChildren: () => import('./lib-user/lib-user.module').then(m => m.SQuLcProjectLibUserModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.SQuLcProjectBookModule)
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.SQuLcProjectAuthorModule)
      },
      {
        path: 'renting-list',
        loadChildren: () => import('./renting-list/renting-list.module').then(m => m.SQuLcProjectRentingListModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SQuLcProjectEntityModule {}
