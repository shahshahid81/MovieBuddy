import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule,
            MatPaginatorModule
          ],
  exports: [MatToolbarModule,
            MatFormFieldModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatListModule,
            MatPaginatorModule
           ]
})
export class AngularModule {}
