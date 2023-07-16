import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlockSpaceOnStartEnd} from "../../utility/regexes/blockSpaceOnStartEnd";
import {CommentService} from "../../../data-access/comment/comment.service";
import {Subscription} from "rxjs";
import {PictureCommentsService} from "../../../data-access/picture/picture-comments.service";
import {MessageService} from "primeng/api";
import {CommentDto} from "../../utility/dtos/CommentDto";
import {PutPostCommentDto} from "../../utility/dtos/PutPostCommentDto";
import {CommentDtoPaged} from "../../utility/dtos/CommentDtoPaged";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit, OnDestroy {

  constructor(
    private commentService: CommentService,
    private pictureCommentService: PictureCommentsService,
    private messageService: MessageService
  ) { }

  @Input() picId!: string;
  @Input() isLoggedOn = false;
  @Output() commentDeleted = new EventEmitter<null>();
  @Output() commentAdded = new EventEmitter<null>();
  awaitSubmit = false;
  fetchingComments = true;

  private readonly subs = new Subscription();

  commentForm = new FormGroup({
    text: new FormControl<string>(
      "",
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(250),
        Validators.pattern(BlockSpaceOnStartEnd)
      ])
  })

  comments: CommentDto[] = [];
  pageSize = 5;
  pageNumber = 1;
  moreCommentsAvailable = false;

  ngOnInit(): void {
    this.fetchComments();
  }

  deleteComment(commId: string) {
    this.subs.add(
      this.commentService.deleteComment(commId)
        .subscribe({
          next: () => {
            this.comments = this.comments.filter(c => c.id != commId);
            this.messageService.add({
              severity:'warn',
              summary:'Sukces',
              detail:'Pomyślnie usunięto komentarz!'
            });
            this.commentDeleted.emit();
          },
        })
    );
  }

  comment() {
    const postCommDto: PutPostCommentDto = {
      text: this.commentForm.getRawValue().text!
    }
    this.subs.add(
      this.pictureCommentService
        .postComment(this.picId, postCommDto)
        .subscribe({
          next: (dto: CommentDto) => {
            this.commentAdded.emit();
            this.comments.unshift(dto);
            this.commentForm.reset();
            this.messageService.add({
              severity:'success',
              summary:'Sukces',
              detail:'Pomyślnie skomentowano!'
            });
          }
        })
    );
  }

  fetchComments() {
    this.fetchingComments = true;
    this.subs.add(
      this.pictureCommentService
        .getPictureComments(
          this.picId,
          this.pageSize,
          this.pageNumber)
        .subscribe({
          next: (resultDto: CommentDtoPaged ) => {
            resultDto.items.forEach(i => this.comments.push(i));
            this.pageNumber = resultDto.page+1;
            this.moreCommentsAvailable = resultDto.totalPages > resultDto.page;
          },
          complete: () => {
            this.fetchingComments = false;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
