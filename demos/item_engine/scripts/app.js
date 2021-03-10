class Display extends EventTarget {
  constructor() {
    super();
    this.element = null;
    this.json = null;
  }

  // re-rendering the whole object should be avoided when possible, and
  // reserved for things like the initial render or reprocessing after bulk changes
  render() {
    //
  }

  renderCode() {
    document.getElementById("json").value = JSON.stringify(app.data, null, 2);
  }

  clear() {
    document.getElementById("json").value = "";
  }

}

const app = {
  data: null,
  file: {
    name: null,
    data: null,
  },
  hasFile: () => app.data && app.file.name && app.file.data,
  hasChanges: () => app.hasFile() && (app.data !== app.file.data),
  selection: [],
  hasSelection: () => app.selected.length,
  multipleItemsSelected: () => app.selected.length > 1,
  display: new Display(),
};


// Start up


document.addEventListener("DOMContentLoaded", function(event) {
  console.debug("dom content loaded, adding event listeners");
  // App
  document.getElementById("new").addEventListener("click", newFile);
  document.getElementById("browse").addEventListener("click", browseFiles);
  document.getElementById("save").addEventListener("click", saveFile); // Save file should be accessible via ctrl+s too
  document.getElementById("rename").addEventListener("click", renameFile);
  document.getElementById("close").addEventListener("click", closeFile);
  document.getElementById("file").addEventListener("change", handleInput);
  // Display
  document.getElementById("json").addEventListener("change", editCode);
  app.display.element = document.getElementById("display");
  app.display.addEventListener("test", function(e) {
    console.log("hello world, display!");
  });
  app.display.dispatchEvent(new CustomEvent("test"));
});


// Misc Functions


function parseJson(value) {
  try {
    const result = JSON.parse(value);
    if (result && typeof result === "object") {
      return result;
    }
  } catch (error) {
    return false;
  }
  return false;
}


// App Functions


function setName(name) {
  document.getElementById("fileName").textContent = name;
  app.file.name = name;
}

function renameFile(event) {
  if (this.classList.contains("disabled")) return;
  if (!app.hasFile()) return;
  const name = prompt("File name?");
  if (!name) return;
  setName(name);
}

function saveFile() {
  if (this.classList.contains("disabled")) return;
  const download = document.getElementById("download");
  download.href = window.URL.createObjectURL(new Blob([JSON.stringify(app.data)], { type: "application/json" }));
  download.download = app.file.name;
  download.click();
}

// Used to prompt the user when changes are unsaved prior to something which will wipe them
function promptSaving() {
  if (!app.hasChanges()) return true;
  if (confirm("Do you wish to save your changes?")) {
    saveFile();
    return true;
  } else {
    return false;
  }
}

function loadFile(name, data) {
  setName(name);
  app.data = data;
  app.file.data = data;
  // display
  app.display.render();
  app.display.renderCode();
  // activate
  document.getElementById("json").removeAttribute("disabled");
  document.getElementById("save").classList.remove("disabled");
  document.getElementById("rename").classList.remove("disabled");
  document.getElementById("close").classList.remove("disabled");
}

function unloadFile(fullReset = false) {
  // Some applications of unloadFile don't need to bother changing the state of these
  // because it's being used directly before the loading of a new file
  if (fullReset) {
    document.getElementById("json").disabled = true;
    document.getElementById("save").classList.add("disabled");
    document.getElementById("rename").classList.add("disabled");
    document.getElementById("close").classList.add("disabled");
    document.getElementById("fileName").textContent = "No file loaded";
  }
  app.display.clear();
  // TODO: Display needs to be reset/cleared right about here
  // That on it's own will probably clear selection?
  if (app.hasSelection) {
    app.selected = [];
  }
  app.data = null;
  app.file.name = null;
  app.file.data = null;
}

function newFile() {
  if (!promptSaving()) return;
  const name = prompt("File name?");
  if (!name) return;
  if (app.hasFile()) unloadFile();
  loadFile(name, {});
}

// Used to handle the file input change event
function handleInput() {
  if (!this.files.length) return;
  if (app.hasFile()) unloadFile();
  console.log(this.files[0]);
  const reader = new FileReader();
  reader.addEventListener("load", function(event) {
    const json = parseJson(event.target.result);
    if (!json) return;
    loadFile(this.files[0].name, json);
  }.bind(this));
  reader.readAsText(this.files[0]);
}

function browseFiles(event) {
  if (!promptSaving()) return;
  // Make use of hidden file input
  document.getElementById("file").click();
}

function closeFile(event) {
  if (this.classList.contains("disabled")) return;
  if (!promptSaving()) return;
  unloadFile(true);
}


// Display Functions


function editCode(event) {
  const json = parseJson(event.target.value);
  if (!json) return;
  // TODO: this should alert the user and handle invalid json
  app.data = json;
  app.display.render();
  // Honestly, starting to hit limits of what's in-scope for a single js file app.
  // When is it worth it to give up or start using libraries, like monaco?
}
