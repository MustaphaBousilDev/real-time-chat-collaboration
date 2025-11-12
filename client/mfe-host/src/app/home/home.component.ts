import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  messageFromRemote: string = '';
  messageToRemote: string = '';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe(message => {
      this.messageFromRemote = message;
    });
  }

  sendMessageToRemote(): void {
    if (this.messageToRemote.trim()) {
      this.messageService.sendMessage(this.messageToRemote);
      this.messageToRemote = '';
    }
  }
}
