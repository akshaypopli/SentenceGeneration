import React, { Component } from 'react';
import Spinner from '../layout/Spinner/Spinner';
import axios from 'axios';

import MoreOptions from '../layout/MoreOptions/MoreOptions';

class Home extends Component {
    state={
        loading: false,
        // alert: null,
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
    
    makeSentence = () => {
        let prms = this.processPrms([...this.state.optionalParams]);
        this.setState({loading: true});

        axios.get("https://lt-nlgservice.herokuapp.com/rest/english/realise?subject="+ 
            this.state.noun + "&verb=" + this.state.verb + "&object=" + this.state.obj + prms).then((res)=>{
                this.setState({sentenceCreated: res.data.sentence});
                this.setState({loading: false});
            }).then((e)=>{
                console.log(e);
        })
    }

    processPrms = (list) => {
        let prms = "";

        for(let i=0;i<list.length;i++){
            if(list[i].selectedSubOption){
                prms += "&"+ list[i].selectedOption.value + "=" + list[i].selectedSubOption.value;
            }else {
                prms += "&"+ list[i].selectedOption.value + "=" + list[i].text;
            }
        }

        return prms;
    }

    handleTextChange = (list) => {
        this.setState({optionalParams: list });
    };

    handleDropdownChange = (list) => {
        this.setState({optionalParams: list });
    };

    handleSubDropdownChange = (list) => {
        this.setState({optionalParams: list });
    };

    handleAddInput = (list) => {
        this.setState({optionalParams: list });
      }
    
    handleRemoveInput = (list) => {
        this.setState({optionalParams: list});
    }

    render() {
        return (
            <div>
                
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