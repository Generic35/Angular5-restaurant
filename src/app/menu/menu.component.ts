import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
