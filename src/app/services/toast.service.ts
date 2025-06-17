import { Injectable, signal } from '@angular/core';
import { randomUUID } from '../../utils/generateUUID';
import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // Variables
  private readonly QUEUE_LIMIT: number = 7;

  // Signals
  private _toasts = signal<Toast[]>([]);
  public readonly toasts = this._toasts.asReadonly();

  /**
   * Add toast notification
   * @param message
   * @param duration
   * @param type
   * @param position
   */
  public add(
    message: string,
    duration = 7000,
    type: 'success' | 'error' | 'warning' | 'info' = 'success',
    position:
      | 'top-left'
      | 'top-right'
      | 'top-center'
      | 'bottom-left'
      | 'bottom-right'
      | 'bottom-center' = 'top-center'
  ): void {
    // Check if max limit reached in queue
    if (this._toasts().length > this.QUEUE_LIMIT) {
      return;
    }

    const newToast: Toast = {
      id: randomUUID(),
      message,
      duration,
      type,
      position,
    };

    this._toasts.update((prevToasts) => [...prevToasts, newToast]);

    // Set `-1` to make toast not disappear
    if (duration > 0) {
      setTimeout(() => this.remove(newToast), duration);
    }
  }

  /**
   * Remove toast
   * @param toastToRemove
   */
  public remove(toastToRemove: Toast): void {
    this._toasts.update((toasts: Toast[]) => {
      return toasts.filter((item) => item !== toastToRemove);
    });
  }
}
