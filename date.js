const moment =  require('moment');


var datetime = '2020-04-19T09:29:05.000Z';
var otherTime = moment(datetime);
let today = moment();

console.log(today.diff(otherTime,"day"));
