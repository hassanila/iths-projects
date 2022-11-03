"use strict";

// TODO:TEST TOP LEVEL AWAIT
// TODO: IMPORTING AND EXPORTING JS MODULES

console.time("test");
let lastTime = performance.now();


/*
import {id} from './module.js';

console.log(id);
*/

// USE CONST BY DEFAULT
const students = [];

// UPPERCASE FOR CONFIG VARIABLES
const UPPERCASE_VAR_TEST = "TEST123";

// CLASS
class Student {
    constructor(id, firstName, lastName, email, startDate = new Date()) {
        let error;
        if (!(id && firstName && lastName && email)) {
            error = "Required argument missing!";
            console.error(error);
            return error;
        }

        Object.assign(this, {
            id,
            firstName,
            lastName,
            email,
            startDate,
            testObj: {
                anotherTestObj: {
                    randomkey: "lol",
                },
            },
        });
    }

    changeEmail(newEmail) {
        this.email = newEmail;
    }

}


const obj8345 = {
    method1: function () {
    },

    method2() {

    },
    property1: 'test',

    ['property2']: 'test2',

    set readOnly(value) {
        console.error('CANNOT SET READ_ONLY VALUE')
    },
    get readOnly() {
        return 'HELLO';
    }
}

// MAKE PROPERTY READ ONLY
/*Object.defineProperty(obj8345, 'readOnly', {
    writable: false
})*/

// Generate random students
// and push them to students array
// MATH.RANDOM RETURNS A NUMBER BETWEEN 0 AND 1 (EXCLUDING 1)
let idCounter = 1;
let duplicateCounter = 0;

const min = 1, max = 10000;

for (let idCounter = 1; idCounter <= 10; idCounter++) {
    let id =
        "97" + String(Math.floor(Math.random() * (max - min) + min)).padStart(4, "0");

    students.some((o) => o.id === id) && duplicateCounter++;

    // for (const { id: id2 } of students) {
    //   if (id === id2) {
    //     error = "DUPLICATE IDs NOT ALLOWED! id: " + id;

    //     console.error(error);
    //   }
    // }

    students.push(new Student(id, "Joe", "Doe", "testemail@gmail.com"));
}

console.error("DUPLICATES: " + duplicateCounter);

// .some( ) returns true if any of the elements match the set criteria
console.log(
    "979999 " +
    (students.some((student) => student.id === "979999")
        ? "FOUND"
        : "NOT FOUND!")
);


console.table(students);

// OBJECT DESTRUCTURING (in this case first array element and randomkey property within anotherTestObj within testObj)
let [
    {
        testObj: {
            anotherTestObj: {randomkey: key},
        },
    },
] = students;
console.log(`OBJECT DESCTRUCTURING randomkey renamed to key = ${key}`);

const array1 = [1, 30, 4, 21, 100000, 5, 7, 6, 2];
const array2 = ["alltså", "hjälp", "åka", "löpare"];

// ARRAY DESTRUCTURING
let [firstvalue] = array1; // 1

for (const index in students) {
    for (const key in students[index]) {
        //console.log(key + ": " + students[index][key]);
    }
    if (index < students.length - 1) {
        //console.log(index, students.length - 1);
        //console.log("---------------");
    }
}

// PROMISE
function wait(time) {

    return new Promise((resolve, reject) => {

        if (typeof time !== 'number'/*Number.isNaN(time)*/) {
            return reject("Time is not a number");
        }

        setTimeout(() => resolve("PROMISE SUCCESS!"), time * 1000);
        //setTimeout(reject.bind(this, "ERROR: 404 NOT FOUND!"), time * 1000);
    });
}

wait(1)
    .then((result) =>
        console.log(
            "%c" + result,
            "background-color: green; color: white; padding: .5rem; border-radius: .5rem;"
        )
    ).finally(() => {
    // This will be run no matter whether the promise was resolved or rejected
})
    // CATCH WILL BE CALLED IF PROMISE IS REJECTED OR ERROR IS THROWN
    .catch((e) => console.error('wait promise error:', e));

