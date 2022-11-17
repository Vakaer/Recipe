import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingChangedSubscription!:Subscription;
  ingredients:Ingredient[] = [];
  constructor(private shoppingList: ShoppingListService) { }
  

  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
    this.ingChangedSubscription = this.shoppingList.ingredrientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }
  ngOnDestroy(): void {
    this.ingChangedSubscription.unsubscribe();
  } 

  onEditItem(index: number){
    this.shoppingList.startedEdititng.next(index);
    //console.log(index);
  }
 

}
