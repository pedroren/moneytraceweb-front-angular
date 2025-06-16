import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'booleanCell' })
export class BooleanCellPipe implements PipeTransform {
  transform(value: boolean, fullTest: boolean = false): string {
    if (fullTest) {
      return value ? 'Active' : 'Inactive';
    } else {
      return value ? 'Yes' : 'No';
    }
  }
}
