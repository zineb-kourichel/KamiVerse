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
  selector: 'app-kami-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './kami-list.html',
  styleUrl: './kami-list.css',
})
export class KamiList implements OnInit {
  kamiList = signal<KamiData[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private kamiService: Kami) {}

  ngOnInit(): void {
    this.kamiService.getAllKami().subscribe({
      next: (data) => {
        this.kamiList.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Could not load Kami. Is the backend running?');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  kanjiFor(name: string): string {
    return KANJI_MAP[name] ?? '神';
  }
}