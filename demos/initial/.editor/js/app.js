const app = {
  selected: [],
  hasSelection: () => app.selected.length,
  multipleItemsSelected: () => app.selected.length > 1,
  display: {
    type: "table",
    selected: [],
    items: null,
  },
  table: {
    validItemClick: (element, event) => (event.target === element || event.target.classList.contains("cell")),
  },
};

document.addEventListener("DOMContentLoaded", function(event) {
  console.debug("dom content loaded, running start up code");
  const display = document.getElementById("display");
  app.display.items = Array.from(display.getElementsByClassName("item"));
  for (const element of app.display.items) {
    element.addEventListener("click", itemClick, { useCapture: true });
  }
});

// item Click
// item Ctrl Click
// item Double Click
// item Drag
// background Click

// item clicks should only occur if its direct and not elements in them

function itemClick(event) {
  if (!app[app.display.type].validItemClick(this, event)) return;
  console.debug(`${app.display.type} item ${event.ctrlKey ? "clicked w/ ctrl" : "clicked"}`);
  // Select Item
  const indexPosition = app.display.items.indexOf(this);
  if (event.ctrlKey) {
    if (app.selected.includes(indexPosition)) {
      app.selected = app.selected.filter(item => item !== indexPosition);
      app.display.selected = app.display.selected.filter(item => item !== this);
      this.classList.remove("selected");
    } else {
      app.selected.push(indexPosition);
      app.display.selected.push(this);
      this.classList.add("selected");
    }
  } else {
    if (app.selected.includes(indexPosition) && !app.multipleItemsSelected()) return console.debug("item was already selected");
    app.selected = [indexPosition];
    app.display.selected = [this];
    for (const element of Array.from(document.getElementById("display").getElementsByClassName("selected"))) {
      element.classList.remove("selected");
    }
    this.classList.add("selected");
  }
  document.getElementById("selected-test").textContent = app.selected.map(n => n + 1).sort((a, b) => a - b).join(", ");
}

/*
const app = {
  file: {
    name: null,
    info: null,
    data: null,
  },
  externalFiles: [],
  data: {},
};

document.addEventListener("DOMContentLoaded", function(event) {
  console.debug("Adding app event listeners");
  const fileInput = document.getElementById("file");
  // Open file button
  document.getElementById("open").addEventListener("click", function(mouseEvent) {
    fileInput.click();
  });
  // On change event
  fileInput.addEventListener("change", openFile, false);
});

function openFile() {
  if (!this.files.length) return;
  // need to use hashing or paths instead of names
  if (this.files[0].name !== app.file.name) {
    app.file.name = this.files[0].name;
    app.file.info = this.files[0];

    console.debug("Selected file ", app.file.name, app.file.info.type);
    document.getElementById("selected-file").textContent = app.file.name;

    console.debug(app.file.info);

    fetch(app.file.name)
      .then(response => response.json())
      .then(data => console.debug(data));
  }
}
*/

// async function loadFile() {
//   const file = await fetch(data.file);

// }

// function closeFile() {

// }
