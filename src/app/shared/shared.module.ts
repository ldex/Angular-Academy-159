import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AdminComponent } from './admin.component';
import { ContactComponent } from './contact.component';
import { ErrorComponent } from './error.component';
import { ComposeMessageComponent } from './compose-message.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    ContactComponent,
    ErrorComponent,
    ComposeMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule    
  ]
})
export class SharedModule { }