const object1 = {name: "from-object1"};
const object2 = {test: "from-object2"};

const object3 = {...object1, ...object2, ...{test2: "from-object3"}};

console.log(object3);

const str = "hello there!";
const arr = [];
arr[5000] = "3";

let strLength = str.length - 1;

//for (let i = 1; i <= 500; i++) {
// 18ms @ 500000 iterations with string length recalc at every iteration
//arr.push(undefined);

// 500ms @ 500000 iterations
//arr.push([...str].pop());
//}0

console.timeEnd("test");

let o = {date: "Object yesss"};

//OPTIONAL CHAINING OPERATOR
const jibberish = console.log.bind(this, null ?? (o && o?.["date"]));

jibberish();

// NESTED FUNCTIONS AND FUNCTION RETURNING
// <<<FUNCTION STATEMENT>>>
function test1() {
    return function () {
        return function () {
            return function () {
                return function () {
                    console.log(o);
                    return "YEAH";
                };
            };
        };
    };
}

// <<<FUNCTION DECLARATION/EXPRESSION>>>
let testF = () => null;

console.log(test1()()()()());

let o1 = {a: 777};
console.log(o1);

// PROMISES
let promise = fetch("https://randomuser.me/api/");

promise
    .then((response) => console.log("RESPONSE STATUS: " + response?.status))
    .catch((error) =>
        console.log(
            "%cFETCH ERROR",
            "background-color: red; color: white; padding: .5em; border-radius: .2em"
        )
    );
console.log(promise);

// SELF CALLING FUNCTION
(function () {
    console.log("test");
})();

// SET UNIQUE ARRAY ITERATOR
// SPREAD & REST OPERATOR
let duplicatesArr = [
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
];
let duplicatesString =
    "abc abc abc abc abc abc abc abc abc abc abc abc abc abc";

let uniquesArr = [...new Set(duplicatesArr)];
let uniqueString = [...new Set(duplicatesString)].join("").trimEnd();

console.log(duplicatesArr, uniquesArr);
console.log(duplicatesString);
console.log(uniqueString);

//debugger;

// MILLISECONDS DIFFERENCE
let diff = Math.round(performance.now() - lastTime);
console.log(`Diff: ${diff}ms`);

// REMAINDER
console.log("Remainder check: " + String(5 % 4 === 1).toUpperCase());

// STRING REPLACEMENTS
console.log(
    "Hello %s! What's up this %s? Call me at %s",
    "Someone",
    "Friday",
    "0720549244"
);

// GENERATOR FUNCTION
// RETURNS AN ITERATOR THAT WILL YIELD A DIFFERENT VALUE EACH TIME .next is invoked on it
// YIELD PAUSES THE GENERATOR FUNCTION
function* generator() {
    yield "first";
    yield "second";
    yield 3;
}

// LOGICAL OR, AND & NULLISH ASSIGNMENTS
let x = 1,
    xBefore = x;

x ||= "||"; // SAME AS x || (x = "||"), NOT x = x || "||", it evaluates only if x has a falsy value
x ??= "??"; // it evaluates only if x has a nullish (null or undefined) value
x &&= "&&"; // it evaluates only if x has a truthy value


// FALSY VALUES
/*
*
* ""
* false
* NaN
* null
* undefined
* 0
*
* */

console.log("xBefore: %s\nxAfter: %s", xBefore, x);

// DEEP OBJECT CLONING WITHOUT REFERENCES TO OLD OBJECT (ES13/2022)
//structuredClone(object)

// OBJECT CLONING (NO DEEP CLONING)
/* const food = { beef: "🥩", bacon: "🥓" };
{ ...food }
Object.assign({}, food);
JSON.parse(JSON.stringify(food))
 */

// OBJ DEEP CLONING VIA JSON (WILL IGNORE FUNCTIONS)
// var newObject = JSON.parse(JSON.stringify(oldObject))

// MULTIPLE VARIABLES SAME VALUE DECLARATION
let m, u, l, t, i;
m = u = l = t = i = "YES";
console.log(m, u, l, t, i);

