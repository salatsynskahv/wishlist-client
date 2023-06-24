import ContentEditable from 'react-contenteditable';

const Editable = ({html, handleChange, width}) => {
    return (
        <ContentEditable
            className="editable-div"
            style={{minWidth: `${width}px`}}
            onChange={(e) => handleChange(e)}
            html={html}/>
    )
}

export default Editable;