import React ,{Component}from "react";
import {BrowserRouter,Route} from 'react-router-dom'

import { connect } from "react-redux";
import * as actions from '../actions';
import Header from './Header';
const Dashboard =()=><h2>gg</h2>
const SurveyNew =()=><h2>survey</h2>
const Landing =()=><h2>landing</h2>


class App extends Component
{   
    componentDidMount()
    {
        this.props.fetchUser();
    }

    render(){
    return(
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header></Header>
                    <Route exact={true} path="/" component={Landing}/>
                    <Route exact path="/surveys" component={Dashboard}/>
                    <Route path="/surveys/new" component={SurveyNew}/>

                </div>    
            </BrowserRouter>
        </div>
    );
}
} 

export default connect(null,actions) (App);