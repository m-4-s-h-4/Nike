import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | null, filterString: string, propName: string): any[] {
    if (!value || filterString === '' || propName === '') {
      return value as any[];
    }

    const result = value.filter((a: any) =>
      a[propName].trim().toLowerCase().includes(filterString.toLowerCase())
    );

    return result;
  }
}
