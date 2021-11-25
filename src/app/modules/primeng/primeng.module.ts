import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { SidebarModule } from 'primeng/sidebar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    InputTextModule,
    ButtonModule,
    DividerModule,
    PasswordModule,
    InputMaskModule,
    SidebarModule,
    TieredMenuModule,
    SkeletonModule,
    DialogModule,
  ],
})
export class PrimengModule {}
