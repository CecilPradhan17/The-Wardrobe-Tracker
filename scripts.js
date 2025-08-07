//filter bar 
const filterBar = document.getElementById("filter-bar");
const addFilterBtn = document.getElementById("add-filter-btn");
const removeFilterBtn = document.getElementById("remove-filter-btn");
    //filter modal 
const filterModalHider = document.getElementById("hide-modal");
const ModalBackdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("cancel-filter-form");
const addFilterForm = document.getElementById("add-filter-form");
const addFilterFormContainer = document.getElementById("add-filter-form-container");
const typeName = document.getElementById("type-name");
const typeColor = document.getElementById("type-color");
const addTypeBtn = document.getElementById("add-type-btn");

//project-controls section
const addOutfitBtn = document.getElementById("add-outfit-btn");
    //add outfit modal 
const outfitFormContainer = document.getElementById("add-outfit-form-container");
const outfitForm = document.getElementById("add-outfit-form");
const outfitPhoto = document.getElementById("outfit-photo");
const outfitPreview = document.getElementById("outfit-preview");
const outfitName = document.getElementById("outfit-name");
const cancelOutfitBtn = document.getElementById("cancel-outfit-form");
const submitOutfitBtn = document.getElementById("submit-outfit-btn");
        //select tags container
const selectedTagsContainer = document.getElementById("select-tags-container");

//outfits-container section
const outfitsContainer = document.getElementById("outfits-container");


const createdTypes = {};
const createdOutfits = {};
const selectedTypes = new Set();
const selectedTags = new Set();
const deleteTypes = new Set();

let currentPhotoDataURL = "";

const displayFilterModal = () => 
{
    filterModalHider.classList.remove("hidden");
    addFilterFormContainer.classList.remove("hidden");
    addFilterFormContainer.classList.add("modal-active");
}

const displayOutfitModal = () =>
{
    filterModalHider.classList.remove("hidden");
    outfitFormContainer.classList.remove("hidden");
    outfitFormContainer.classList.add("modal-active");
    showAllFilterTags();
}

const closeFilterModal = (confirm) =>
{
    if(confirm)
    {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if(confirmCancel)
        { 
            filterModalHider.classList.add("hidden");
            addFilterFormContainer.classList.remove("modal-active");
            addFilterFormContainer.classList.add("hidden");
        }
    }
    else
    {
        filterModalHider.classList.add("hidden");
        addFilterFormContainer.classList.add("hidden");
        addFilterFormContainer.classList.remove("modal-active");
    }
}

const closeOutfitModal = (confirm) =>
{
    if(confirm)
    {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if(confirmCancel)
        {
            filterModalHider.classList.add("hidden");
            outfitFormContainer.classList.remove("modal-active");
            outfitFormContainer.classList.add("hidden");
        }
    }
    else
    {
        filterModalHider.classList.add("hidden");
        outfitFormContainer.classList.add("hidden");
        outfitFormContainer.classList.remove("modal-active");
    }
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
        };
        createdTypes[id] = type;
        renderFilterType();
    }
    else
        alert("You need to enter a name.");
}

const renderFilterType = () =>
{
    filterBar.innerHTML = "";

    Object.values(createdTypes).forEach((type) => 
    {
        const newDiv = document.createElement("div");
        newDiv.textContent = type.name;
        newDiv.style.background = type.color;
        newDiv.id = type.id;
        newDiv.classList.add("outfit-type");
        newDiv.style.color = getContrastingTextColor(type.color);

        newDiv.addEventListener("click", () => 
        {   
            if(!filterBar.classList.contains("deleteSelection"))
            {
                if (selectedTags.has(newDiv.id))
                {
                    newDiv.classList.remove("selected");
                    selectedTags.delete(newDiv.id);
                    displayCreatedOutfits();
                }
                else
                {
                    newDiv.classList.add("selected");
                    selectedTags.add(newDiv.id);
                    displayCreatedOutfits();
                }
            }
            else
            {
                if (deleteTypes.has(newDiv.id))
                {
                    newDiv.classList.remove("delete");
                    deleteTypes.delete(newDiv.id);
                }
                else
                {
                    newDiv.classList.add("delete");
                    deleteTypes.add(newDiv.id);
                }
            }
        });
        filterBar.appendChild(newDiv);
    });
}

