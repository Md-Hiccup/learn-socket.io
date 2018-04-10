var express = require('express');
var app = express();

var _ = require('lodash');

app.get('/', function (req, res) {
    console.log('home page');
})

/************** indexOf ************/
var arr = [1, 22, 1, 2, 3, 42, 12];
var index = _.indexOf(arr, 3, 2); // It return the index of the element(i.e. 3)
// => 3
console.log('indexOF: ', index);

/************** slice *************/
var slice = _.slice(arr, 1, 3); // It return the new array after slicing 
console.log('slice: ', slice);

/************** chunk *************/
var chunk = _.chunk(arr, 2); // It return the array with nested array of max size 2
console.log('chunk: ', chunk);

/************** _.spread *************/
var say = _.spread(function (who, what) {
    return who + ' says ' + what;
});

say(['fred', 'hello']);
// => 'fred says hello'

var numbers = Promise.all([
    Promise.resolve(40),
    Promise.resolve(36)
]);

numbers.then(_.spread(function (x, y) {
    z = x + y;
    return z;
})).then(res => {
    console.log("Promise: ", res)
});

/*************** _.clone **************/

var obj = [{
    a: 1,
    b: 2
}];

var clone = _.clone(obj);
console.log('clone: ', obj[0] === clone[0], clone);

/*************** _.clamp ***************/
var clamp = _.clamp(10, -5, 15); // if in range then it return the same no. else it return the nearest bound no.
console.log('clamp: ', clamp)

/**************** _.assign *************/
function Foo() {
    this.a = 1;
}

function Bar() {
    this.c = 3;
}

Foo.prototype.b = 2;
Bar.prototype.d = 4;

var a = _.assign({
    'd': 0
}, new Foo, new Bar);
console.log('Assign', a);
// => { 'a': 1, 'c': 3 }

/**************** _.keys **************/
function Foo() {
    this.a = 1;
    this.b = 2;
}

Foo.prototype.c = 3;

var keys = _.keys(new Foo);
// => ['a', 'b'] (iteration order is not guaranteed)
console.log('keys: ', keys);
var keys1 = _.keys('hii');
// => ['0', '1', '2']
//   console.log('keys1: ',keys1);

/***************** _.pick **************/
var object = {
    'a': 1,
    'b': '2',
    'c': 3
};

var pick = _.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
console.log('pick: ', pick);

/****************** _.forIn ****************/
function Foo() {
    this.a = 1;
    this.b = 2;
}

Foo.prototype.c = 3;
console.log('forIn: ');
_.forIn(new Foo, function (value, key) {
    console.log(key, ' => ', value);
});




/*****************************************/

app.listen(3000, function (req, res) {
    console.log('Server is running on Port: 3000');
})