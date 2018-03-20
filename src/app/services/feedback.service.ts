import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback): Observable<any> {
    return this.restangular.all('feedback').post(feedback);
  }
}
