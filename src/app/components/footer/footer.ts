import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngular, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // Variables
  faAngular = faAngular;
  faGitHub = faGithub;

  // Services
  private appService = inject(AppService);

  public get currentYear(): string {
    const date = new Date();
    return date.getFullYear().toString();
  }

  public get appTitle(): string {
    return this.appService.APP_TITLE;
  }
}
