import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SQuLcProjectSharedModule } from 'app/shared/shared.module';
import { LibraryAccountComponent } from './library-account.component';
import { LibraryAccountDetailComponent } from './library-account-detail.component';
import { LibraryAccountUpdateComponent } from './library-account-update.component';
import { LibraryAccountDeleteDialogComponent } from './library-account-delete-dialog.component';
import { libraryAccountRoute } from './library-account.route';

@NgModule({
  imports: [SQuLcProjectSharedModule, RouterModule.forChild(libraryAccountRoute)],
  declarations: [
    LibraryAccountComponent,
    LibraryAccountDetailComponent,
    LibraryAccountUpdateComponent,
    LibraryAccountDeleteDialogComponent
  ],
  entryComponents: [LibraryAccountDeleteDialogComponent]
})
export class SQuLcProjectLibraryAccountModule {}
