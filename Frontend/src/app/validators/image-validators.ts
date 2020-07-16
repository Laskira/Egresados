import { FormControl } from '@angular/forms';

export function requiredFileType() {
  return function( control: FormControl ) {
    const file = control.value;
    if ( file ) {
      if (file.size > 4242880) {
        return { sizeFile: true };
      }
      return null;
    }

    return null;
  };
}
