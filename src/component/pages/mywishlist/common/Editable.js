import ContentEditable from 'react-contenteditable';

const Editable = ({html, handleChange}) => {
     console.log('html :' + html);
    return (
        <ContentEditable
            className="editable-div"
            onChange={(e) => handleChange(e)}
            html={html}/>
    )
}

export default Editable;