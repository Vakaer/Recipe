import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, Route, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStoragesevice } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipes.model";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    
    constructor(private dataStorageService: DataStoragesevice, 
            private recipeSerive: RecipeService,
           ){}

    resolve(){
        
       
        const recipes = this.recipeSerive.getRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
        
       
        
    }

}