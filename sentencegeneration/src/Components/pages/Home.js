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
        inputList:[
            {selectedOption:null, text:"", selectedSubOption:null},
            
        ],

        sentenceCreated: ""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };
    
    makeSentence = () => {
        let prms = this.processPrms([...this.state.inputList]);
        this.setState({loading: true});
        console.log(prms);
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
        this.setState({inputList: list });
    };

    handleDropdownChange = (list) => {
        this.setState({inputList: list });
    };

    handleSubDropdownChange = (list) => {
        this.setState({inputList: list });
    };

    handleAddInput = (list) => {
        this.setState({inputList: list });
      }
    
    handleRemoveInput = (list) => {
        this.setState({inputList: list});
    }

    render() {
        return (
            <div>
                
                <input placeholder="Enter Noun" type="text" name="noun" text={this.state.noun} onChange={this.onChange} required/>

                <input placeholder="Enter Verb" type="text" name="verb" text={this.state.verb} onChange={this.onChange} required/>

                <input placeholder="Enter Object" type="text" name="obj" text={this.state.obj} onChange={this.onChange} required/> 
                
                <MoreOptions 
                    handleDropdownChange={this.handleDropdownChange} 
                    handleSubDropdownChange={this.handleSubDropdownChange} 
                    handleTextChange = {this.handleTextChange} 
                    handleAddInput = {this.handleAddInput}
                    handleRemoveInput = {this.handleRemoveInput}
                    inputList = {this.state.inputList}></MoreOptions>
                
                <button className="btn btn-primary" onClick={this.makeSentence}> Make Sentence </button>
                {this.state.loading?<Spinner></Spinner>:
                <div>
                {this.state.sentenceCreated.length>0 && <div style={{margin: '10px 0', fontSize:'30px'}}><mark>{this.state.sentenceCreated}</mark></div>}</div>}
            </div>
        )
    }
    
}

export default Home;