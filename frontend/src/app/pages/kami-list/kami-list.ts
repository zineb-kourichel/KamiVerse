import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Kami } from '../../services/kami';
import { KamiData } from '../../models/kami.model';

@Component({
  selector: 'app-kami-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './kami-list.html',
  styleUrl: './kami-list.css',
})
export class KamiList implements OnInit {
  kamiList: KamiData[] = [];
  loading = true;
  error = '';

  constructor(private kamiService: Kami) {}

  ngOnInit(): void {
    console.log('KamiList ngOnInit running');
    this.kamiService.getAllKami().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.kamiList = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error occurred:', err);
        this.error = 'Could not load Kami. Is the backend running?';
        this.loading = false;
        console.error(err);
      }
    });
  }
}