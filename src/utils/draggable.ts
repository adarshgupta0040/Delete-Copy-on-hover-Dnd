const draggables:NodeListOf<Element>=document.querySelectorAll('.draggable')

draggables.forEach(draggable=>
{
    draggable.addEventListener('dragstart',()=>
    {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragstart',()=>
    {
        draggable.classList.remove('dragging')
    })
})




export {}