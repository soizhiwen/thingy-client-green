export interface Notification {
  id?: number;
  message: string;
  status: 'Mild'|'Average'|'Immediate';
  timeStamp: number;
}
