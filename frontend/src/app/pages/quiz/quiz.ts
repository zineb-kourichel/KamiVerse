import { Component, signal } from '@angular/core';
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

interface QuizOption {
  text: string;
  kami: string;
}

interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    text: "When storms roll in, what do you do?",
    options: [
      { text: "Charge outside to feel the power of it", kami: "Susanoo" },
      { text: "Watch calmly from a safe, dry place", kami: "Fujin" },
      { text: "Light a candle and wait for it to pass", kami: "Amaterasu" },
      { text: "Pray it brings a good harvest", kami: "Inari" },
    ]
  },
  {
    text: "What's your ideal weekend?",
    options: [
      { text: "A deep-sea fishing trip", kami: "Ebisu" },
      { text: "A quiet walk under the full moon", kami: "Tsukuyomi" },
      { text: "Visiting an ancient shrine", kami: "Izanagi" },
      { text: "Training or competing in something physical", kami: "Hachiman" },
    ]
  },
  {
    text: "Pick a role in a group project.",
    options: [
      { text: "The one who takes charge, loudly", kami: "Susanoo" },
      { text: "The quiet strategist working behind the scenes", kami: "Tsukuyomi" },
      { text: "The one who keeps everyone's spirits up", kami: "Ebisu" },
      { text: "The dependable one everyone trusts", kami: "Hachiman" },
    ]
  },
  {
    text: "Choose a season.",
    options: [
      { text: "Summer, full of light and energy", kami: "Amaterasu" },
      { text: "Harvest season, abundance and gratitude", kami: "Inari" },
      { text: "A thunderstorm night in early autumn", kami: "Raijin" },
      { text: "A windswept, crisp winter day", kami: "Fujin" },
    ]
  },
  {
    text: "What matters most to you?",
    options: [
      { text: "Order and doing things the right way", kami: "Izanami" },
      { text: "Creating something lasting", kami: "Izanagi" },
      { text: "Protecting the people you love", kami: "Hachiman" },
      { text: "Bringing good fortune to others", kami: "Ebisu" },
    ]
  },
  {
    text: "Pick a symbol.",
    options: [
      { text: "A mirror", kami: "Amaterasu" },
      { text: "A sword", kami: "Susanoo" },
      { text: "A fox", kami: "Inari" },
      { text: "A thunder drum", kami: "Raijin" },
    ]
  },
  {
    text: "How do people come to you for help?",
    options: [
      { text: "For courage before a big challenge", kami: "Hachiman" },
      { text: "For calm and quiet advice", kami: "Tsukuyomi" },
      { text: "For luck before something risky", kami: "Ebisu" },
      { text: "For a blessing on a new beginning", kami: "Izanagi" },
    ]
  },
  {
    text: "If you disappeared for a while, what would happen?",
    options: [
      { text: "Everything would go dark without me", kami: "Amaterasu" },
      { text: "People would quietly worry, then move on", kami: "Izanami" },
      { text: "The wind would stop and the air would go still", kami: "Fujin" },
      { text: "The thunder would go silent", kami: "Raijin" },
    ]
  },
];

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz {
  questions = QUESTIONS;
  currentIndex = signal(0);
  scores: Record<string, number> = {};
  finished = signal(false);
  result = signal<KamiData | null>(null);
  loadingResult = signal(false);

  constructor(private kamiService: Kami) {}

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentIndex()];
  }

  get progress(): number {
    return Math.round((this.currentIndex() / this.questions.length) * 100);
  }

  answer(kami: string): void {
    this.scores[kami] = (this.scores[kami] ?? 0) + 1;

    if (this.currentIndex() < this.questions.length - 1) {
      this.currentIndex.set(this.currentIndex() + 1);
    } else {
      this.showResult();
    }
  }

  showResult(): void {
    const winner = Object.entries(this.scores).sort((a, b) => b[1] - a[1])[0][0];

    this.loadingResult.set(true);
    this.kamiService.getAllKami().subscribe({
      next: (data) => {
        const match = data.find(k => k.name === winner) ?? null;
        this.result.set(match);
        this.finished.set(true);
        this.loadingResult.set(false);
      },
      error: () => {
        this.loadingResult.set(false);
        this.finished.set(true);
      }
    });
  }

  restart(): void {
    this.currentIndex.set(0);
    this.scores = {};
    this.finished.set(false);
    this.result.set(null);
  }

  kanjiFor(name: string): string {
    return KANJI_MAP[name] ?? '神';
  }
}