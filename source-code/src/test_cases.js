function testCaseFor123(){
    const s1 = "AhmedBasit";
    let n = Math.floor(Math.random()* (100-30) ) + 30;
    let testCase = "";
    while(n > 0){
        let idx = Math.floor(Math.random()*s1.length);
        testCase += s1[idx];
        n--;
    }

    console.log(testCase);
}

function testCaseFor4579(){
    let n = Math.floor(Math.random()* (100 - 30) ) + 30;
    let testCase = "";
    while(n>0){
        let i = Math.floor(Math.random()*101);
        testCase += i.toString() + " ";
        n--;
    }
    console.log(testCase);
}

function testCaseFor68(){
    let n = Math.floor(Math.random()* (100 - 10) ) + 10;
    let values = "";
    let weigths = "";
    let c = 256;
    while(n>0){
        let v = Math.floor(Math.random()*(100-1)) + 1;
        let w = Math.floor(Math.random()*(100-1)) + 1;
        values += v.toString() + " ";
        weigths += v.toString() + " ";
        n--;
    }

    console.log("values: " + values,"\n","weights: " +  weigths);
}

testCaseFor123();
testCaseFor4579();
testCaseFor68();