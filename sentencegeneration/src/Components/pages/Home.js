import React, { Component } from 'react';
import axios from 'axios';

// components
import MoreOptions from '../layout/MoreOptions/MoreOptions';
import Alert from '../layout/Alert/Alert';
import Spinner from '../layout/Spinner/Spinner';

class Home extends Component {

    // maintaining the state here
    state={
        loading: false,
        alert: null,
        obj: "",
        verb: "",
        noun: "",
        optionalParams:[
            {selectedOption:null, text:"", selectedSubOption:null},  
        ],

        sentenceCreated: ""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    // alert if nothing entered and click Make Sentence
    setAlert = (msg) => {
        this.setState({alert: {msg: msg}});

        setTimeout(() => {
        this.setState({alert: null});
        }, 2000);
    }
    
    // function called when Make Sentence button pressed 
    makeSentence = () => {
        if(this.state.obj==="" || this.state.verb==="" || this.setState.noun===""){
            this.setAlert(["Verb/Object/Noun are required fields"]);
            return;
        }else {
            let prms = this.processPrms([...this.state.optionalParams]);
            this.setState({loading: true});
    
            axios.get("https://lt-nlgservice.herokuapp.com/rest/english/realise?subject="+ 
                this.state.noun + "&verb=" + this.state.verb + "&object=" + this.state.obj + prms).then((res)=>{
                    this.setState({sentenceCreated: res.data.sentence});
                    this.setState({loading: false});
                }).then((e)=>{
                    console.log(e);
                    this.setState({loading: false});
            })
        }
    }

    // create a string of optional params to concatinate with API url
    processPrms = (list) => {
        let prms = "";

        for(let i=0;i<list.length;i++){
            if(list[i].selectedOption!==null){
                if(list[i].selectedSubOption){
                    prms += "&"+ list[i].selectedOption.value + "=" + list[i].selectedSubOption.value;
                }else {
                    prms += "&"+ list[i].selectedOption.value + "=" + list[i].text;
                }
            }
            
        }

        return prms;
    }

    // set the list into state when any value of optional params entered into textfield
    handleTextChange = (list) => {
        this.setState({optionalParams: list });
    };

    // set the list into state when any key of optional params selected
    handleDropdownChange = (list) => {
        this.setState({optionalParams: list });
    };

    /* set the list into state when any value of optional params selected
     * (handling if the value of optional parameter is selected from a dropdown)
    */
    handleSubDropdownChange = (list) => {
        this.setState({optionalParams: list });
    };

    // handler for adding more optional parameter
    handleAddInput = (list) => {
        this.setState({optionalParams: list });
    }
    
    // handler for removing any optional parameter
    handleRemoveInput = (list) => {
        this.setState({optionalParams: list});
    }

    render() {
        return (
            <div>
                <Alert alert={this.state.alert} />
                <input 
                    placeholder="Enter Noun" 
                    type="text" 
                    name="noun" 
                    className="m-1"
                    text={this.state.noun} 
                    onChange={this.onChange}/>

                <input 
                    placeholder="Enter Verb" 
                    type="text" 
                    name="verb" 
                    className="m-1"
                    text={this.state.verb} 
                    onChange={this.onChange}/>

                <input 
                    placeholder="Enter Object" 
                    type="text" 
                    name="obj" 
                    className="m-1"
                    text={this.state.obj} 
                    onChange={this.onChange} /> 
                
                <MoreOptions 
                    handleDropdownChange={this.handleDropdownChange} 
                    handleSubDropdownChange={this.handleSubDropdownChange} 
                    handleTextChange = {this.handleTextChange} 
                    handleAddInput = {this.handleAddInput}
                    handleRemoveInput = {this.handleRemoveInput}
                    optionalParams = {this.state.optionalParams}></MoreOptions>
                
                <div className="m-2 align-center">
                    <button 
                        className="btn btn-success " 
                        onClick={this.makeSentence}> 
                            Make Sentence 
                    </button>
                </div>
                {this.state.loading?<Spinner></Spinner>:<div>
                    {this.state.sentenceCreated.length>0 && <div style={{margin: '10px 0', fontSize:'30px'}}>
                        <mark>{this.state.sentenceCreated}</mark>
                        </div>}
                </div>}
            </div>
        )
    }
    
}

export default Home;