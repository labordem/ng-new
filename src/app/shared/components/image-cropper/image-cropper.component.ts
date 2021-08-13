import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  base64ToFile,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';

export interface ImageCrop {
  base64: string;
  file: File;
}

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropperComponent implements OnInit {
  @Input() originalFile!: File;
  @Input() aspectRatio = 1 / 1;
  @Input() isRoundPreview = false;
  @Output() readonly crop: EventEmitter<ImageCrop> = new EventEmitter();

  format: 'png' | 'jpeg' = 'png';
  croppedBase64Image?: string = undefined;
  fileToReturn?: File = undefined;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    const crop = {
      base64: this.croppedBase64Image as string,
      file: this.fileToReturn as File,
    };
    this.crop.emit(crop);
  }

  onImageLoaded(image: LoadedImage): void {}

  onCropperReady(): void {}

  onImageCropped(event: ImageCroppedEvent): void {
    const base64 = event?.base64 ?? '';
    const filename = this.originalFile.name;
    const format = filename.split('.').pop() === 'png' ? 'png' : 'jpeg';
    const blob = base64ToFile(base64);
    const file = new File([blob], filename, { type: `image/${format}` });

    this.format = format;
    this.croppedBase64Image = base64;
    this.fileToReturn = file;
  }

  onLoadImageFailed(): void {}
}