const addCreatedOutfit = () =>
{
    const name = outfitName.value;
    const id = crypto.randomUUID();
    const outfit = 
    {
        name : name,
        photo : currentPhotoDataURL,
        filters : Array.from(selectedTypes),
        id : id
    };
    createdOutfits[outfit.id] = outfit;
    displayCreatedOutfits();
    selectedTypes.clear();
}


addFilterBtn.addEventListener("click",displayFilterModal);

closeModalBtn.addEventListener("click", (e) =>
{
        e.preventDefault();
        closeFilterModal(true);
});

ModalBackdrop.addEventListener("click",(e) =>
{
    if(!addFilterForm.contains(e.target) && !addFilterFormContainer.classList.contains("hidden"))
        closeFilterModal(true);
    if(!outfitForm.contains(e.target) && !outfitFormContainer.classList.contains("hidden"))
        closeOutfitModal(true);
});

addTypeBtn.addEventListener("click", (e) =>
{
    e.preventDefault();
    createNewType();
    closeFilterModal(false);
});

submitOutfitBtn.addEventListener("click", (e) =>
{
    e.preventDefault();
    if(outfitPhoto.value)
    {
        if(selectedTypes.size != 0)
        {
            addCreatedOutfit();
            closeOutfitModal(false); 
        }
        else
        {
            alert("You need to select atleast one outfit type");
        }
    }
    else
    {
        alert("You need to upload a photo");
    }
});

const getContrastingTextColor = hex =>
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
        createNewType();
        closeFilterModal(false);
    } 
});

outfitForm.addEventListener("keydown", (e) => 
{
    if(e.key === "Enter")
    {
        e.preventDefault();
        addCreatedOutfit();
        closeOutfitModal(false);
    } 
});


outfitPhoto.addEventListener("change", () => 
{
  const file = outfitPhoto.files[0];
  if(file) 
  {
    const reader = new FileReader();
    reader.onload = () => 
        {
            outfitPreview.src = reader.result;
            currentPhotoDataURL = reader.result;
        };
    reader.readAsDataURL(file);
  } 
});

const showAllFilterTags = () =>
{
    selectedTagsContainer.innerHTML = "";

    Object.values(createdTypes).forEach((type) => 
    {
        const newDiv = document.createElement("div");
        newDiv.textContent = type.name;
        newDiv.style.background = type.color;
        newDiv.id = type.id;
        newDiv.classList.add("outfitType");
        newDiv.style.color = getContrastingTextColor(type.color);

        newDiv.addEventListener("click", () => 
        {
            if (selectedTypes.has(type.id)) 
            {
                selectedTypes.delete(type.id);
                newDiv.classList.remove("selected");
            } 
            else 
            {
                selectedTypes.add(type.id);
                newDiv.classList.add("selected");
            }
        });
        selectedTagsContainer.appendChild(newDiv); 
    });
}

addOutfitBtn.addEventListener("click", displayOutfitModal);
cancelOutfitBtn.addEventListener("click",closeOutfitModal);

const displayCreatedOutfits = () =>
{ 
    outfitsContainer.innerHTML = "";
    Object.values(createdOutfits).forEach((outfit) => 
    {
        if(selectedTags.size === 0 || outfit.filters.some(type => selectedTags.has(type)))
        {
            const newDiv = document.createElement("div");
            newDiv.classList.add("outfitHolder");
            const outfitImage = document.createElement("img");
            outfitImage.classList.add("outfitImage");
            outfitImage.id = outfit.id;
            outfitImage.src = outfit.photo;
            newDiv.appendChild(outfitImage);
            outfitsContainer.appendChild(newDiv);
        }
    });
};

removeFilterBtn.addEventListener("click", () => 
{
    if (removeFilterBtn.textContent === "remove filter")
    {
        filterBar.classList.add("deleteSelection");
        removeFilterBtn.classList.add("delete");
        removeFilterBtn.textContent = "delete";
    }
    else
    {
        filterBar.classList.remove("deleteSelection");
        removeFilterBtn.classList.remove("delete");
        removeFilterBtn.textContent = "remove filter";
        Object.values(createdTypes).forEach((type) =>
        {
            if (deleteTypes.has(type.id))
            {
                delete createdTypes[type.id];
            }
        });
        renderFilterType();
    }
});

/* to-do: 
1. add select/deselect on the filter bar /
2. add filter feature when selected /
3. delete filter option /
4. delete outfit option
5. storage in JSON 
*/