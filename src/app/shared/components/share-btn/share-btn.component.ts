import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PictureDto} from "../../utility/dtos/PictureDto";
import {Observable, Observer, Subscription} from "rxjs";
import {likeStateAnimation} from "../../utility/animations/likeStateAnimation";
import {PictureLikesService} from "../../../services/api/picture/picture-likes.service";
import {AuthService} from "../../../services/api/account/auth.service";
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'pp-share-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-btn.component.html',
})
export class ShareBtnComponent {
  @Input() cssClass?: string;
  @Input({required: true}) pic!: PictureDto;
  @Output() picChange: EventEmitter<PictureDto> = new EventEmitter<PictureDto>();

  private dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogOpen, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.share(result);
      }
    });
  }

  share(option: string){
    let picUrl = `${environment.appWebUrl}/?picture=${this.pic.id}`
    switch (option) {
      case 'Telegram':
        window.open(`https://t.me/share/url?url=${picUrl}&text=Checkout this cool image on PooPosting!`);
        break;
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?url=${picUrl}&text=Checkout this cool image on PooPosting!`);
        break;
      case 'Facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${picUrl}`);
        break;
      case 'Mail':
        window.open(`mailto:test@example.com?subject=Cool Picture!&body=Checkout this cool image on PooPosting ${picUrl}`);
        break;
      case 'Copy':
        navigator.clipboard.writeText(picUrl);
        break;
      case 'Download':
        
        break;
    }
  }
}

@Component({
  selector: 'dialog-example-dialog',
  templateUrl: 'share-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})

export class DialogOpen {
  @ViewChild('scrollCont') input: ElementRef<HTMLDivElement> | undefined;
  readonly dialogRef = inject(MatDialogRef<ShareBtnComponent>);
  scrollLeft = 0;
  
  closeDialog(option?: string): void {
    this.dialogRef.close(option);
  }

  onScroll(event) {
    this.scrollLeft = (event.target as HTMLElement).scrollLeft;
  }
}
