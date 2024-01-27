import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
