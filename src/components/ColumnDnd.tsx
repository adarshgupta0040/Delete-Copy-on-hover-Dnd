import React, { useState } from 'react';
import '../App.css';
import copy from "./copy.png";
import bin from "./bin.png";


const ColumnDnd = () => {

    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
        const target = event.target as HTMLElement;
        if (target) {
            target.classList.add('dragging');
        }
    }

    const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        if (target) {
            target.classList.remove('dragging');
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }



    const getDragAfterElement = (container: HTMLDivElement, y: number): HTMLElement => {
        const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)'));
        console.log(draggableElements)
        return draggableElements.reduce<{ offset: number, element: HTMLElement | null }>((closest, child) => {
            const box = (child as HTMLElement).getBoundingClientRect();
            console.log(box)
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child as HTMLElement };
            }
            else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY, element: null }).element!;
    }

    function deleteCurrentDiv(elementToDelete: HTMLElement) {

        if (elementToDelete && elementToDelete.parentNode) {
            elementToDelete.parentNode.removeChild(elementToDelete);
        }
    }


    function copyCurrentDiv(elementToCopy: HTMLElement) {
        const clonedElement = elementToCopy.cloneNode(true) as HTMLElement;
        if (elementToCopy && elementToCopy.parentNode) {
            const parent = elementToCopy.parentNode;
            parent.insertBefore(clonedElement, elementToCopy.nextSibling);

            const buttons = clonedElement.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.classList.contains("tooltip-delete") ) {
                    button.addEventListener('click', function () {
                        deleteCurrentDiv(this.parentNode as HTMLElement);
                    });
                } else if (button.classList.contains("tooltip-copy")) {
                    button.addEventListener('click', function () {
                        copyCurrentDiv(this.parentNode as HTMLElement);
                    });
                }
            });
        }
    }
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const draggedElement = document.getElementById(data);
        const target = event.target as HTMLElement;
    
        const container = event.currentTarget;
        const afterElement = getDragAfterElement(container, event.clientY);
    
        if (draggedElement) {
            const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
            clonedElement.classList.add('hover-text');
            clonedElement.classList.add('copiedelement');

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = "<img src='" + bin +"'></img>";
            
            deleteButton.classList.add('tooltip-delete');
            deleteButton.setAttribute('id', "rightdelete");
    
            const copyButton = document.createElement('button');
            
            copyButton.innerHTML = "<img src='" + copy +"'></img>";
            copyButton.setAttribute('id', "rightcopy");
            copyButton.classList.add('tooltip-copy');

            clonedElement.appendChild(deleteButton);
            clonedElement.appendChild(copyButton);
    
            // Add event listener to the button container to handle clicks on delete and copy buttons
            deleteButton.addEventListener('click', function () {
                            deleteCurrentDiv(this.parentNode as HTMLElement);
                        });

            copyButton.addEventListener('click', function () {
                            copyCurrentDiv(this.parentNode as HTMLElement);
                        });

            if (target.classList.contains('block')) {
                target.appendChild(clonedElement);
            } else {
                if (afterElement === null) {
                    container.appendChild(clonedElement);
                } else {
                    container.insertBefore(clonedElement, afterElement);
                }
            }
    
            clonedElement.classList.remove('dragging');
        }
    }
    
    



    const [imageUrl, setImageUrl] = useState(""); // Example initialization with an empty string

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result;
                setImageUrl(image as string); // Set the image URL in the state
            };
            reader.readAsDataURL(file);
        } else {
            console.log('Invalid file selected');
        }
    };



    return (
        <div id="main">

            <div id="div1" onDragOver={handleDragOver}>

                <div className="container draggable" id="column3" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="block block1 ">Block 1</div>
                </div>

                <div className="container draggable" id="column2" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className=" block block2">Block 1</div>
                    <div className=" block block2">Block 2</div>
                </div>

                <div className="container draggable" id="column1" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="block block3">Block 1</div>
                    <div className="block block3">Block 2</div>
                    <div className="block block3">Block 3</div>
                </div>

                <div className="container draggable" id="column4" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="block block4">Block 1</div>
                    <div className="block block4">Block 2</div>
                    <div className="block block4">Block 3</div>
                    <div className="block block4">Block 4</div>
                </div>



                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <img id='img' className='draggable' src={imageUrl} width='100%' style={{ }} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} />

            </div>
            <div className="droppedContainer" id="div2" onDragOver={handleDragOver} onDrop={handleDrop}>
            </div>
        </div>
    );
}

export default ColumnDnd;