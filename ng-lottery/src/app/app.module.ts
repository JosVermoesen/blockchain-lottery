import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Web3Service } from './blockchain/web3.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AppComponent],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [Web3Service, BsModalRef],
  bootstrap: [AppComponent],
})
export class AppModule {}
