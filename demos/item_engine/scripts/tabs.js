let container = null, tabs = null, tabsContainer = null;

document.addEventListener("DOMContentLoaded", function(event) {
  console.debug("dom content loaded, setting up tabs for panes");
  // references
  tabsContainer = document.getElementById("tabs");
  tabs = Array.from(tabsContainer.getElementsByClassName("tab"));
  container = document.getElementById("left");
  // setup tabs
  for (const element of tabs) {
    element.addEventListener("click", updatePage);
    element.addEventListener("auxclick", jumpToPane);
  }
  document.getElementById("default-tabs").addEventListener("click", defaultTabs);
});

function defaultTabs() {
  document.getElementById("explorer-tab").click();
  document.getElementById("tags-tab").dispatchEvent(new MouseEvent("click", { ctrlKey: true }));
  this.classList.add("active");
}

function updatePage(event) {
  if (!container || !tabs || !tabsContainer) return;
  if (!this.hasAttribute("data-pane")) return;

  // pane
  const pane = document.getElementById(this.getAttribute("data-pane"));

  // if already active, remove & make pane hidden
  if (this.classList.contains("active") && event.ctrlKey) {
    this.classList.remove("active");
    pane.classList.remove("active");
    pane.hidden = true;
    // if all panes hidden, hide container
    if (!Array.from(tabsContainer.getElementsByClassName("active")).length) container.hidden = true;
    return;
  }

  // if not holding ctrl, reset all active tabs & panes
  if (!event.ctrlKey) {
    // remove active from all other tab buttons
    for (const element of Array.from(tabsContainer.getElementsByClassName("active"))) {
      element.classList.remove("active");
    }

    // remove active from all panes and hide them
    for (const element of Array.from(container.getElementsByClassName("active"))) {
      element.classList.remove("active");
      element.hidden = true;
    }
  }

  // make the clicked tab button active
  this.classList.add("active");
  pane.classList.add("active");
  pane.hidden = false;
  container.hidden = false;
}

function jumpToPane(event) {
  if (event.button == 1) document.getElementById(this.getAttribute("data-pane")).scrollIntoView();
}
