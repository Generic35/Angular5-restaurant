import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback) {
    this.restangular.all('feedback').post(feedback);
  }
}
