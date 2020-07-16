import { Component, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-file-pdf',
  templateUrl: './file-pdf.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FilePdfComponent,
      multi: true,
    },
  ],
  styleUrls: ['./file-pdf.component.scss'],
})
export class FilePdfComponent implements ControlValueAccessor {
  public file: File | null = null;
  onChange: Function;

  onFileSelected() {
    const inputNode: any = document.querySelector('#pdf');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    if (event && event.item(0)) {
      const file = event.item(0);
      this.onChange(file);
      this.file = file;
    }
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
}
