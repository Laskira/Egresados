import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FilesComponent,
      multi: true
    }
  ],
  styleUrls: ['./files.component.scss']
})

export class FilesComponent implements ControlValueAccessor {
  // @Input() progress;
  onChange: Function;

  public file: File | null = null;
  fileSelected: string | ArrayBuffer = 'assets/photo.svg';

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    // image preview
    const reader = new FileReader();
    reader.onload = e => (this.fileSelected = reader.result);
    reader.readAsDataURL(this.file);
  }

  constructor(private host: ElementRef<HTMLInputElement>) { }

  writeValue(value: null) {
   // Clear Input
   this.host.nativeElement.value = '',
   this.file = null;

  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  reset(){
    this.fileSelected = 'assets/photo.svg';
  }

  registerOnTouched(fn: Function) { }

}
