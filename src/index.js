import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const executionConditions = ["команда", "представление+кнопка", "inline-кнопка"]

function CreateViewMain(props) {
    const executionConditions = props.executionConditions;
    const options = executionConditions.map((executionCondition) =>  <option key={executionCondition}>{executionCondition}</option>);
    return (<div className="container">
                <h1>Окно создания представлений</h1>
                <div>
                    <span>Выбрать условие выполнения:</span>
                    <select>
                        {options}
                    </select>
                </div>
            </div>);
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions}></CreateViewMain>,
  document.getElementById('root')
);
