// ==== I. WORK WITH COLLECTION ====
// - _select -
var scores = [84, 99, 91, 65, 87, 55, 72, 68, 95, 42],
    topScorers = [], scoreLimit = 90;
topScorers = _.select(scores, function(score) {
    return score > scoreLimit;
});
console.log(topScorers);

// - _pluck - Extract key or value from an array
var Tuts = [{name : 'NetTuts', niche : 'Web Development'},
            {name : 'WPTuts', niche : 'WordPress'},
            {name : 'PSDTuts', niche : 'PhotoShop'},
            {name : 'AeTuts', niche : 'After Effects'}];
var niches = _.pluck(Tuts, 'niche');
var names = _.pluck(Tuts, 'name');

console.log(niches);
console.log(names);


// - map - creates an array from a collection where each element can be
// muatated or otherwise changed through a function
var Tuts = [{name : 'NetTuts', niche : 'Web Development'},
            {name : 'WPTuts', niche : 'WordPress'},
            {name : 'PSDTuts', niche : 'PhotoShop'},
            {name : 'AeTuts', niche : 'After Effects'}];

var names = _(Tuts).pluck('name').map(function(value) {
    return value + '+'
});
console.log(names);


// - All - is very useful if we want to check every value in a collection
// passes a certain criteria.
// For example we want to check whether a student has passed in every subject:
var Scores = [95, 82, 98, 78, 65];
var hasPassed = _(Scores).all(function(value) {
    return value > 5;
});
console.log(hasPassed);


// ==== II. WORKING WITH ARRAY ====

// - _.uniq - parses an array and removes all duplicatge elements
// providing us with only unique elements
var uniqTest = _.uniq([1,5,4,4,5,2,1,1,3,2,2,3,4,1]);
console.log(uniqTest);

// - _.range - lets we create a 'range' of list of numbers
var tens = _.range(0, 100, 10); //range(start, end, step)
console.log(tens);

// -  _intersection - compares 2 arrays to each others and returns
// the list of elements that are found in all of the passed arrays
// i.e. an intersection in set theory
var tens = _.range(0, 100, 10),
    eights = _.range(0, 100, 8),
    fives = _.range(0, 100, 5);
var common = _.intersection(tens, eights, fives);
console.log(tens);
console.log(eights);
console.log(fives);
console.log(common);


// ==== III. WORKING WITH OBJECTS ====
// -  _.keys and _.values. Easy come easy grab
var Tuts = { NetTuts : 'Web Development',
            WPTuts : 'WordPress',
            PSDTuts : 'PhotoShop',
            AeTuts : 'After Effects'};
var keys = _.keys(Tuts);
var values = _.values(Tuts);
console.log(keys + values);


// - _.values - when we need to create objects with
// sensible defaults when one might not be used when creating it
var tuts = { NetTuts : 'Web Development'};
var defaults = { NetTuts : 'Web Development', niche: 'Education'};

_.defaults(tuts, defaults);
console.log(tuts);


// IV. WORKING WITH UTILITIES
// - _.templating -
var data =   {site: 'NetTuts'},
    template =   'Welcome! You are at <%= site %>';
var parsedTemplate = _.template(template, data);
console.log(parsedTemplate);



























