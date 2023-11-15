import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css',
  styles: [
    `
    :host {
      display: flex;
    }

    .snbar {
      color: hotpink;
    }
  `,
  ],
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
