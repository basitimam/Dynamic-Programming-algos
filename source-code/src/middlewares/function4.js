function function4() {
    let n = Math.floor(Math.random() * (100 - 30)) + 30;
    let testCase = "";
    let array = [];
    while (n > 0) {
      let i = Math.floor(Math.random() * 101);
      testCase += i.toString() + " ";
      array.push(i);
      n--;
    }
    let collc = [testCase, array];
    return collc;
  }
  
  export default function4;
  