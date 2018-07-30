# conect-decorator

将一个javascript function 通过 conectDecorator 方法，让这个function与其它的方法相链接，使其它方法可以操作被链接的对象，达到装饰者模式的效果。

```
npm i conect-decorator --save
```

_下面是例子（存在js小数点问题，不是讨论重点）_

```js
const conectDecorator = require('../dist');

// 添加税
function addTaxDecorator() {
	this.price = (this.price * (1 + .12)).toFixed(2);
}
// 转化为美元
function toDollarDecorator() {
	this.price = (this.price / 6.5).toFixed(2);
}
// 转化为欧元
function toEuroDecorator() {
	this.price = (this.price / 8).toFixed(2);
}



function MoneyA(price) {
	this.price = price;
}
MoneyA.prototype.getPrice = function() {
	return this.price;
}


var money1 = new MoneyA(100); // 100 CNY
money1.getPrice = conectDecorator(MoneyA.prototype.getPrice, [addTaxDecorator, toDollarDecorator]);
console.log(money1.getPrice()) // 17.23

var money2 = new MoneyA(150);
money2.getPrice = conectDecorator(MoneyA.prototype.getPrice, [addTaxDecorator, toEuroDecorator]);
console.log(money2.getPrice()); // 21.00

// OR

function MoneyB(price) {
	this.price = price;
}
MoneyB.prototype.getPrice = function() {
	return this.price;
}
MoneyB.prototype.getPrice = conectDecorator(MoneyB.prototype.getPrice, [addTaxDecorator]);

var moneyB1 = new MoneyB(100); // 100 CNY
moneyB1.getPrice = conectDecorator(MoneyB.prototype.getPrice,  toDollarDecorator);
console.log(moneyB1.getPrice()) // 17.23

var moneyB2 = new MoneyB(150); // 150 CNY
moneyB2.getPrice = conectDecorator(MoneyB.prototype.getPrice,  toEuroDecorator);
console.log(moneyB2.getPrice()); // 21.00
```

