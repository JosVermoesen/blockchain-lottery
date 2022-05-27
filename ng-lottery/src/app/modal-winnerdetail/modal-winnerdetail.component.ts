import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-winnerdetail',
  templateUrl: './modal-winnerdetail.component.html',
})
export class ModalWinnerDetailComponent {
  title!: string;
  closeBtnName!: string;
  id?: number;
  addressId?: string;
  weiReceived?: number;
  onDateTime?: string;

  constructor(public bsModalRef: BsModalRef) {}
}
