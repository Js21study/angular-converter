import { Component, OnInit } from '@angular/core';

import { ConvertationService } from './services/convertation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular Job Test';

  loading = true;

  constructor(public convertationService: ConvertationService) {}

  ngOnInit(): void {
    this.loading = true;

    this.convertationService.getAll().subscribe(() => {
      this.loading = false;
    });

    this.convertationService.getAllEur().subscribe();
  }
}
