import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Kami } from '../../services/kami';
import { KamiData } from '../../models/kami.model';

@Component({
  selector: 'app-kami-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './kami-detail.html',
  styleUrl: './kami-detail.css',
})
export class KamiDetail implements OnInit {
  kami: KamiData | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private kamiService: Kami
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kamiService.getKami(id).subscribe({
      next: (data) => {
        this.kami = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Kami not found.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}