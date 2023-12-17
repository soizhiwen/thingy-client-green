export interface Notification {
  id?: number;
  message: string;
  userId:number;
  plantId:number;
  viewed:'New'|'Read';
  timestamp: number;
}
