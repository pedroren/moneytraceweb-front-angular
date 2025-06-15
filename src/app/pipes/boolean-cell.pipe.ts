import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'booleanCell',})
export class BooleanCellPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}