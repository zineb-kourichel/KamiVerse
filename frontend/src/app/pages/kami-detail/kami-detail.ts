import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Kami } from '../../services/kami';
import { KamiData } from '../../models/kami.model';

const KANJI_MAP: Record<string, string> = {
  'Amaterasu': '天照',
  'Susanoo': '須佐之男',
  'Tsukuyomi': '月読',
  'Izanagi': '伊邪那岐',
  'Izanami': '伊邪那美',
  'Inari': '稲荷',
  'Hachiman': '八幡',
  'Raijin': '雷神',
  'Fujin': '風神',
  'Ebisu': '恵比寿'
};

@Component({
  selector: 'app-kami-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './kami-detail.html',
  styleUrl: './kami-detail.css',
})
export class KamiDetail implements OnInit {
  kami = signal<KamiData | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private kamiService: Kami
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kamiService.getKami(id).subscribe({
      next: (data) => {
        this.kami.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Kami not found.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  kanjiFor(name: string): string {
    return KANJI_MAP[name] ?? '神';
  }
}