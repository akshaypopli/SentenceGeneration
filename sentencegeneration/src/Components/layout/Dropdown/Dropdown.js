import React, { useState } from 'react';
import Select from 'react-select';


const Dropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // const onSelect = () => {
  //   props.sendDataToParent(selectedOption);
  // }
  
  return (
    <div>
      <Select
        
        value={selectedOption}
        onChange={setSelectedOption}
        options={props.data}
        placeholder="Sentence Type"
      />
    </div>
  );
}

export default Dropdown;