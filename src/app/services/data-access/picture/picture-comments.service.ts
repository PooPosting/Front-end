// import { Injectable } from '@angular/core';
// import {HttpClient, HttpParams} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {environment} from "../../../environments/environment";
// import {CommentDtoPaged} from "../../shared/utility/dtos/CommentDtoPaged";
// import {PutPostCommentDto} from "../../shared/utility/dtos/PutPostCommentDto";
// import {CommentDto} from "../../shared/utility/dtos/CommentDto";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class PictureCommentsService {
//
//   constructor(
//     private httpClient: HttpClient
//   ) { }
//
//   getPictureComments(picId: string, pageSize: number, pageNumber: number): Observable<CommentDtoPaged> {
//     return this.httpClient
//       .get<CommentDtoPaged>(
//         `${environment.picturesApiUrl}/picture/${picId}/comment`,
//         {
//           params: new HttpParams()
//             .set("PageSize", pageSize)
//             .set("PageNumber", pageNumber),
//           responseType: "json"
//         },
//       );
//   }
//   postComment(picId: string, data: PutPostCommentDto): Observable<CommentDto> {
//     return this.httpClient
//       .post<CommentDto>(
//         `${environment.picturesApiUrl}/picture/${picId}/comment`,
//         data,
//         { responseType: "json" },
//       );
//   }
//
// }
