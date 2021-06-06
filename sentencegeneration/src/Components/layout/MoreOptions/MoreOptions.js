import React from 'react';
import Select from 'react-select';


// setting up an array of objects for filling up the dropdown and their options

// Note: a model should be formed for best practices and to make it scalable
const moreOptions = [
    { value: "subjdet", label: "Subject's Determiner", type:"dropdown", values: [
        { value: "a", label: "a" },
        { value: "the", label: "the" },
        { value: "-", label: "-" },
    ]},
    { value: "subjnum", label: "Subject's Number", type:"dropdown", values: [
        { value: "singular", label: "Singular" },
        { value: "plural", label: "Plural" },
    ] },
    { value: "objdet", label: "Object's Determiner" },
    { value: "objnum", label: "Object's Number" },
    { value: "objmod", label: "Object's Modifier" },
    { value: "tense", label: "Tense", type:"dropdown", values: [
        { value: "past", label: "Past" },
        { value: "present", label: "Present" },
        { value: "future", label: "Future" },
    ]},
    { value: "progressive", label: "Progressive", type:"dropdown", values: [
        { value: "progressive", label: "Progressive" },
    ]},
    { value: "perfect", label: "Perfect", type:"dropdown", values: [
        { value: "perfect", label: "Perfect" },
    ]},
    { value: "negated", label: "Negated", type:"dropdown", values: [
        { value: "negated", label: "Negated" },
    ]},
    { value: "passive", label: "Passive", type:"dropdown", values: [
        { value: "passive", label: "Passive" },
    ]},
    { value: "sentencetype", label: "Sentence Type", type:"dropdown" , values: [
        { value: "yesno", label: "Yes/No" },
        { value: "whatobj", label: "What Object" },
        { value: "whosubj", label: "Who Subject" },
    ]},

];

const MoreOptions = (props) => {
    
    // modifying the list when any key of optional params selected
    const handleDropdownChange = (selectedOption, index) => {
        const list = [...props.optionalParams];
        list[index].selectedOption = selectedOption;
        props.handleDropdownChange(list);
    };

    // modifying the list when any value of optional params selected from a dropdown
    const handleSubDropdownChange = (selectedOption, index) => {
        const list = [...props.optionalParams];
        list[index].selectedSubOption = selectedOption;
        props.handleSubDropdownChange(list);
    };

    // modifying the list when any value of optional params enter from a textfield
    const handleTextChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...props.optionalParams];
        list[index][name] = value;
        props.handleTextChange(list);
    };

    // adding default value into the list when click on Add button
    const handleAddInput = () => {
        const list = [...props.optionalParams, {selectedOption:null, text:""}];
        props.handleAddInput(list);
    }

    // removing object of optional params from the list when click on remove button
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
                <div key={i} className="row col-sm-12 bg-light bg-radius p m-1">
                    <div className="col-sm-4 m-1 p-0">
                        <Select
                            value={item.selectedOption}
                            onChange={(e)=>handleDropdownChange(e,i)}
                            options={moreOptions}
                            placeholder="Select"/>
                    </div>

                    {item.selectedOption?.type==="dropdown"? <div className="col-sm-3 m-1 p-0"><Select
                        value={item.selectedSubOption}
                        onChange={(e)=>handleSubDropdownChange(e,i)}
                        options={item.selectedOption.values}
                        placeholder="Select"
                        /></div> : <div className="col-sm-3 m-1 p-0 ">
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
                </div>
                )
            })}
        </div>
      );
}

export default MoreOptions;