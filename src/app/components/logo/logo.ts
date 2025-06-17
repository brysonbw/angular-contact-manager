import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logo',
  imports: [FontAwesomeModule],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {
  // Variables
  faAddressBook = faAddressBook;
}
