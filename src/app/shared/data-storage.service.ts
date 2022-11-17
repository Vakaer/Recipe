import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap } from "rxjs-compat/operator/exhaustMap";
import { first } from "rxjs-compat/operator/first";
import { take } from "rxjs-compat/operator/take";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth-service";
import { userModel } from "../auth/user.model";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";


@Injectable({ providedIn: 'root' })
export class DataStoragesevice {

 
  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService,
    private authService: AuthService
    ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://ng-course-recipe-book-8a328-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
        response => {
          console.log(response);
        }
      )
  }

  fetchRecipes() : any{
      this.authService.user.pipe(exhaustMap( user =>)).subscribe().unsubscribe(); 
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-8a328-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          if (recipe.ingredients.length < 1) {
            recipe.ingredients = [];
            return recipe
          }

          return recipe;

        })
      }),tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
        



  }
}