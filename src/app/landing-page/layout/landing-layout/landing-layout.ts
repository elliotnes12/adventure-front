import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'landing-layout',
  imports: [RouterOutlet],
  templateUrl: './landing-layout.html',
  styleUrls: ['./landing-layout.css'],
  standalone: true,
})
export class LandingLayout { }
