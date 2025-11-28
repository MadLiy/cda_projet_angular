export interface Notification {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;    // durée en ms avant disparition (optionnel, par défaut 4000)
}