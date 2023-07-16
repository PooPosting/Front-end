import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {PopularService} from "../../../../data-access/popular/popular.service";
import {PopularDto} from "../../../../shared/utility/dtos/PopularDto";
import {SelectOption} from "../../../../shared/utility/models/selectOption";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  popular: PopularDto = {
    mostCommentedPictures: [],
    mostLikedPictures: [],
    mostVotedPictures: [],
    mostLikedAccounts: [],
    mostPostedAccounts: [],
  };
  selectOptions: SelectOption[];
  selectValue: SelectOption;
  accountOptions: SelectOption[];
  accountValue: SelectOption;
  pictureOptions: SelectOption[];
  pictureValue: SelectOption;

  responsiveOptions = [
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private popularService: PopularService,
  ) {
    this.selectOptions = [
      { name: "Obrazki", class: "bi bi-image-fill"},
      { name: "Konta", class: "bi bi-person-fill"},
    ];
    this.selectValue = this.selectOptions[0];
    this.accountOptions = [
      { name: "Lajków", class: "bi bi-hand-thumbs-up"},
      { name: "Postów", class: "bi bi-graph-up-arrow"},
    ]
    this.accountValue = this.accountOptions[0];
    this.pictureOptions = [
      { name: "Komentowane", class: "bi bi-chat-right-text"},
      { name: "Lajkowane", class: "bi bi-hand-thumbs-up"},
      { name: "Oceniane", class: "bi bi-star"},
    ]
    this.pictureValue = this.pictureOptions[1];
  }

  ngOnInit(): void {
    const sub: Subscription = this.popularService.getPopularPictures().subscribe({
      next: (val: PopularDto) => {
        this.popular = val;
      },
      complete: () => {
        sub.unsubscribe();
        console.log("unsubscribed instantly");
      }

    });
  }

}