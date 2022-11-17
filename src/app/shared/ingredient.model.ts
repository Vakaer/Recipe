export class Ingredient{
    
    //ingredient name
    private _name : string;
    //getter
    public get name() : string {
        return this._name;
    }
    //setter
    public set name(v : string) {
        this._name = v;
    }
    
    //ingredient amount
    private _amount : number;
    //getter
    public get amount() : number {
        return this._amount;
    }
    //setter
    public set amount(v : number) {
        this._amount = v;
    }
    
    /**
     *
     */
    constructor(name:string,amount:number) {
        this._name=name;
        this._amount=amount;
        
    }
    
}