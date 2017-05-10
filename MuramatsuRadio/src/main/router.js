import React from 'react';
import  {  Route , BrowserRouter,Switch } from 'react-router-dom'

import Home from '../views/home/home';
import App from '../App'
/*
export default class Routers extends Component{
    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Home}></Route>
            </Router>
        )
    }
}*/

const Routes = (props) => {
    return (
          <BrowserRouter>
                <Switch>
                    <App>
                        <Route exact path="/" component={Home}></Route>
                    </App>
                </Switch>
            </BrowserRouter>
    )

}

export default Routes;

