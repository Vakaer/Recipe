import { Component, OnInit } from '@angular/core';
import { DataStoragesevice } from '../shared/data-storage.service';

import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  //providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  //this service is optional as we have added routing and we are using routerLink to navigate
  selectedRecipe!:Recipe;
  isFetching = false;

  //constructor(private recipeService:RecipeService) { }
  constructor(private dataStrorage : DataStoragesevice) { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe:Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
    debugger
    this.isFetching = true
    this.dataStrorage.fetchRecipes().subscribe();
    this.isFetching = false   

  }

}
