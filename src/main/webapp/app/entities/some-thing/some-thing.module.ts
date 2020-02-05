import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SQuLcProjectSharedModule } from 'app/shared/shared.module';
import { SomeThingComponent } from './some-thing.component';
import { SomeThingDetailComponent } from './some-thing-detail.component';
import { SomeThingUpdateComponent } from './some-thing-update.component';
import { SomeThingDeleteDialogComponent } from './some-thing-delete-dialog.component';
import { someThingRoute } from './some-thing.route';

@NgModule({
  imports: [SQuLcProjectSharedModule, RouterModule.forChild(someThingRoute)],
  declarations: [SomeThingComponent, SomeThingDetailComponent, SomeThingUpdateComponent, SomeThingDeleteDialogComponent],
  entryComponents: [SomeThingDeleteDialogComponent]
})
export class SQuLcProjectSomeThingModule {}
