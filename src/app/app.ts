import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Toaster } from './components/toaster/toaster';
import { AppService } from './services/app.service';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Toaster, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Services
  private appService = inject(AppService);

  // Signals
  pageNotFoundShown = this.appService.isPageNotFound;
}
