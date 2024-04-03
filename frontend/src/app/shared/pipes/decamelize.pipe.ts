import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamelize',
  standalone: true
})
export class DecamelizePipe implements PipeTransform {

  transform(value: string) {
    const splitted = value.split(/(?=[A-Z])/).join(' ');
    return `${splitted[0].toUpperCase()}${splitted.slice(1)}`;
  }
}