// VAR (FUNCTION SCOPE or global) VS LET (BLOCK SCOPE or function or global)
{
    var varvar = "var";
    let letlet = "let";

    console.log("var inside block: " + varvar);
    console.log("let inside block: " + letlet);
}
try {
    console.log("var outside block: " + varvar);
    console.log("let outside block: " + letlet);
} catch ({message: e}) {
    console.log("let outside block: " + e);
} finally {
    // This will always run after
}

// LEXICAL SCOPING MEANS THAT A FUNCTION OR A BLOCK WILL REMEMBER
// ALL THE VARIABLES/FUNCTIONS IN THE SCOPE CHAIN (PARENTS)
(function () {
    // VAR WILL HAVE THIS FUNCTION AS IT'S SCOPE, if we didn't have it inside a function
    // it would have a global scope

    for (var i = 0; i < 10; i++) {
        // same as if var was initialized here everytime
        setTimeout(() => console.log("VAR SETTIMEOUT: " + i), i * 1000);
    }

    for (let i = 0; i < 10; i++) {
        //LET WILL HAVE THIS BLOCK AS IT'S SCOPE
        // let will also be initialized here everytime but to this block scope only
        setTimeout(() => console.log("LET SETTIMEOUT: " + (i + 1)), i * 1000);
    }

    // let i won't exist here because it has a block scope
    // var i will exist here and be the last value that it was set to, var i has a function scope
})();

// REST PARAMETERS AND SPREAD OPERATOR
((...rest) => console.log("REST PARAMETERS:", ...rest))(
    "param1, param2, param3"
);

/** ARROW FUNCTIONS THIS, ARROW FUNCTIONS SHOULD NOT BE USED AS METHODS BECAUSE
THEY DON'T CREATE A NEW SCOPE, AND THEY DON'T HAVE THEIR OWN THIS, THEY HAVE GLOBAL SCOPE?
call, apply and bind does not bind this in arrow functions?
 **/
const obj = {
    // does not create a new scope
    scopetest: 10,
    b: () => console.log(this.scopetest ?? "ARROW FUNCTIONS HAVE GLOBAL THIS"),
    c: function () {
        console.log(
            typeof this.scopetest !== "undefined" &&
            "NORMAL FUNCTIONS HAVE LEXICAL SCOPE THIS"
        );
    },
};
obj.b();
obj.c();

// CONTINUE
for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    console.log(key);
}


// TODO: TRY TO UNDERSTAND
// REDUCE OBJS AND ARRAYS
// https://itnext.io/explode-an-array-into-a-deeply-nested-object-with-this-simple-recursive-function-4094ac1eeb8b
/*
const explode = (array, key, ...rest) =>
    array.reduce((acc, item) => ({
        ...acc,
        [item[key]]: rest.length ? {
            ...acc[item[key]],
            ...explode([item], ...rest)
        } : item
    }), {})*/


// USING A VARIABLE AS A KEY NAME
let keyName = 'test';

let newObj = {
    [keyName]: 'value-here'
}


// OBJ CONDITIONALLY ADD PROPERTY INLINE
const obj345 = {...(true && {someProperty: 'value'})}


/** REFERENCE VS VALUE COPY
PRIMITIVES ARE COPIED AS VALUE
OBJS AND ARRS ARE REFERENCED, they "disconnect" only if new value is assigned to them
FILL ARRAY WITH INDEX NR + 1
 **/
const arr346 = new Array(10).fill(0).reduce((prev, curr, i) => prev.push(i + 1) && prev, []);
console.log('arr346', arr346);

let arr777 = arr346;

arr777.push('THIS IS FROM ARR 777 PUSH');

console.log('arr777:', arr777);
console.log('arr346:', arr346);


// CONSOLE.ASSERT() FOR TESTING
console.assert(true === false, 'TRUE IS NOT FALSE')


// ADDING NUMBERS WITH DECIMALS
console.log('ADDING NUMBERS WITH DECIMALS, this should be 0.0065', 0.005 + 0.0015);


