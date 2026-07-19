import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featured = signal<KamiData[]>([]);
  loading = signal(true);

  constructor(private kamiService: Kami) {}

  ngOnInit(): void {
    this.kamiService.getAllKami().subscribe({
      next: (data) => {
        // dedupe by name, then take the first 3
        const seen = new Set<string>();
        const unique = data.filter(k => {
          if (seen.has(k.name)) return false;
          seen.add(k.name);
          return true;
        });
        this.featured.set(unique.slice(0, 3));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  kanjiFor(name: string): string {
    return KANJI_MAP[name] ?? '神';
  }
}