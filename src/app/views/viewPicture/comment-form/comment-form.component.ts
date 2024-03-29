import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";
import {CommentDto} from "../../../shared/utility/dtos/CommentDto";
import {AuthService} from "../../../services/data-access/account/auth.service";
import {CommentService} from "../../../services/data-access/comment/comment.service";
import {FormsModule} from "@angular/forms";
import {BehaviorSubject, Subject, switchMap} from "rxjs";
import {fadeInOutAnimation} from "../../../shared/utility/animations/fadeInOutAnimation";

@Component({
  selector: 'pp-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.component.html',
  animations: [fadeInOutAnimation]
})
export class CommentFormComponent implements OnInit {
  @Input({required: true}) pic!: PictureDto;
  @Output() commentAdded: EventEmitter<CommentDto> = new EventEmitter<CommentDto>();

  commentText: string = '';
  awaitSubmit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private commentSubject = new Subject<string>();
  private authService = inject(AuthService);
  private commentService = inject(CommentService);

  get isLoggedOn() {
    return this.authService.isLoggedIn;
  }

  ngOnInit() {
    this.commentSubject.pipe(
      switchMap(commentText => this.handleCommentRequest(commentText))
    ).subscribe((addedComment: CommentDto) => {
      this.awaitSubmit.next(false);
      this.commentAdded.emit(addedComment);
      this.commentText = '';
    });
  }

  private handleCommentRequest(commentText: string) {
    return this.commentService.addComment(this.pic.id, { text: commentText } as CommentDto);
  }

  comment() {
    this.awaitSubmit.next(true);
    this.commentSubject.next(this.commentText);
  }

}

