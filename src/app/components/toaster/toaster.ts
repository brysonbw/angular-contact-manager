import { Component, inject } from '@angular/core';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimesCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toaster',
  imports: [FontAwesomeModule],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {
  // Variables
  faClose = faXmark;

  // Services
  private toastService = inject(ToastService);
  toastList = this.toastService.toasts;

  /**
   * Remove toast from queue
   * @param toast
   */
  dismissToast(toast: any): void {
    this.toastService.remove(toast);
  }

  /**
   * Get toast icon based on toast type (e.g success, info, warning, ect...)
   * @param type
   * @returns
   */
  getIcon(type: string): IconDefinition {
    switch (type) {
      case 'info':
        return faInfoCircle;
      case 'warning':
        return faExclamationTriangle;
      case 'success':
        return faCheckCircle;
      case 'error':
        return faTimesCircle;
      default:
        return faInfoCircle; // Default icon
    }
  }

  getToastPosition(position: string): string | undefined {
    return {
      'top-left': 'top-left',
      'top-right': 'top-right',
      'top-center': 'top-center',
      'bottom-left': 'bottom-left',
      'bottom-right': 'bottom-right',
      'bottom-center': 'bottom-center',
    }[position];
  }
}
