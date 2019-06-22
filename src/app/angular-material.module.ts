import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule,
            MatPaginatorModule,
            MatProgressSpinnerModule
          ],
  exports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule,
            MatPaginatorModule,
            MatProgressSpinnerModule
           ]
})
export class AngularModule {}
