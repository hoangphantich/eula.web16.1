var A = function(){
  var firstName = "Phan";
  this.fullName = "Hoang";
  
  function b(){
    console.log("private: " + firstName);
  }
  
  this.c = function(){
    console.log("public: " + this.fullName);
  }
}

A.prototype = {
  a:1,
  d: function(){
    console.log("inherit");
  }
};

A.e = function(){
  console.log("hoho");
}

console.log(A);
console.log(A.prototype);
console.log(A.__proto__);

var a = new A();
console.log(a);
console.log(a.prototype);
console.log(a.__proto__);

console.log(a.fullName);
a.c();

console.dir($);
console.dir(A);
console.log($("div"));
