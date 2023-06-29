import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error-block',
  templateUrl: './error-block.component.html',
  styleUrls: ['./error-block.component.css'],
})
export class ErrorBlockComponent {
  constructor(public errorService: ErrorService) {}
}
