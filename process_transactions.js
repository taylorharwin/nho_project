"use strict";
function process(data) {
    console.log(data);
    var mappedData = data.map(function (transaction) {
        return {
            name: transaction.name,
            date: transaction.date,
            category: transaction.category
        };
    });
    var needs = {
        self_actualization: ['Travel'],
        esteem: ['Recreation', 'Community'],
        love_belonging: ['Service', 'Transfer'],
        safety: ['Payment', 'Interest'],
        physiological: ['Food and Drink', 'Healthcare', 'Supermarkets and Groceries', 'Clothing and Accessories']
    };
    var instances = {
        self_actualization: 0,
        esteem: 0,
        love_belonging: 0,
        safety: 0,
        physiological: 0
    };
    mappedData.forEach(function (transaction) {
        for (var key in needs) {
            var catOne = transaction.category[0], catTwo = transaction.category[1];
            if (needs[key].indexOf(catOne) > -1) {
                instances[key]++;
            }
            if (needs[key].indexOf(catTwo) > -1) {
                instances[key]++;
            }
        }
    });
    return instances;
}
module.exports = process;
