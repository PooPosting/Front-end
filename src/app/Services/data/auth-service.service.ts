import { Injectable } from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {HttpParamsServiceService} from "../http/http-params-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  UserInfo: UserInfoModel | undefined;

  constructor(
    private params: HttpParamsServiceService) {}

  setUserInfo(value: UserInfoModel): void{
    this.UserInfo = value;
    // localStorage.setItem("token", this.UserInfo.authToken);
    this.params.GetPQuery.likedTags = this.UserInfo.likedTags;
  }
  getAuthToken(): string {
    if(this.UserInfo?.authToken){
      return this.UserInfo.authToken;
    }
    return "";
  }
  getUserInfo(): any {
    if(this.UserInfo){
      return this.UserInfo;
    }
    return undefined;
  }
  getLikes(): any {
    if(this.UserInfo){
      return this.UserInfo.likes;
    }
    return null;
  }
  isUserLogged(): boolean {
    return (this.UserInfo != null);
  }

}
