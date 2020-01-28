import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SQuLcProjectSharedModule } from 'app/shared/shared.module';
import { RentingListComponent } from './renting-list.component';
import { RentingListDetailComponent } from './renting-list-detail.component';
import { RentingListUpdateComponent } from './renting-list-update.component';
import { RentingListDeleteDialogComponent } from './renting-list-delete-dialog.component';
import { rentingListRoute } from './renting-list.route';

@NgModule({
  imports: [SQuLcProjectSharedModule, RouterModule.forChild(rentingListRoute)],
  declarations: [RentingListComponent, RentingListDetailComponent, RentingListUpdateComponent, RentingListDeleteDialogComponent],
  entryComponents: [RentingListDeleteDialogComponent]
})
export class SQuLcProjectRentingListModule {}
