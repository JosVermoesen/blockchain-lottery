import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Web3 } from 'web3';

import { IPlayerDetails } from '../models/playerdetails';
import { IWinnerDetails } from '../models/winnerdetails';

import contractAbi from './lotteryABI.json';

declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private isBusySource = new BehaviorSubject<boolean | null>(false);
  isBusy$ = this.isBusySource.asObservable();

  private web3 = new Web3(window.ethereum);
  private contract!: any;
  private contractAddress = '0x369e5eb4b99b51FD06DDE434beE2475e373f1c5A';

  constructor(private zone: NgZone) {
    if (window.web3) {
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .catch((err: any) => {
          // console.log(err);
          alert(err);
        });
    } else {
      alert(
        'Metamask not found. Install or enable Metamask. Be sure to run Sepolia test network'
      );
    }
  }

  setBusy(isBusy: boolean) {
    this.isBusySource.next(isBusy);
  }

  getBusy() {
    return this.isBusySource.value;
  }

  onEvent(name: string) {
    return this.onEvents(name);
  }

  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || '');
  }

  async getManager(): Promise<any> {
    const manager = await this.call('manager');
    return manager;
  }

  async getPlayersArray(): Promise<[]> {
    const totalPlayers = await this.call('getPlayersArray');
    return totalPlayers;
  }

  async getWinnersArray(): Promise<[]> {
    const totalWinners = await this.call('getWinnersArray');
    return totalWinners;
  }

  async getPlayersHistory(): Promise<IPlayerDetails[]> {
    const playersHistory: IPlayerDetails[] = [];
    const totalPlayers = await this.call('getPlayersHistory');

    for (let i = 0; i < totalPlayers; i++) {
      const playerRaw = await this.call('getPlayerDetails', i);
      const playerNormalized = this.normalizePlayer(playerRaw);

      playersHistory.push(playerNormalized);
    }
    return playersHistory;
  }

  normalizePlayer(playerRaw: any): IPlayerDetails {
    return {
      id: parseInt(playerRaw[0]),
      addressId: playerRaw[1],
      weiSent: playerRaw[2],
      seriesId: parseInt(playerRaw[3]),
      onDateTime: playerRaw[4],
    };
  }

  async getWinnersHistory(): Promise<IWinnerDetails[]> {
    const winnersHistory: IWinnerDetails[] = [];
    const totalWinners = await this.call('getWinnersHistory');

    for (let i = 0; i < totalWinners; i++) {
      const winnerRaw = await this.call('getWinnerDetails', i);
      const winnerNormalized = this.normalizeWinner(winnerRaw);

      winnersHistory.push(winnerNormalized);
    }
    return winnersHistory;
  }

  normalizeWinner(winnerRaw: any): IWinnerDetails {
    return {
      id: parseInt(winnerRaw[0]),
      addressId: winnerRaw[1],
      weiReceived: winnerRaw[2],
      onDateTime: winnerRaw[3],
    };
  }

  async getBalance(): Promise<string> {
    const balance = this.web3.eth.getBalance(this.contract.options.address);
    const either = this.web3.utils.fromWei(await balance, 'ether');
    return either;
  }

  async sendEther(amount: string) {
    this.setBusy(true);

    const acc = await this.getAccount();
    try {
      await this.contract.methods.enter().send({
        from: acc,
        value: this.web3.utils.toWei(amount, 'ether'),
      });
      this.setBusy(false);
    } catch (error) {
      alert(error);
      this.setBusy(false);
    }
  }

  async managerIsUser(): Promise<boolean> {
    const manager = await this.call('manager');
    const acc = await this.getAccount();

    if (manager == acc) {
      return true;
    } else {
      return false;
    }
  }

  async warnUser(): Promise<any> {
    const manager = await this.call('manager');
    const acc = await this.getAccount();
    if (manager == acc) {
      return true;
    } else {
      alert(
        'Sorry, only the manager can pick a winner! You will get an error message. Please cancel Metamask and refresh your browser to continue...'
      );
      return false;
    }
  }

  async pickWinner() {
    const acc = await this.getAccount();
    const managerIsUser = await this.call('manager');
    if (!managerIsUser) {
      alert(
        'Sorry, only the manager can pick a winner! You will get an error message. Please cancel Metamask and refresh your browser to continue...'
      );
    }

    try {
      this.setBusy(true);
      await this.contract.methods.pickWinner().send({
        from: acc,
      });
      this.setBusy(false);
    } catch (error) {
      alert(error);
      this.setBusy(false);
    }
  }

  async call(fnName: string, ...args: any[]) {
    const acc = await this.getAccount();

    return this.contract.methods[fnName](...args).call({ from: acc });
  }

  async getPlayerDetails(index: number): Promise<IPlayerDetails> {
    const playerRaw = await this.call('getPlayerDetails', index);
    const playerNormalized = this.normalizePlayer(playerRaw);

    return playerNormalized;
  }

  async getWinnerDetail(index: number): Promise<IWinnerDetails> {
    const winnerRaw = await this.call('getWinnerDetails', index);
    const winnerNormalized = this.normalizeWinner(winnerRaw);

    return winnerNormalized;
  }

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on(
        'data',
        (data: { event: any; returnValues: any }) => {
          // THIS MUST RUN INSIDE ANGULAR ZONE AS IT'S LISTENING FOR 'ON'
          this.zone.run(() => {
            observer.next({
              event: data.event,
              payload: data.returnValues,
            });
          });
        }
      );
    });
  }
}
