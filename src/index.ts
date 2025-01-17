// 1. 

function getFirstWord(a: string) {
	return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a:{ name: string; surname: string;}) {
  return { 
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a:{products:[{name:string}]}) {
  return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey1(a:{name:()=>string; cuteness?:number; coolness?:number}) {
    return "hey! i'm " + a.name();
}
hey1({name: () => "roma", cuteness: 100})
hey1({name: () => "vasya", coolness: 100})


// 4.2
interface abstractPet{
    name():string;
    
}
class Pet{
    protected namePet:string;
    protected information:any;
    constructor(namePet:string,information:any){
        this.namePet = namePet;
        this.information = information;
    }
    name(){
        
        return this.namePet;
    }
}
class Cat extends Pet{
    protected information: boolean;
    constructor(namePet:string,information:boolean){
        super(namePet,information);
        this.information = information;
    }
}
class Dog extends Pet{
    protected information: number;
    constructor(namePet:string,information:number){
        super(namePet,information);
        this.information = information;
    }
}
function hey2(abstractPet:abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey2(a)
hey2(b)

// 4.3

function hey(a:{name():string, type: string, cuteness?: number, coolness?:number}) {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey({name: () => "roma", type: "cat", cuteness: 100})
hey({name: () => "vasya", type: "dog", coolness: 100})

// 5.

// google for Record type
function stringEntries(a:object) {
   return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a:number): Promise<string>{
    return "*".repeat(a)
}
const hello = async () => {
   return await world(10)
}
hello()
    .then(r => console.log(r))
    .catch(e => console.log("fail"))




// 3 task
interface myType  {[a:string]:{cvalue:string | number | myType | undefined}}
function summ(a: myType):number {
    const x = Object.keys(a).map((k) : number => {
        if(k === undefined){
            return 2022;
        }
        const elem = a[k];
                
        if( elem.cvalue === undefined ) return 2021;
        if (typeof elem.cvalue === 'string') return +elem.cvalue || 2021;
        if (typeof elem.cvalue !== "number") return summ(elem.cvalue);
        return +elem.cvalue;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return +sum;
}
console.log(summ( { hello: {cvalue: 1}, world: { cvalue: { yay: { cvalue: "2" } } } }))