import {Component,Input} from '@angular/core';
import {AccountDto} from "../../../../shared/utility/dtos/AccountDto";

@Component({
  selector: 'app-account-banner',
  templateUrl: './account-banner.component.html',
  styleUrls: ['./account-banner.component.scss']
})
export class AccountBannerComponent {

  @Input() account!: AccountDto;

}
