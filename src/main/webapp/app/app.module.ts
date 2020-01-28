import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SQuLcProjectSharedModule } from 'app/shared/shared.module';
import { SQuLcProjectCoreModule } from 'app/core/core.module';
import { SQuLcProjectAppRoutingModule } from './app-routing.module';
import { SQuLcProjectHomeModule } from './home/home.module';
import { SQuLcProjectEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    SQuLcProjectSharedModule,
    SQuLcProjectCoreModule,
    SQuLcProjectHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SQuLcProjectEntityModule,
    SQuLcProjectAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class SQuLcProjectAppModule {}
