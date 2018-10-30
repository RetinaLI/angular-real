import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs';

export interface IResponseData {
  code?: number,
  msg?: string,
  [name: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(private http: Http) {

  }

  public get(url: string, params: {} | undefined): Promise<IResponseData> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.request('get', url, params, headers);
  }

  private request(method: 'get' | 'post' = 'get', url: string, params: {} | undefined, headers: Headers): Promise<IResponseData> {
    let paramKeys = params && Object.keys(params) || [];
    let searchParams = new URLSearchParams();
    let result: Observable<Response>;
    if (paramKeys.length > 0) {
      paramKeys.forEach(p => {
        if (params[p] !== undefined && params[p] !== null)
          searchParams.set(p, params[p]);
      });
    }

    if (method === "get") {
      result = this.http.get(url, { headers, params: params });
    } else {
      result = this.http.post(url, searchParams.toString(), { headers });
    }
    return result.toPromise().then(this.extractData).catch(this.handleError);
  }
  private extractData(response: any) {
    let result: any = {};
    try {
      let body = response.json();
      result = body || {};
    } catch (ex) {
      throw { code: 400, msg: ex.toString() }
    }
    return result as IResponseData;
  }
  private handleError(error: Response) {
    let {
      status: code,
      statusText: msg
    } = error;

    let body: any = {};

    try {
      body = error.json();
      code = body.code || code;
      msg = body.msg || msg;
    } catch{} finally { }

    let error_data: IResponseData = { code, msg, ...body };

    return error_data;
  }
}
