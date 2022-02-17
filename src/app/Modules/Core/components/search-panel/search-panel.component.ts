import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { HttpParamsServiceService } from 'src/app/Services/http/http-params-service.service';
import {SortSearchBy} from "../../../../Enums/SortSearchBy";
import {SortSearch} from "../../../../Enums/SortSearch";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @ViewChild('paginatorTop') paginator: any;
  form!: FormGroup;
  @Output() searchAccEvent = new EventEmitter;
  @Output() searchPicEvent = new EventEmitter;
  @Output() resetSearchEvent = new EventEmitter;

  constructor(
    private httpService: HttpServiceService,
    private params: HttpParamsServiceService,
    private router: Router
  ) {
    this.form = new FormGroup({
      lookFor: new FormControl({
        value: 0,
        disabled: false
      }),
      sortBy: new FormControl({
        value: 0,
        disabled: false
      }),
      searchPhrase: new FormControl("", Validators.required),
    })
  }

  pageTop(val: any) {
    this.params.setPageNumber(val.pageIndex+1);
  }

  switchOpts(val: string) {
    if (val!=="pictures") {
      this.form.controls['sortBy'].disable();
    }
    else {
      this.form.controls['sortBy'].enable();
    }
  }

  reset() {
    this.form.controls['sortBy'].enable();
    this.form.get('lookFor')!.setValue(0);
    this.form.get('sortBy')!.setValue(0);
    this.form.get('searchPhrase')!.setValue("");
    this.resetSearchEvent.emit();
  }

  onSubmit(){
    switch (this.form.get('lookFor')?.value){

      case (SortSearch.ACCOUNTS):
        this.params.SearchQuery = {
          searchPhrase: this.form.get('searchPhrase')!.value,
          pageNumber: 1,
          pageSize: 5,
        };
        this.searchAccEvent.emit();
        break;

      case (SortSearch.PICTURES):
        this.params.SearchQuery = {
          searchPhrase: this.form.get('searchPhrase')!.value,
          sortBy: this.form.get('sortBy')!.value,
          pageNumber: 1,
          pageSize: 10,
        };
        this.searchPicEvent.emit();
        break;

    }
  }

  ngOnInit(): void {
  }

}
