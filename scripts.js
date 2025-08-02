//filter bar 
const filterBar = document.getElementById("filter-bar");
const addFilterBtn = document.getElementById("add-filter-btn");
    //filter modal 
const filterModalHider = document.getElementById("hide-modal");
const ModalBackdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("cancel-filter-form");
const addFilterForm = document.getElementById("add-filter-form");
const typeName = document.getElementById("type-name");
const typeColor = document.getElementById("type-color");
const addTypeBtn = document.getElementById("add-type-btn");

const createdTypes = [];

const displayFilterModal = () => 
{
    filterModalHider.classList.remove("hidden");
}

const closeFilterModal = (confirm) =>
{
    if(confirm)
    {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if(confirmCancel)
            filterModalHider.classList.add("hidden");
    }
    else
        filterModalHider.classList.add("hidden");
}

const createNewType = () =>
{
    const name = typeName.value;
    const color = typeColor.value;
    const id = crypto.randomUUID();
    const type = 
    {
        name : name,
        color : color,
        id : id
    }
    createdTypes.push(type);
    return type;
}

const addFilterType = (type) =>
{
    const newDiv = document.createElement("div");
    newDiv.textContent = type.name;
    newDiv.style.background = type.color;
    newDiv.id = type.id;
    newDiv.classList.add("outfit-type");
    filterBar.appendChild(newDiv);
}


addFilterBtn.addEventListener("click",displayFilterModal);

closeModalBtn.addEventListener("click", (e) =>
{
        e.preventDefault();
        closeFilterModal(true);
});
ModalBackdrop.addEventListener("click",(e) =>
{
    if(!addFilterForm.contains(e.target))
        closeFilterModal(true);
});

addTypeBtn.addEventListener("click", (e) =>
{
    e.preventDefault();
    const test = createNewType();
    addFilterType(test);
    closeFilterModal(false);
});