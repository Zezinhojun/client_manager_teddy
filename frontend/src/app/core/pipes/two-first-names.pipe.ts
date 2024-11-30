import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoFirstNames',
  standalone: true
})
export class TwoFirstNamesPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return '';
    const names = value.split(' ');
    return names.length > 1 ? `${names[0]} ${names[1]}` : value;
  }

}
