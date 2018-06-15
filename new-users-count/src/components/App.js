import React from 'react';
import { Switch, Route} from 'react-router-dom'
import { GraphPage, TablePage} from 'pages'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={GraphPage}/>
        <Route path='/table' component={TablePage}/>
      </Switch>
    </div>
  );
};

export default App;