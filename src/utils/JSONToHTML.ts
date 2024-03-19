/**
 * Function responsible for converting the JSON Data into the HTML.
 * @param json 
 * @returns HTML Template
 * @author Shivam Vishwakarma
 */
const JSONToHTML=(json:any):DocumentFragment=>
{
    const fragement=document.createDocumentFragment();

    if(Array.isArray(json))
    {
        // convert each entry of array to DOM element
        for(let entry of json)
        {
            // create the element
            const element=document.createElement(entry.type)

            // if props available then setting them
            if(entry.props)
            {
                for(let key in entry.props)
                {
                    element.setAttribute(key,entry.props[key])
                }
            }
            if(Array.isArray(entry.children))
            {
                // recursively convert the children to DOM and assign them
                for(let child of entry.children)
                {
                    element.appendChild(JSONToHTML(child))
                }
            }
            else
            {
                element.innerText=entry.children
            }

            // add the element back to the fragment
            fragement.appendChild(element)
        }
    }
    /*
        if not array then recursively call the same function and 
        pass the entry as an array.
    */ 
    else
    {
        return JSONToHTML([json])
    }
    return fragement;
}

export default JSONToHTML;