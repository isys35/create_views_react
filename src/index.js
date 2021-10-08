import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const HOST = 'http://127.0.0.1:8000/'

const executionConditions = [
    {title:"команда", value:'command-trigger'},
    {title:"представление", value:'view-trigger'},
]


function Trigger(props) {
    const trigger = props.trigger
    const component = (trigger === 'command-trigger') ? <CommandTrigger /> : <ViewTrigger />
    return component
}


class CreateCommand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '/'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit() {
        this.props.handleSubmitCreate(this.state.value);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <span className="title">Создать комманду:</span>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Сохранить"/>
                    <button onClick={this.props.handleCancelCreate}>Отмена</button>
                </form>
            </div>
        )
    }

}


class CommandOptions extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {options: [<option>/start</option>]}
    }

    componentDidMount() {
        fetch(HOST + 'commands')
            .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                        options: result.map((item) =>   <option
                                                            key={item.value}
                                                            value={item.value}>
                                                            {item.value}
                                                        </option>)
                            });
                        }
                    )

    }

    render() {
        return (<select>
                    {this.state.options}
                </select>)
    }
}
    

function SelectCommand(props) {
    return (<div className="row-select">
                <span className="title">Комманда:</span>
                <div>
                    <CommandOptions />
                    <button>🛠️</button>
                </div>
            </div>
            )
}

function ChangeCommands(props) {
    return (<div className="row-select">
                <span className="title">Редактировать комманды:</span>
                <div>
                    <CommandOptions />
                    <button>DEL</button>
                    <button>CHNG</button>
                    <button>CNCL</button>
                    <button>add</button>
                </div>
            </div>
            )
}


function TextView(props) {
    return (
        <div>
            <textarea></textarea>
        </div>
    )
}

class CommandTrigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: 'select'};
    }
    render() {
        return (this.state.action === 'select') ? <SelectCommand /> : <SelectCommand />
    }

}

// class CommandTrigger extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {action: 'select', commands: []};
//         this.handleCreate = this.handleCreate.bind(this);
//         this.handleCancelCreate = this.handleCancelCreate.bind(this);
//         this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
//     }
//
//     componentDidMount() {
//         fetch(HOST + 'commands')
//             .then(res => res.json())
//                 .then(
//                     (result) => {
//                         this.setState({
//                         commands: result.map(item => item.value)
//                             });
//                         }
//                     )
//
//     }
//
//
//     handleCreate() {
//         this.setState({action: 'create'});
//     }
//
//     handleCancelCreate() {
//         this.setState({action: 'select'});
//     }
//    
//     handleSubmitCreate(value) {
//         this.setState({action: 'select'});
//         this.setState({
//             commands: [...this.state.commands, value]
//         });
//     }
//    
//     render() {
//         const commands = this.state.commands; // TODO: Получаем из api
//         const commandsOptions = commands.map((command) =>
//             <option
//                 key={command}
//                 value={command}>
//                     {command}
//             </option>);
//         const component = (this.state.action === 'select')
//                                                             ? <SelectCommand commandsOptions={commandsOptions}
//                                                                             handleCreate={this.handleCreate}/>
//                                                             : <CreateCommand handleCancelCreate={this.handleCancelCreate}
//                                                                              handleSubmitCreate={this.handleSubmitCreate}/>
//         return (component)
//        
//     }
//
// }



function ViewTrigger(props) {
    return (<div>
                <div className="row-select">
                    <span>Представление:</span>
                </div>
            </div>
    )
}


class ButtonsField extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const buttons = this.props.buttons.map((button) =>
            <div className="button-view"><span key={button}>{button}</span></div>);
        return (
            <div>
                {buttons}
            </div>
        )
    }

}


class ButtonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buttons: []};
        this.addButton = this.addButton.bind(this);
    }

    addButton() {
        this.setState({
            buttons: [...this.state.buttons, 'Кнопка']
        });
    }
    
    render() {
        const buttons = ['ReplyKeyboard', 'InlineKeyboard'];
        const options = buttons.map((button) =>
            <option
                key={button}
                value={button}>
                    {button}
            </option>);
        return (
            <div>
                <div className="row-select">
                    <span className="title">Тип кнопок:</span>
                    <div>
                        <select>
                            {options}
                        </select>
                        <button onClick={this.addButton}>+</button>
                    </div>
                </div>
                <div>
                    <span className="title">Кнопки:</span>
                    <ButtonsField buttons={this.state.buttons}/>
                </div>
            </div>
    )
    }
}





class CreateViewMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {trigger: executionConditions[0].value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({trigger: event.target.value});
    }

    render() {
        const executionConditions = this.props.executionConditions;
        const options = executionConditions.map((executionCondition) =>
            <option
                key={executionCondition.title}
                value={executionCondition.value}>
                    {executionCondition.title}
            </option>);
        return (

            <div className="container">
                <h1>Cоздание представления</h1>
                <div className="create-view">
                    <div className="row-select">
                        <span className="title">Условие выполнения:</span>
                        <select onChange={this.handleChange}>
                            {options}
                        </select>
                    </div>
                    <Trigger trigger={this.state.trigger}/>
                    <TextView />
                    <ButtonView buttonsField={<ButtonsField />}/>
                    <div className="save-button">
                        <button>Сохранить</button>
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
