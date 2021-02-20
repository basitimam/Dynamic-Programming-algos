function function1() {
    const s1 = "AbdulBasit";
    let n = Math.floor(Math.random() * (100 - 30)) + 30;
    let testCase = "";
    while (n > 0) {
      let idx = Math.floor(Math.random() * s1.length);
      testCase += s1[idx];
      n--;
    }
  
    return testCase;
  }
  
  export default function1;
  