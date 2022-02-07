import { NgModule } from '@angular/core';
import {ChipsModule} from "primeng/chips";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {InputMaskModule} from "primeng/inputmask";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";
import {AccordionModule} from "primeng/accordion";

const PrimeNgComponents = [
  ChipsModule,
  RippleModule,
  InputTextModule,
  ButtonModule,
  PasswordModule,
  InputMaskModule,
  FileUploadModule,
  InputTextareaModule,
  CardModule,
  AccordionModule
]

@NgModule({
  declarations: [],
  imports: [
    PrimeNgComponents
  ],
  exports: [
    PrimeNgComponents
  ]
})
export class PrimeNgModule { }
