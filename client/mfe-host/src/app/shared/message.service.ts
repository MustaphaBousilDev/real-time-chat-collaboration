import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string>('No message yet');
  public message$: Observable<string> = this.messageSubject.asObservable();

  constructor() { }

  sendMessage(message: string): void {
    this.messageSubject.next(message);
    console.log('Message sent from host:', message);
  }

  getMessage(): string {
    return this.messageSubject.value;
  }
}
