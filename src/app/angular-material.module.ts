import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule],
  exports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule]
})
export class AngularModule {}
