import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISomeThing } from 'app/shared/model/some-thing.model';

type EntityResponseType = HttpResponse<ISomeThing>;
type EntityArrayResponseType = HttpResponse<ISomeThing[]>;

@Injectable({ providedIn: 'root' })
export class SomeThingService {
  public resourceUrl = SERVER_API_URL + 'api/some-things';

  constructor(protected http: HttpClient) {}

  create(someThing: ISomeThing): Observable<EntityResponseType> {
    return this.http.post<ISomeThing>(this.resourceUrl, someThing, { observe: 'response' });
  }

  update(someThing: ISomeThing): Observable<EntityResponseType> {
    return this.http.put<ISomeThing>(this.resourceUrl, someThing, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISomeThing>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISomeThing[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
