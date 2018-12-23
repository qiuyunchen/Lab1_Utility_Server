const add = (...nums) => nums.reduce( (sum,num) => sum+num);
const subtract = (a,...nums) => nums.reduce( (diff,num) => diff-num, a);
const multiply = (...nums) => nums.reduce( (product,num) => product*num, 1);
const divide = (a,...nums) => nums.reduce( (quotient,num) => quotient/num, a);

module.exports = {add, subtract, multiply, divide};