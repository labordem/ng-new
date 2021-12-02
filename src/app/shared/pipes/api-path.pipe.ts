import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';

@Pipe({
  name: 'apiPath',
})
export class ApiPathPipe implements PipeTransform {
  transform(src: string | undefined): string | undefined {
    return src ? `${environment.apiUrl}/${src}` : undefined;
  }
}
