import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './GLOBAL';

@Injectable()
export class PersonasService {

    public url: string;

    constructor(public _http: Http) {
      this.url = GLOBAL.url;
    }

    getPersonas() {
      return this._http.get(this.url + '/personas').map(res => res.json());
    }

    crearPersona(model) {
      let json = JSON.stringify(model);
      let params = 'json=' + json;
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      return this._http.post(this.url + '/personas', params, {'headers': headers}).map(res => res.json());
    }

    editarPerosna(model) {
      let json = JSON.stringify(model);
      let params = 'json=' + json;
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      return this._http.post(this.url + '/personas/' + model.id + "/update", params, {'headers': headers})
        .map(
          res => this.mapReponse(res)
        );
    }

    borrarPersona(id) {
      return this._http.get(this.url + '/personas/' + id + "/delete" )
        .map(
          res => this.mapReponse(res)
        );
    }

    mapReponse(response) {
      try {
        return response.json();
      } catch (e) {
        return response;
      }
    }



}
