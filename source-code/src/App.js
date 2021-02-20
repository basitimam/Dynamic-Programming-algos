
import './App.css';
import Logo from  '../src/307-3074231_coding-ninjas-coding-ninjas-logo.png';
import Main from '../src/views/Main';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LCS from '../src/views/LCS';
import SCS from '../src/views/SCS';
import LIS from '../src/views/LIS';
import LD from '../src/views/LD';
import MCM from '../src/views/MCM';
import KS from '../src/views/KS';
import PP from '../src/views/PP';
import RCP from '../src/views/RCP';
import CCMP from '../src/views/CCMP';
import WBP from '../src/views/WBP';


function App() {
  return (
    <div>
    <div className="App">
    <img src={Logo}/>
     <h1>Design And Analysis Of Algorithms</h1>
     </div>
     <BrowserRouter>
      <Main/>
      <Switch>
        <Route path='/LCS' component={LCS}/>
        <Route path='/SCS' component={SCS}/>
        <Route path='/LIS' component={LIS}/>
        <Route path='/LD' component={LD}/>
        <Route path='/MCM' component={MCM}/>
        <Route path='/KS' component={KS}/>
        <Route path='/PP' component={PP}/>
        <Route path='/RCP' component={RCP}/>
        <Route path='/CCMP' component={CCMP}/>
        <Route path='/WBP' component={WBP}/>
      </Switch>
      </BrowserRouter>
      <div className="desc">
            <h3>
            Dynamic Programming (DP) is an algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solution to its subproblems.

Let’s take the example of the Fibonacci numbers. As we all know, Fibonacci numbers are a series of numbers in which each number is the sum of the two preceding numbers. The first few Fibonacci numbers are 0, 1, 1, 2, 3, 5, and 8, and they continue on from there.Before moving on to understand different methods of solving a DP problem, let’s first take a look at what are the characteristics of a problem that tells us that we can apply DP to solve it.
            </h3>

        </div>
      </div>
  );
}
export default App;
