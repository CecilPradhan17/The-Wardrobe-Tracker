//filter bar 
const filterBar = document.getElementById("filter-bar");
const addFilterBtn = document.getElementById("add-filter-btn");
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

const createdTypes = [];

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
}

const closeFilterModal = (confirm) =>
{
    if(confirm)
    {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if(confirmCancel)
            filterModalHider.classList.add("hidden");
            addFilterFormContainer.classList.remove("modal-active");
            addFilterFormContainer.classList.add("hidden");
    }
    else
    {
        filterModalHider.classList.add("hidden");
        addFilterFormContainer.classList.add("hidden");
        addFilterFormContainer.classList.remove("modal-active");
        addFilterFormContainer.classList.add("hidden");
    }
}

const closeOutfitModal = (confirm) =>
{
    if(confirm)
    {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if(confirmCancel)
            filterModalHider.classList.add("hidden");
            outfitFormContainer.classList.remove("modal-active");
            outfitFormContainer.classList.add("hidden");
    }
    else
    {
        filterModalHider.classList.add("hidden");
        outfitFormContainer.classList.add("hidden");
        outfitFormContainer.classList.remove("modal-active");
        outfitFormContainer.classList.add("hidden");
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
    if(!addFilterForm.contains(e.target) && !addFilterFormContainer.classList.contains("hidden"))
        closeFilterModal(true);
    if(!outfitForm.contains(e.target) && !outfitFormContainer.classList.contains("hidden"))
        closeOutfitModal(true);
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

outfitForm.addEventListener("keydown", (e) => 
{
    if(e.key === "Enter")
    {
        e.preventDefault();
        addFilterType();
        closeOutfitModal(false);
    } 
});


outfitPhoto.addEventListener("change", () => 
{
  const file = outfitPhoto.files[0];
  console.log("Selected file:", file);
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("File loaded, setting preview src");
      outfitPreview.src = reader.result;
      outfitPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    console.log("No file selected");
    outfitPreview.src = "";
    outfitPreview.style.display = "none";
  }
});

addOutfitBtn.addEventListener("click", displayOutfitModal);


/* to-do for today: 
1. finish the html and css for the outfit form
2. understand how the picture preview works
3. Add the select outfit types section
4. complete the js for the outfit form
5. display the outfits in the screen 
6. look into json storage */
