import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Web3Service } from './blockchain/web3.service';
import { IPlayerDetails } from './models/playerdetails';
import { IWinnerDetails } from './models/winnerdetails';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalPlayerDetailComponent } from './modal-playerdetail/modal-playerdetail.component';
import { worker } from 'cluster';
import { ModalWinnerDetailComponent } from './modal-winnerdetail/modal-winnerdetail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  bsModalRef!: BsModalRef;
  busy = false;
  
  managerIsUser = false;
  amountForm!: UntypedFormGroup;
  amount = 0;

  manager = this.ws.getManager();

  players = this.ws.getPlayersArray();
  winners = this.ws.getWinnersArray();
  balance = this.ws.getBalance();

  playersDetails: IPlayerDetails[] = [];
  winnersDetails: IWinnerDetails[] = [];

  playersCount: number | undefined;
  winnersCount: number | undefined;
  userAccount: string | undefined;

  constructor(
    private modalService: BsModalService,
    private fb: UntypedFormBuilder,
    private ws: Web3Service
  ) {}

  async ngOnInit() {
    this.ws.managerIsUser().then((result) => {
      this.managerIsUser = result;
    });
    // const checkManagerIsUser = await this.ws.call('manager');

    // this.managerIsUser = checkManagerIsUser;
    this.amountForm = this.fb.group({
      amount: [
        0,
        [Validators.required, Validators.min(0.011), Validators.max(0.2)],
      ],
    });

    this.ws.onEvent('Enter').subscribe(async () => {
      this.playersCount = (await this.players).length;
      this.busy = false;
      this.refresh();
    });

    this.ws.onEvent('PickWinner').subscribe(async () => {
      this.winnersCount = (await this.winners).length;
      this.busy = false;
      this.refresh();
    });

    this.refresh();
  }

  async refresh() {
    this.ws.getPlayersHistory().then((result) => {
      this.playersDetails = result;
      // console.log(res);
    });
    this.ws.getWinnersHistory().then((result) => {
      this.winnersDetails = result;
      // console.log(res);
    });
    this.players = this.ws.getPlayersArray();
    this.winners = this.ws.getWinnersArray();
    this.balance = this.ws.getBalance();

    this.userAccount = await this.ws.getAccount();
    this.playersCount = (await this.players).length;
    this.winnersCount = (await this.winners).length;
  }

  submitEther() {
    this.refresh();    
    this.busy = true;
    const etherVal: number = this.amountForm.value.amount;
    this.ws.sendEther(etherVal.toString());
  }

  pickWinner() {
    this.ws.warnUser();
    this.refresh();    
    this.busy = true;
    this.ws.pickWinner();
  }

  showWinnerDetailsModal(winner: IWinnerDetails) {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Winner Details',

        id: winner.id,
        addressId: winner.addressId,
        weiReceived: winner.weiReceived,
        onDateTime: winner.onDateTime,
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalWinnerDetailComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  showPlayerDetailsModal(player: IPlayerDetails) {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Player Details',

        id: player.id,
        addressId: player.addressId,
        weiSent: player.weiSent,
        onDateTime: player.onDateTime,
        seriesId: player.seriesId,
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalPlayerDetailComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
