import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [InputTextModule, ButtonModule, DividerModule],
})
export class PrimengModule {}
