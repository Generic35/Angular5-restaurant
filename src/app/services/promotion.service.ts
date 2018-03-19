import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Promotion[] {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Promotion {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({ 
      featured: true
    }).map(dishes => dishes[0]).catch((err => Observable.throw(err)));
  }
}
