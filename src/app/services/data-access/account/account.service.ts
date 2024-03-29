import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDto} from "../../../shared/utility/dtos/AccountDto";
import {environment} from "../../../../environments/environment";
import {PagedResult} from "../../../shared/utility/dtos/PagedResult";
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountApiUrl = `${environment.apiUrl}/account`
  constructor(
    private httpClient: HttpClient,
  ) { }

  getMe(): Observable<AccountDto>{
    return this.httpClient
      .get<AccountDto>(
        `${this.accountApiUrl}/me`,
        {responseType: "json",}
      );
  }

  getById(id: string): Observable<AccountDto>{
    return this.httpClient
      .get<AccountDto>(
        `${this.accountApiUrl}/${id}`,
        {responseType: "json",}
      );
  }

  getPicturesById(id: string, pageSize: number, pageNumber: number): Observable<PagedResult<PictureDto>>{
    return this.httpClient
      .get<PagedResult<PictureDto>>(
        `${this.accountApiUrl}/${id}/picture?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {responseType: "json",}
      );
  }

  // searchAccounts(params: HttpParams): Observable<AccountDtoPaged>{
  //   return this.httpClient
  //     .get<AccountDtoPaged>(
  //       `${environment.picturesApiUrl}/account`,
  //       {
  //         params: params,
  //         responseType: "json"
  //       },
  //     );
  // }
  //
  // deleteAccount(id: string): Observable<null> {
  //   return this.httpClient
  //     .delete<null>(
  //       `${environment.picturesApiUrl}/account/${id}`,
  //       {responseType: "json",}
  //     );
  // }


}
