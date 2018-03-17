import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  // @Input()
  commentForm: FormGroup;
  dish: Dish;
  dishIds: number[];
  formErrors = {
    author: '',
    comment: '',
    rating: ''
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
    private location: Location) {
    this.commentForm = this.fb.group({
      author: ['', [ Validators.required, Validators.minLength(2) ]],
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

    this.route.params.switchMap((params: Params) =>
      this.dishservice.getDish(+params['id']))
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
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

  }
}
