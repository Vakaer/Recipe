import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    //name
    private _name: string;
    //name getter
    public get name(): string {
        return this._name;
    }
    //name setter
    public set name(v: string) {
        this._name = v;
    }

    //description
    private _description: string;
    //descripton getter
    public get description(): string {
        return this._description;
    }
    //decsription setter
    public set description(v: string) {
        this._description = v;
    }
    //imagepath
    private _imagePath: string;
    //imagePath getter
    public get imagePath(): string {
        return this._imagePath;
    }
    //imagepath setter
    public set imagePath(v: string) {
        this._imagePath = v;
    }
    private _ingredients!: Ingredient[];
    public get ingredients(): Ingredient[] {
        return this._ingredients;
    }
    public set ingredients(value: Ingredient[]) {
        this._ingredients = value;
    }
    /**
     *
     */
    constructor(name: string, desc: string, imagePath: string, ingredients:Ingredient[]) {
        this._name = name;
        this._description = desc;
        this._imagePath = imagePath;
        this._ingredients = ingredients;

    }

}