import { User } from "../user/user.model";

export interface Auth{
  token:string;
  user:User;
}
