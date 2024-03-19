import React from 'react';
import '../App.css';
import HTMLtoJSON from '../utils/HTMLToJSON';
import JSONToHTML from '../utils/JSONToHTML';
import { uniqueId } from 'underscore';

const Droppable=()=> 
{
    const json=()=>
    {
        const element=document.getElementById("div2");
        if(element)
        {
            const jsondata=HTMLtoJSON(element)
            console.log(jsondata)
            const htmlData=JSONToHTML(jsondata)
            console.log(htmlData)
        }
    }

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();
    }

    const drag = (event: React.DragEvent<HTMLElement>) => 
    {
        event.dataTransfer.setData('text', event.currentTarget.id);
    }

    const drop = (event: React.DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();
        console.log(event)
        const data = event.dataTransfer.getData('text');
        console.log(data)
        const draggedElement = document.getElementById(data);
        const target = event.target as HTMLElement;
        const clonedElement = draggedElement?.cloneNode(true) as HTMLElement;
        // if(draggedElement===null)
        // {
        //     return null;
        // }
        // const id=uniqueId()
        // clonedElement.id=id
        if (draggedElement && target.classList.contains('block')) 
        {
            target.appendChild(clonedElement);
        }
        else
        {
            target.appendChild(clonedElement)
        }
    }

    return (
        <div id="main">
            <button onClick={()=>{json()}}>JSON</button>
            <div id="div1" onDrop={drop} onDragOver={allowDrop}>
                <div className="container" id="column1" draggable onDragStart={drag}>
                    <div className="block">Block 1</div>
                    <div className="block">Block 2</div>
                    <div className="block">Block 3</div>
                </div>

                <img id='img' src='https://reactjs.org/logo-og.png' height='40px' alt='React Image' draggable onDragStart={drag}/>

                <button id="drag1" draggable onDragStart={drag}>
                    Button 1
                </button>

            </div>
            <div className="droppedContainer" id="div2" onDrop={drop} onDragOver={allowDrop}>
                <p className='draggable' draggable>Hello There</p>
            </div>
        </div>
    );
}

export default Droppable;
