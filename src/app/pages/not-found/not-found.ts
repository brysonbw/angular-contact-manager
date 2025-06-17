import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit, OnDestroy {
  // Services
  private appService = inject(AppService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.appService.setIsPageNotFound(true);
  }

  public ngOnDestroy(): void {
    this.appService.setIsPageNotFound(false);
  }

  public navigateToHome() {
    this.router.navigate(['/']);
  }
}
