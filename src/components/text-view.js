import './text-view.css'

export function TextView(props) {
    return (
        <div className="textview">
            <span className="title">Текст:</span>
            <textarea className="textview-input"></textarea>
        </div>
    )
}