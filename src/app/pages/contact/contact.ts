import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit, OnDestroy {
  readonly languageService = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('medicalImageContainer')
  private medicalImageContainer?: ElementRef<HTMLElement>;

  @ViewChild('medicalFigure')
  private medicalFigure?: ElementRef<HTMLElement>;

  imageContainerHeight?: number;
  private fullImageHeight = 0;
  private minImageHeight = 0;
  private targetImageContainerHeight = 0;
  private currentImageContainerHeight = 0;
  private animationFrameId?: number;

  private readonly visibleStartRatio = 0.7;
  private readonly minHeightRatio = 0.45;
  private readonly smoothFactor = 0.16;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.recalculateImageHeights();
    this.updateImageContainerHeight(true);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.animationFrameId !== undefined) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  onMedicalImageLoad(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.recalculateImageHeights();
    this.updateImageContainerHeight(true);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateImageContainerHeight();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.recalculateImageHeights();
    this.updateImageContainerHeight(true);
  }

  private recalculateImageHeights(): void {
    const figure = this.medicalFigure?.nativeElement;
    const measuredHeight = figure ? Math.round(figure.getBoundingClientRect().height) : 0;

    if (measuredHeight > 0) {
      this.fullImageHeight = measuredHeight;
    } else {
      const viewportHeight = window.innerHeight;
      this.fullImageHeight = this.clamp(viewportHeight * 0.62, 320, 500);
    }

    this.minImageHeight = Math.max(Math.round(this.fullImageHeight * this.minHeightRatio), 180);
  }

  private updateImageContainerHeight(immediate = false): void {
    const container = this.medicalImageContainer?.nativeElement;

    if (!container || this.fullImageHeight <= this.minImageHeight) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const startTop = viewportHeight - this.fullImageHeight * this.visibleStartRatio;
    const endTop = -this.fullImageHeight * 0.55;
    const progress = this.clamp((startTop - rect.top) / (startTop - endTop), 0, 1);
    const easedProgress = this.easeInOutCubic(progress);

    this.targetImageContainerHeight =
      this.fullImageHeight - (this.fullImageHeight - this.minImageHeight) * easedProgress;

    if (this.imageContainerHeight === undefined || immediate) {
      this.currentImageContainerHeight = this.targetImageContainerHeight;
      this.imageContainerHeight = Math.round(this.targetImageContainerHeight);
      return;
    }

    this.startHeightAnimation();
  }

  private startHeightAnimation(): void {
    if (this.animationFrameId !== undefined) {
      return;
    }

    const animate = (): void => {
      const delta = this.targetImageContainerHeight - this.currentImageContainerHeight;

      if (Math.abs(delta) < 0.5) {
        this.currentImageContainerHeight = this.targetImageContainerHeight;
        this.imageContainerHeight = Math.round(this.currentImageContainerHeight);
        this.animationFrameId = undefined;
        return;
      }

      this.currentImageContainerHeight += delta * this.smoothFactor;
      this.imageContainerHeight = Math.round(this.currentImageContainerHeight);
      this.animationFrameId = window.requestAnimationFrame(animate);
    };

    this.animationFrameId = window.requestAnimationFrame(animate);
  }

  private easeInOutCubic(value: number): number {
    return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
