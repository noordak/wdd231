const checklistItems = document.querySelectorAll(
    '.checklist input[type="checkbox"]'
);

const CHECKLIST_KEY = "disneyland-packing-checklist";


function loadChecklist() {

    const savedChecklist =
        JSON.parse(
            localStorage.getItem(CHECKLIST_KEY)
        ) || [];

    checklistItems.forEach((item, index) => {

        item.checked =
            savedChecklist.includes(index);

    });
}


function saveChecklist() {

    const checkedItems = [];

    checklistItems.forEach((item, index) => {

        if (item.checked) {
            checkedItems.push(index);
        }

    });

    localStorage.setItem(
        CHECKLIST_KEY,
        JSON.stringify(checkedItems)
    );
}


checklistItems.forEach(item => {

    item.addEventListener("change", saveChecklist);

});


loadChecklist();