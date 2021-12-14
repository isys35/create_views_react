import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MainSaveButton } from './components/buttons/edit_buttons/edit-buttons';
import { CancelButton } from './components/buttons/edit_buttons/edit-buttons';
import { ButtonView } from  './components/buttons/tg_buttons/telegram-buttons';
import { TextView } from './components/text-view'
import { SelectTrigger } from  './components/trigger';
import { Trigger } from  './components/trigger';

const executionConditions = [
    {text:"команда", value:'command-trigger'},
    {text:"представление", value:'view-trigger'},
]





class CreateViewMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: executionConditions[0].value,
            selected_command: null,
            text: null,
            buttons: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.setSelectedCommand = this.setSelectedCommand.bind(this);
    }

    handleChange(value) {
        this.setState({trigger: value});
    }
    
    setSelectedCommand(command_id) {
        this.setState({selected_command: command_id});
    };

    render() {
        const executionConditions = this.props.executionConditions;
        return (
            <div className="container">
                <h1>Cоздание шага</h1>
                <div className="create-view">
                    <SelectTrigger executionConditions={executionConditions} handleChange={this.handleChange} />
                    <Trigger trigger={this.state.trigger} setSelectedCommand={this.setSelectedCommand}/>
                    <TextView />
                    <ButtonView />
                    <div className="row-save-button">
                        <MainSaveButton />
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
