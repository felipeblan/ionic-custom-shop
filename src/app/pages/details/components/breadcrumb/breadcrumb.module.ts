import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [BreadcrumbComponent]
})

export class BreadcrumbModule { }
