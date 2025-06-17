export type Toast = {
  id: string;
  message: string;
  duration: number;
  type: 'success' | 'error' | 'warning' | 'info';
  position:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
};
