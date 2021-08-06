import React from 'react';

import Home from './Home';
const {Switch , Route}= require("react-router");
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
