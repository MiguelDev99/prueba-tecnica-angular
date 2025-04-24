import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  @Input() message = '';
  visible = false;

  show(message: string) {
    this.message = message;
    this.visible = true;
    setTimeout(() => this.visible = false, 3000);
  }
}
