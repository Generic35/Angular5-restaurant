import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList().catch(err => Observable.throw(err));
  }

  getLeader(id: number): Leader {
    return this.restangular.one('leaders', id).get().catch(err => Observable.throw(err));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList().map(leaders => leaders[0]).catch(err => Observable.throw(err));
  }
}
