import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscriber, Subscription } from "rxjs";
import { AuthService } from "../auth/auth-service";
import { userModel } from "../auth/user.model";
import { Recipe } from "../recipes/recipes.model";
import { DataStoragesevice } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Output() featureSelected = new EventEmitter<string>();
    private userSub: Subscription = Subscription.EMPTY;
    isAuthenticated = false;
    constructor(
        private dataStorageService: DataStoragesevice,
        private authService: AuthService
    ) { }

    ngOnInit() {
        //if we have a suser then we are logged in
        this.userSub = this.authService.user.subscribe( user => {
        this.isAuthenticated = !user ? false : true;  //OR !!user a trick
        });
    }
    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
    ngOnDestroy(){
        this.userSub.unsubscribe()
    }
}