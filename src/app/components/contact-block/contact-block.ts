import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';

interface ScheduleEntry {
  day: string;
  hours: string;
}

type TransitionState = 'idle' | 'fading-out' | 'fading-in';

@Component({
  selector: 'contact-block',
  imports: [],
  templateUrl: './contact-block.html',
  styleUrl: './contact-block.css',
})
export class ContactBlock implements OnInit, OnDestroy {
  @Input() label!: string;
  @Input() scheduleEntries: ScheduleEntry[] = [];
  @Input() address!: string;
  @Input() phone!: string;
  @Input() email!: string;
  @Input() notes!: string;
  @Input() ctaLabel!: string;
  @Input() ctaUrl: string | null = null;
  @Input() images: string[] = [];
  @Input() rotationStartDelayMs: number = 5000;

  activeImageIndex = signal(0);
  leavingImageIndex = signal<number | null>(null);
  transitionState = signal<TransitionState>('idle');
  loadedImages = signal<Record<string, boolean>>({});

  private readonly imageInterval = 5000;
  private readonly fadeOutDuration = 450;
  private readonly fadeInDuration = 450;

  private rotationInterval: ReturnType<typeof setInterval> | null = null;
  private startDelayTimeout: ReturnType<typeof setTimeout> | null = null;
  private phaseTimeout: ReturnType<typeof setTimeout> | null = null;
  private isTransitioning = false;

  ngOnInit(): void {
    this.startImageRotation();
  }

  private startImageRotation(): void {
    if (this.images.length <= 1) return;

    const startDelay = this.normalizeDelay(this.rotationStartDelayMs);

    this.startDelayTimeout = setTimeout(() => {
      this.transitionToNextImage();
      this.rotationInterval = setInterval(() => {
        this.transitionToNextImage();
      }, this.imageInterval);
      this.startDelayTimeout = null;
    }, startDelay);
  }

  private normalizeDelay(delayInMs: number): number {
    if (!Number.isFinite(delayInMs) || delayInMs < 0) {
      return 0;
    }

    return Math.floor(delayInMs);
  }

  isActiveImage(index: number): boolean {
    return this.transitionState() === 'idle' && this.activeImageIndex() === index;
  }

  isLeavingImage(index: number): boolean {
    return this.transitionState() === 'fading-out' && this.leavingImageIndex() === index;
  }

  isEnteringImage(index: number): boolean {
    return this.transitionState() === 'fading-in' && this.activeImageIndex() === index;
  }

  isImageLoaded(imagePath: string): boolean {
    return this.loadedImages()[imagePath] === true;
  }

  onImageLoad(imagePath: string): void {
    this.loadedImages.update((loadedImages) => ({
      ...loadedImages,
      [imagePath]: true,
    }));
  }

  onCtaClick(): void {
    if (!this.ctaUrl) {
      return;
    }

    if (typeof window !== 'undefined') {
      window.open(this.ctaUrl, '_blank', 'noopener,noreferrer');
    }
  }

  private transitionToNextImage(): void {
    if (this.images.length <= 1 || this.isTransitioning) return;

    const currentIndex = this.activeImageIndex();
    const nextIndex = (currentIndex + 1) % this.images.length;

    this.isTransitioning = true;
    this.leavingImageIndex.set(currentIndex);
    this.transitionState.set('fading-out');

    this.phaseTimeout = setTimeout(() => {
      this.activeImageIndex.set(nextIndex);
      this.transitionState.set('fading-in');

      this.phaseTimeout = setTimeout(() => {
        this.leavingImageIndex.set(null);
        this.transitionState.set('idle');
        this.isTransitioning = false;
        this.phaseTimeout = null;
      }, this.fadeInDuration);
    }, this.fadeOutDuration);
  }

  private clearTimers(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
    if (this.startDelayTimeout) {
      clearTimeout(this.startDelayTimeout);
      this.startDelayTimeout = null;
    }
    if (this.phaseTimeout) {
      clearTimeout(this.phaseTimeout);
      this.phaseTimeout = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }
}
