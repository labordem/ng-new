import { Directive, HostBinding, HostListener, Input } from '@angular/core';

/**
 * Replace undefined/unreachable image by a default one
 * and add 'image-loaded' css class when image is loaded
 *
 * Usage :
 * <img src="yourSource" default="avatar" .../>
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'img[default]',
})
export class ImageDefaultDirective {
  @Input() default!: 'profile' | 'landscape';
  @HostBinding('src') @Input() src?: string;

  @HostListener('error') onError(): void {
    const isSourceFilled = this.src !== undefined && this.src !== '';
    this.src = isSourceFilled
      ? `assets/images/default_broken.jpg`
      : `assets/images/default_${this.default}.jpg`;
  }
}
