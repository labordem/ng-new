import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-file-upload-zone',
  templateUrl: './file-upload-zone.component.html',
  styleUrls: ['./file-upload-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadZoneComponent implements OnInit {
  @Input() isMultiple = false;
  @Input() acceptedFiles: 'image/*' = 'image/*';

  @Output() readonly filesUpload = new EventEmitter<File[]>();
  files: File[] = [];
  previews: string[] = [];

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  async onFilesImport(event: Event): Promise<void> {
    const importedFiles = this.getFilesFromEvent(event);
    const previewsPromises = importedFiles.map((file) =>
      this.getImageStringFromFile(file),
    );
    const importedFilesPreviews = await Promise.all(previewsPromises);
    if (this.isMultiple) {
      this.files.push(...importedFiles);
      this.previews.push(...importedFilesPreviews);
    } else {
      this.files = importedFiles;
      this.previews = importedFilesPreviews;
    }
    this.changeDetectorRef.markForCheck();
  }

  onItemRemove(removedPreviewIndex: number): void {
    this.previews.splice(removedPreviewIndex, 1);
    this.files.splice(removedPreviewIndex, 1);
  }

  onSubmit(): void {
    this.filesUpload.emit(this.files);
  }

  trackByIndex(index: number): number {
    return index;
  }

  private getFilesFromEvent(event: Event): File[] {
    event.preventDefault();
    event.stopPropagation();
    const selectedFiles =
      (event.target as HTMLInputElement)?.files ?? undefined;
    const droppedFiles =
      // tslint:disable-next-line: no-unsafe-any no-any
      ((event as any)?.dataTransfer?.files as FileList | undefined) ??
      undefined;
    const fileList = selectedFiles !== undefined ? selectedFiles : droppedFiles;
    const files: File[] = [];
    if (fileList === undefined) {
      return [];
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      files.push(file);
    }

    return files;
  }

  private getImageStringFromFile(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e?.target?.result as string);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  }
}
