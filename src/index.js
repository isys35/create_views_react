import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SaveButton } from './components/buttons/edit_buttons/edit-buttons'
import { ButtonView } from  './components/buttons/tg_buttons/telegram-buttons'
import { SelectTrigger } from  './components/trigger'
import { Trigger } from  './components/trigger'

const executionConditions = [
    {text:"команда", value:'command-trigger'},
    {text:"представление", value:'view-trigger'},
]



function TextView(props) {
    return (
        <div>
            <textarea className="textview-input"></textarea>
        </div>
    )
}





class CreateViewMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {trigger: executionConditions[0].value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({trigger: value});
    }

    render() {
        const executionConditions = this.props.executionConditions;
        return (

            <div className="container">
                <h1>Cоздание шага</h1>
                <div className="create-view">
                    <SelectTrigger executionConditions={executionConditions} handleChange={this.handleChange} />
                    <Trigger trigger={this.state.trigger}/>
                    <TextView />
                    <ButtonView />
                    <div className="row-save-button">
                        <SaveButton />
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
