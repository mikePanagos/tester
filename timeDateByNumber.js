"use strict";


var date = new Date().getTime();

console.log(date);

console.log(" seven day later should be the 2018-08-06")


var daysToMilSec =5*24*3600000+date;


// console.log(" date to millie is "+date+" plus seven days "+daysToMilSec);

var newDate=new Date(daysToMilSec).toISOString();
console.log("date seven days later is"+newDate);


var number=getValueForExpireationDate(newDate);
console.log("return number is "+number);


function getValueForExpireationDate(){
    var num=new Date(newDate).getTime();
    console.log("num "+num);
    var today = new Date().getTime();
    console.log("today "+today);

    num=(num-today)/(24*3600000);
    num=Math.round(num);

    return num;

}