import { FormControl } from '@angular/forms';

export function FilePdf() {
  return function(control: FormControl) {
    const file = control.value;
    if (file) {
      if (!file.type.includes('application/pdf')) {
        return {
          fileType: true,
        };
      }
      if (file.size > 4242880) {
        return { sizeFile: true };
      }
      return null;
    }

    return null;
  };
}
