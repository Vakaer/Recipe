import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe!:Recipe;
  @Input() index!:number;
  //@Output() recipeSelected = new EventEmitter<void>();
  constructor(private recipeSevice:RecipeService) {}

  ngOnInit(): void {
  }

  // onSelected(){
  // this.recipeSelected.emit();
  //   this.recipeSevice.recipeSelected.emit(this.recipe);
  // }
}
 