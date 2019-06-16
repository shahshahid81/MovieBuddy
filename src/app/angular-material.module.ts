import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule,
            MatGridListModule],
  exports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule,
            MatGridListModule]
})
export class AngularModule {}
