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
    if(typeName.value)
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
    else
        alert("You need to enter a name.");
}

const addFilterType = () =>
{
    const type = createNewType();
    const newDiv = document.createElement("div");
    newDiv.textContent = type.name;
    newDiv.style.background = type.color;
    newDiv.id = type.id;
    newDiv.style.color = getContrastingTextColor(type.color);
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
    addFilterType();
    closeFilterModal(false);
});

function getContrastingTextColor(hex) 
{
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return ((r * 299 + g * 587 + b * 114) / 1000) > 125 ? "black" : "white";
}

addFilterForm.addEventListener("keydown", (e) => 
{
    if(e.key === "Enter")
    {
        e.preventDefault();
        addFilterType();
        closeFilterModal(false);
    } 
});



