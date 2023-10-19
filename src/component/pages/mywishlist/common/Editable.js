import ContentEditable from 'react-contenteditable';
import {useCallback, useState} from "react";
import sanitizeHtml from "sanitize-html";

const Editable = ({html,handleChange,  width}) => {
    // const [content, setContent] = useState(html);
     const onContentChange = useCallback( evt => {
        const sanitizeConf = {
            allowedTags: ["b","i", "a"],
            allowedAttributes: {a: ["href"]}
        }
        handleChange(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
    }, []);

    return (
        <ContentEditable
            className="editable-div"
            style={{minWidth: `${width}px`}}
            onBlur={onContentChange}
            onChange={onContentChange}
            html={html}/>
    )
}

export default Editable;