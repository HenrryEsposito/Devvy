document.querySelector("#add-time")
Quando clicar no botão
.addEventListener("click",  cloneField)


function cloneField(){
    
    const newFieldsContainers = document.querySelector(".schedule-item").cloneNode(true)

    const fields = newFieldsContainers.querySelectorAll('input')

    fields.forEach(
        function(field){
            field.value = ""
        }
    );
    
    document.querySelector("#schedule-items").appendChild(newFieldsContainers)
}
