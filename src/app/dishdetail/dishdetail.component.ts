import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger(
      'visibility', [
        state('show', style({
          transform: 'scale(1)',
          opacity: 1
        })),
        state('hidden', style({
          transform: 'scale(0.5)',
          opacity: 0
        })),
        transition("* => *", animate('0.5s ease-in-out'))
      ]
    )
  ]
})

export class DishdetailComponent implements OnInit {

  // @Input()
  commentForm: FormGroup;
  dish: Dish;
  dishCopy: any = null;
  dishIds: number[];
  visibility = 'shown';

  formErrors: any = {
    author: 'sdfs',
    comment: 'sdf',
    rating: 'sdf'
  };

  validationMessages = {
    author: {
      required: 'Author name is required.',
      minlength: 'Min lenght is 2 chars',
    },
    comment: {
      required: 'Author name is required.',
      minlength: 'Min lenght is 2 chars',
    }
  };

  prev: number;
  next: number;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    @Inject('BaseURL') private BaseURL
  ) {

    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ''
    });

    this.commentForm.valueChanges.subscribe(data => {
      this.onFormValueChange(data);
    })

    this.onFormValueChange();
  }

  ngOnInit() {

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.dishservice.getDish(+params['id'])
    }).subscribe((dish) => {
      this.dish = dish;
      this.dishCopy = dish;
      this.setPrevNext(dish.id);
      this.visibility = 'shown';
    });

    console.log(this.commentForm.value, ' ', this.commentForm.status, this.formErrors);
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  onFormValueChange(data?: any): any {
    if (!this.commentForm) { return; }
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      let control = this.commentForm.get(field);
      if (control && control.dirty && !control.valid) {
        for (let error in control.errors) {
          const messages = this.validationMessages[field];
          this.formErrors[field] = messages[error] + ' ';
        }
      }
    }
  }

  onSubmit() {
    const submitedComment: Comment = {
      author: this.commentForm.get('author').value,
      rating: this.commentForm.get('rating').value,
      comment: this.commentForm.get('comment').value,
      date: new Date().toISOString(),
    }

    this.dishCopy.comments.push(submitedComment)
    this.dishCopy.save().subscribe(dish => {
      this.dish = dish;
    })

    console.log(this.commentForm.value, ' ', this.commentForm.status, this.formErrors);

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    })

    console.log(this.commentForm.value, ' ', this.commentForm.status, this.formErrors);
  }

  private resetFormErrors() {
    this.formErrors = {
      author: '',
      comment: '',
      rating: ''
    }
  }
}