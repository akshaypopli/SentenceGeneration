import React from 'react';
import Select from 'react-select';

const moreOptions = [
    { value: "subjdet", label: "Subject's Determiner" },
    { value: "subjnum", label: "Subject's Number" },
    { value: "objdet", label: "Object's Determiner" },
    { value: "objnum", label: "Object's Number" },
    { value: "objmod", label: "Object's Modifier" },
    { value: "tense", label: "Tense", type:"dropdown", values: [
        { value: "past", label: "Past" },
        { value: "present", label: "Present" },
        { value: "future", label: "Future" },
    ]},
    { value: "progressive", label: "Progressive" },
    { value: "perfect", label: "Perfect" },
    { value: "negated", label: "Negated" },
    { value: "passive", label: "Passive" },
    { value: "sentencetype", label: "Sentence Type", type:"dropdown" , values: [
        { value: "yesno", label: "Yes/No" },
        { value: "whatobj", label: "What Object" },
        { value: "whosubj", label: "Who Subject" },
    ]},

];

const MoreOptions = (props) => {
    
    const handleDropdownChange = (selectedOption, index) => {
        const list = [...props.optionalParams];
        list[index].selectedOption = selectedOption;
        props.handleDropdownChange(list);
    };

    const handleSubDropdownChange = (selectedOption, index) => {
        const list = [...props.optionalParams];
        list[index].selectedSubOption = selectedOption;
        props.handleSubDropdownChange(list);
    };

    const handleTextChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...props.optionalParams];
        list[index][name] = value;
        props.handleTextChange(list);
    };

    const handleAddInput = () => {
        const list = [...props.optionalParams, {selectedOption:null, text:""}];
        props.handleAddInput(list);
    }

    const handleRemoveInput = (index) => {
        const list = [...props.optionalParams];
        list.splice(index, 1);
        props.handleRemoveInput(list);
    }

    

    return (
        <div>
            <label className="m-1"><b>Optional Parameters: </b></label>
            {props.optionalParams.map((item, i)=>{
                return (
                <div key={i} className="row col-sm-12 c-border bg-light p m-1">
                    <div className="col-sm-4 m-1 p-0">
                        <Select
                        value={item.selectedOption}
                        onChange={(e)=>handleDropdownChange(e,i)}
                        options={moreOptions}
                        placeholder="Select"
                        />
                    </div>

                    {item.selectedOption?.type==="dropdown"? <div className="col-sm-3 m-1 p-0"><Select
                        
                        value={item.selectedSubOption}
                        onChange={(e)=>handleSubDropdownChange(e,i)}
                        options={item.selectedOption.values}
                        placeholder="Select"
                        /></div>:<div className="col-sm-3 m-1 p-0 ">
                        <input placeholder="Enter Value" 
                        type="text" 
                        name="text" 
                        value={item.text} 
                        onChange={(e)=>handleTextChange(e,i)}/>
                    </div>}
                    
                    {props.optionalParams.length !== 1  && <input 
                        type="button"
                        value="Remove"
                        className="col-sm-2 btn btn-danger m-1"
                        onClick={()=>handleRemoveInput(i)}
                    />}

                    {props.optionalParams.length-1 === i && <input 
                        type="button"
                        value="Add"
                        className="col-sm-2 btn btn-primary m-1"
                        onClick={handleAddInput}
                    />}
                    
                    {/* <div>{JSON.stringify(item)}</div> */}
                </div>
                )
            })}
        </div>
        

        
      );
  
}

export default MoreOptions;