// TOP LEVEL AWAIT, ONLY VALID IN JS MODULES
// THIS CODE WILL RESOLVE AFTER 20s
/*console.log('%cAWAIT', 'color: green;')
await new Promise((resolve, reject) => setTimeout(resolve, 20000))*/



// NUMBER WITH X AMOUNT OF DECIMALS TO FIXED SIZE
// IT WILL AUTO ROUND
console.log('NUMBER TOFIXED: ', 0.459939.toFixed(2));


// MAP, can have objects, booleans etc as keys, must use set, get, has, delete
// .size instead of .length
let map = new Map();
map.set(true, 'map value for true');
map.set(undefined, 'map value for undefined');
console.log('map', map.get(true))
console.log('map', map.get(undefined))


// FETCH
fetch('https://avancera.app/cities/', {
    headers: {'Content-Type': 'application/json'},
    method: 'GET'
}).then(response => {
    return response.json()
}).then(arr => console.log(arr[0])).catch(error => console.error('FETCH ERROR', error));


// ASYNC FUNCTIONS
// THEY RETURN A PROMISE BY DEFAULT?
async function asyncTest() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 5000);
    });

    console.log('This should be logged after 5s');
}


asyncTest();


/** THIS WILL CONSOLE.LOG UNDEFINED
IF LET OR CONST WAS USED IT WOULD THROW AN ERROR: FOO IS NOT DEFINED, aka TDZ, temporal dead zone
THIS IS DUE TO HOISTING, WHERE VARIABLES ARE INITIATED (ALLOCATED MEMORY) AND FUNCTION STATEMENTS MOVED TO THE TOP
and FUNCTION STATEMENTS ARE INITIATED BEFORE THE CODE EXECUTES
 **/
var foo = 1
var foobar = function () {
    console.log(foo) //undefined
    var foo = 2
}
foobar()


try {
    let foo2 = 1
    let foobar2 = function () {
        console.log(foo2) // Cannot access 'foo2' before initialization // Because of TDZ
        let foo2 = 2
    }
    foobar2();
} catch (e) {
    console.error(e);
}

// will log undefined as void runs the statement and then returns undefined and the statement will not be defined
console.log(void true);


// this function statement will not be defined because of void, it can be run inline but won't be defined
try {

    void function hellothere() {
        console.log('%cFUNCTION', 'color:red;')
    }();
    console.log(hellothere); // ReferenceError: hellothere is not defined
} catch (e) {
    console.error(e);
}

// MORE OBJECT/ARRAY DESTRUCTURING
const body = {data: [{occasions: [{examinationTypeId: 3}, {examinationTypeId: 4}]}]}
const {data: [{occasions: [occasion1, occasion2]}]} = body; //same as const occasion1 = body.data[0].occasions[0], occasion2 = body.data[0].occasions[1];



// This will log A, D, C, B
// setTimeout is async, so the function callback gets added to the end of the call stack / queue
console.log('A');
setTimeout(() => console.log('B'), 50);
setTimeout(() => console.log('C'), 0);
console.log('D');


// PASS BY REFERENCE VS PASS BY VALUE
const byReference = {}; // objs and arrays get passed as reference
const byValue = 'string'; // any primitive type will be passed by value
const someFunction = function (parameter1, parameter2) {
    parameter1.someProperty = 'Hello'; // this will change the object called byReference

    parameter1 = {}; // This will overwrite the object parameter1 but only locally in this function scope
    parameter2 = 30; /* This will overwrite the string parameter2 but only locally in this function scope
                        and because parameter2 is passed by value it cannot be changed inside this function scope */
}

someFunction(byReference, byValue);
console.log(byReference); // {someProperty: 'Hello'}
console.log(byValue); // 'string';


// Convert any array-like to an actual array
const toArray = (arrayLike) => [...arrayLike];
console.log(toArray(['f', 'ffg']))


// Almost same as
// if (3 > 2) console.log("Yes, it's true");
3 > 2 && console.log("Yes, it's true");