import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpParamsServiceService} from "./http-params-service.service";
import { PictureDto } from 'src/app/shared/utils/dtos/PictureDto';
import { PictureDtoPaged } from 'src/app/shared/utils/dtos/PictureDtoPaged';
import { UserState } from 'src/app/shared/utils/models/userState';
import {LikeDto} from "../utils/dtos/LikeDto";
import {AccountDtoPaged} from "../utils/dtos/AccountDtoPaged";
import {AccountDto} from "../utils/dtos/AccountDto";
import { CommentDto } from "../utils/dtos/CommentDto";
import {PutPostCommentDto} from "../utils/dtos/PutPostCommentDto";
import {PopularDto} from "../utils/dtos/PopularDto";
import {VerifyJwtDto} from "../utils/dtos/VerifyJwtDto";
import {PostLogsDto} from "../utils/dtos/PostLogsDto";
import {PictureClassificationDto} from "../utils/dtos/PictureClassificationDto";
import {environment} from "../../../environments/environment";
import {UpdatePictureNameDto} from "../utils/dtos/UpdatePictureNameDto";
import {UpdatePictureDescriptionDto} from "../utils/dtos/UpdatePictureDescriptionDto";
import {UpdatePictureTagsDto} from "../utils/dtos/UpdatePictureTagsDto";
import {UpdateAccountEmailDto} from "../utils/dtos/UpdateAccountEmailDto";
import {UpdateAccountPasswordDto} from "../utils/dtos/UpdateAccountPasswordDto";
import {UpdateAccountDescriptionDto} from "../utils/dtos/UpdateAccountDescriptionDto";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(
    private http: HttpClient,
    private params: HttpParamsServiceService
  ) {}

  getPicturesRequest(params: HttpParams): Observable<PictureDtoPaged>{
    return this.http
      .get<PictureDtoPaged>(
      `${environment.picturesApiUrl}/picture`,
      {params: params}
    );
  }
  getPersonalizedPicturesRequest(): Observable<PictureDto[]>{
    return this.http
      .get<PictureDto[]>(
        `${environment.picturesApiUrl}/picture/personalized`,
        {params: this.params.getGetPersonalizedPicParams()}
      );
  }
  searchPicturesRequest(): Observable<PictureDtoPaged>{
    return this.http
      .get<PictureDtoPaged>(
        `${environment.picturesApiUrl}/picture/search`,
        {params: this.params.getSearchPicParams()}
      );
  }

  getPictureRequest(id?: string): Observable<PictureDto>{
    return this.http
      .get<PictureDto>(
      `${environment.picturesApiUrl}/picture/${id}`
    );
  }
  getPictureLikesRequest(id?: string): Observable<LikeDto[]>{
    return this.http
      .get<LikeDto[]>(
        `${environment.picturesApiUrl}/picture/${id}/like`
      );
  }
  searchAccountsRequest(): Observable<AccountDtoPaged>{
    return this.http
      .get<AccountDtoPaged>(
        `${environment.picturesApiUrl}/account`,
        {params: this.params.getSearchAccParams()}
      );
  }
  getAccountRequest(id: string): Observable<AccountDto>{
    return this.http
      .get<AccountDto>(
        `${environment.picturesApiUrl}/account/${id}`
      );
  }
  getAccountLikesRequest(id?: string): Observable<LikeDto[]>{
    return this.http
      .get<LikeDto[]>(
        `${environment.picturesApiUrl}/account/${id}/likes`
      );
  }
  getPopularRequest(): Observable<PopularDto> {
    return this.http
      .get<PopularDto>(
        `${environment.picturesApiUrl}/popular`
      );
  }
  postLsLoginRequest(data: VerifyJwtDto): Observable<UserState> {
    return this.http
      .post<UserState>(
        `${environment.picturesApiUrl}/account/auth/verifyJwt`,
        data,
        {responseType: "json",});
  }
  postPictureRequest(data: FormData): Observable<any> {
    return this.http
      .post(
        `${environment.picturesApiUrl}/picture/post`,
        data
      );
  }
  postClassifyPictureRequest(data: FormData): Observable<PictureClassificationDto> {
    return this.http
      .post<PictureClassificationDto>(
        `${environment.picturesApiUrl}/picture/classify`,
        data
      );
  }
  postCommentRequest(picId: string, data: PutPostCommentDto): Observable<CommentDto> {
    return this.http
      .post<CommentDto>(
        `${environment.picturesApiUrl}/picture/${picId}/comment`,
        data
      );
  }

  deleteCommentRequest(picId: string, commId: string): Observable<CommentDto> {
    return this.http
      .delete<CommentDto>(
        `${environment.picturesApiUrl}/picture/${picId}/comment/${commId}`,
        {}
      );
  }

  postSendLogsRequest(data: PostLogsDto) {
    return this.http
      .post<boolean>(
        `${environment.emailApiUrl}/contact/sendErrorEmail`,
        data
      )
  }
  postCheckEmailSendingAvailability() {
    return this.http
      .post<boolean>(
        `${environment.emailApiUrl}/contact/check`,
        {}
      )
  }

  deletePictureRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${environment.picturesApiUrl}/picture/${id}`
      );
  }
  deleteAccountRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${environment.picturesApiUrl}/account/${id}`
      );
  }

  patchPictureLikeRequest(id: string): Observable<PictureDto> {
    return this.http
      .patch<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/vote-up`,
        {}
      );
  }
  patchPictureDislikeRequest(id: string): Observable<PictureDto> {
    return this.http
      .patch<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/vote-down`,
        {}
      );
  }

  updatePictureRequest(data: FormData, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}`,
        data
      );
  }

  updatePictureNameRequest(data: UpdatePictureNameDto, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/name`,
        data
      );
  }

  updatePictureDescriptionRequest(data: UpdatePictureDescriptionDto, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/description`,
        data
      );
  }

  updatePictureTagsRequest(data: UpdatePictureTagsDto, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/tags`,
        data
      );
  }

  updateAccountRequest(data: FormData) {
    return this.http
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update`,
        data
      );
  }

  updateAccountEmailRequest(data: UpdateAccountEmailDto) {
    return this.http
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update/email`,
        data
      );
  }

  updateAccountPasswordRequest(data: UpdateAccountPasswordDto) {
    return this.http
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update/password`,
        data
      );
  }

  updateAccountDescriptionRequest(data: UpdateAccountDescriptionDto) {
    return this.http
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/description`,
        data
      );
  }

  updateAccountProfilePictureRequest(file: string) {
    return this.http
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/profile-picture`,
        file
      );
  }

  updateAccountBackgroundPictureRequest(file: string) {
    return this.http
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/background-picture`,
        file
      );
  }

}
