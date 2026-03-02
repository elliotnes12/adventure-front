import { Component, computed, effect, input, signal } from '@angular/core';
import { AppLogo } from "../app-logo/app-logo";

@Component({
  selector: 'app-loading',
  imports: [AppLogo],
  templateUrl: './loading.html',
  styleUrls: ['./loading.css'],
  standalone: true,
})
export class Loading { 


  isLoading = input.required<boolean>();
  finished = input.required<boolean>();
  dismissed = signal(false);

  showContainer = computed(() => this.isLoading() || (this.finished() && !this.dismissed()));

  constructor() {
    effect(() => {
      if (this.isLoading()) {
        this.dismissed.set(false);
      }
    });
  }

  close(): void {
    this.dismissed.set(true);
  }


}
