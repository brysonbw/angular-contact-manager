import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Variables
  public readonly APP_TITLE = 'Contact Manager';

  // Signals
  private _isPageNotFound = signal<boolean>(false);
  public readonly isPageNotFound = this._isPageNotFound.asReadonly();

  /**
   * Sets value for 'isPageNotFound' signal. Use to toggle header and footer for page not found
   * @param value
   */
  public setIsPageNotFound(value: boolean) {
    this._isPageNotFound.set(value);
  }
}
