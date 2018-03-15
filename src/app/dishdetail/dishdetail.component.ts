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
  prev: number;
  next: number;

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      author: '',
      rating: '',
      comment: ''
    });

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.switchMap((params: Params) =>
      this.dishservice.getDish(+params['id']))
        .subscribe((dish)=>{ 
          this.dish = dish; 
          this.setPrevNext(dish.id); 
        });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  onSubmit(){

  }
}
