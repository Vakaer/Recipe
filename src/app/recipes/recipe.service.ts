import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();
  recipeModel!:Recipe;

  constructor(private shoppinListService:ShoppingListService){};
  recipeSelected = new Subject<Recipe>();
  //recipes array of Recipe type "using Recipe model created earlier"
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Olives and Cheese Pizza',
  //     'A very tasty Pizza with thick crust',
  //     'https://www.guidingtech.com/wp-content/uploads/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-12_4d470f76dc99e18ad75087b1b8410ea9.jpg',
  //     [
  //       new Ingredient('Meat',1),
  //       new Ingredient('French Fries',20)

  //     ]
  //     ),
  //   new Recipe(
  //     'Hamburger',
  //     'Best Hamburger you can find in town',
  //     'https://c4.wallpaperflare.com/wallpaper/374/404/846/brown-bird-perching-during-daytime-wren-wren-wallpaper-preview.jpg',
  //     [
  //       new Ingredient('Buns',2),
  //       new Ingredient ('Meat',1)
  //     ]
  //     )
  // ];


   private recipes: Recipe[] = [];
  
  setRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipeChanged.next(this.recipes.slice());  
  }
  getRecipes() {
    
    return this.recipes.slice();
    
  }
  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.shoppinListService.addIngredients(ingredients);
  }
  addRecipe(recipe:Recipe){
    debugger
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  
}