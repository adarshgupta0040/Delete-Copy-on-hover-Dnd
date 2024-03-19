/**
 * Helper function to get all the attributes of node
 * @param node 
 * @returns Node Attribute
 * @author Shivam Vishwakarma
 */
const getAllAttributes=(node:HTMLElement) => 
{
    let obj:any={};
    for (let att, i = 0, atts = node.attributes, n = atts.length; i < n;i++)
    {
        att = atts[i];
        obj[att.nodeName] = att.nodeValue;
    }
    return obj;
}

export default getAllAttributes;