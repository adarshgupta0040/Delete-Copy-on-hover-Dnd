import getAllAttributes from "./helper/getAllAttribute";

/**
 * Function responsible for converting HTML to JSON
 * @param node 
 * @returns Data in JSON Format
 * @author Shivam Vishwakarma
 */
const HTMLtoJSON=(node:HTMLElement)=> 
{
    const output:any={};
   
    //Get the node name
    const type=node.localName;

    // Set the children to innerText by default
    let children:string|string[]=node.innerText;

    if(node.children.length>0)
    {
        /*
            recursively computing all the children
            and return an array of them
        */ 
        children=[]
        for(let child of node.children)
        {
            children.push(HTMLtoJSON(child as HTMLElement));
        }
    }
    
    // get all the properties of the node
    const props=getAllAttributes(node);
    
    // If properties exist store them
    if(Object.keys(props).length)
    {
        output['props']=props;
    }

    // store the type and children
    output['children']=children;
    output['type']=type;
    return output;
}

export default HTMLtoJSON;