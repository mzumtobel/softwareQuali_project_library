import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SQuLcProjectSharedModule } from 'app/shared/shared.module';
import { LibUserComponent } from './lib-user.component';
import { LibUserDetailComponent } from './lib-user-detail.component';
import { LibUserUpdateComponent } from './lib-user-update.component';
import { LibUserDeleteDialogComponent } from './lib-user-delete-dialog.component';
import { libUserRoute } from './lib-user.route';

@NgModule({
  imports: [SQuLcProjectSharedModule, RouterModule.forChild(libUserRoute)],
  declarations: [LibUserComponent, LibUserDetailComponent, LibUserUpdateComponent, LibUserDeleteDialogComponent],
  entryComponents: [LibUserDeleteDialogComponent]
})
export class SQuLcProjectLibUserModule {}
