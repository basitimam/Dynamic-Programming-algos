function antdUsecase(itemsNumber, capacity, weights, values) {

    var finalResult;


    if(dpArr[itemsNumber][capacity] !== undefined) {
        return dpArr[itemsNumber][capacity];
    }

    if(itemsNumber === 0 || capacity === 0) {
        finalResult = 0;
    } else if(weights[itemsNumber] > capacity) {
        finalResult = knapsackDP(itemsNumber - 1, capacity, weights, values);
    } else {
        var dontPutInKnapsack = knapsackDP(itemsNumber - 1, capacity, weights, values);
        var putInSack = values[itemsNumber] + knapsackDP(itemsNumber - 1, capacity - weights[itemsNumber], weights, values);
        finalResult = Math.max(dontPutInKnapsack, putInSack);
    }
    dpArr[itemsNumber][capacity] = finalResult;

    return finalResult;
}