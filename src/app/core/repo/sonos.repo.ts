// import env
// import http
// make api calls to return model
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { StarWarsPerson } from '../model';

@Injectable()
export class SonosRepo {

  private url = environment.apiLocation;
  private dumbStarWarsAPICall = 'https://swapi.co/api/';

  constructor(private http: HttpClient) {

  }

  // not sure what we are getting back so we lose type information here.
  exampleGet(): Observable<any> {
    // let http client know type info when it is known
    return this.http.get<any>(this.url + 'some/ending/url').map((res: Response) => {
      return res.json();
    });
  }

  dumbExampleGet(): Observable<any> {
    return Observable.of(
      // any json you want here
      {
        dumbValue: 'Mystery Data From Non Existent API.'
      }
    );
  }

  dumbRealAPICall(id: Number): Observable<StarWarsPerson> {
    return this.http.get<StarWarsPerson>(this.dumbStarWarsAPICall + 'people/' + id).map((value: StarWarsPerson, index: number) => {
      return value;
    });
  }
}

