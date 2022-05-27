import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-playerdetail',
  templateUrl: './modal-playerdetail.component.html',
})
export class ModalPlayerDetailComponent {
  title!: string;
  closeBtnName!: string;
  id?: number;
  addressId?: string;
  weiSent?: number;
  onDateTime?: string;
  seriesId?: number;

  constructor(public bsModalRef: BsModalRef) {}
}
