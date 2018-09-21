import {Injectable} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {AjaxService} from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public apiUrl: string = '';

  constructor(private ajaxService: AjaxService, private route: ActivatedRoute) {
  }

  async getReportData(params?: any) {
    this.route.queryParams.subscribe((params: Params) => {
      this.apiUrl = params['data'];
    });
    let result = await this.ajaxService.get(this.apiUrl, params);
    return result.data;
  }
}
