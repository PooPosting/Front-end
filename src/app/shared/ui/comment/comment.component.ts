import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentDto} from "../../utility/dtos/CommentDto";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment!: CommentDto;
  @Output() commentDeleted: EventEmitter<void> = new EventEmitter<void>();

  onCommentDelete() {
    this.commentDeleted.emit();
  }

}
