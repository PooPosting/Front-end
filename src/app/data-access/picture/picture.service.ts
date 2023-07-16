import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PictureDto} from "../../shared/utility/dtos/PictureDto";
import {PictureDtoPaged} from "../../shared/utility/dtos/PictureDtoPaged";

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPictureById(id: string): Observable<PictureDto>{
    return this.httpClient
      .get<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}`,
        { responseType: "json" }
      );
  }
  getPictures(pageSize: number, pageNumber: number): Observable<PictureDtoPaged>{
    return this.httpClient
      .get<PictureDtoPaged>(
        `${environment.picturesApiUrl}/picture`,
        {
          responseType: "json",
          params: new HttpParams()
            .set("PageSize", pageSize)
            .set("PageNumber", pageNumber)
        }
      );
  }
  getPersonalizedPictures(pageSize: number): Observable<PictureDtoPaged>{
    return this.httpClient
      .get<PictureDtoPaged>(
        `${environment.picturesApiUrl}/picture/personalized`,
        {
          responseType: "json",
          params: new HttpParams()
            .set("PageSize", pageSize)
        }
      );
  }
  searchPictures(pageSize: number, pageNumber: number, searchPhrase: string): Observable<PictureDtoPaged>{
    return this.httpClient
      .get<PictureDtoPaged>(
        `${environment.picturesApiUrl}/picture/search`,
        {
          responseType: "json",
          params: new HttpParams()
            .set("PageSize", pageSize)
            .set("PageNumber", pageNumber)
            .set("SearchPhrase", searchPhrase)
        }
      );
  }

  postPicture(dto: FormData): Observable<any> {
    return this.httpClient
      .post(
        `${environment.picturesApiUrl}/picture/post`,
        dto,
    { responseType: "json" }
      );
  }

  deletePicture(id: string): Observable<null>{
    return this.httpClient
      .delete<null>(
        `${environment.picturesApiUrl}/picture/${id}`,
        { responseType: "json" }
      );
  }


}