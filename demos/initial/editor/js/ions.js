document.addEventListener("DOMContentLoaded", (event) => {
  console.debug("Adding event listeners for tabs and view toggles");
  // Left
  document.getElementById("tab-file-explorer").addEventListener("click", updatePage);
  document.getElementById("tab-item-explorer").addEventListener("click", updatePage);
  document.getElementById("tab-tags").addEventListener("click", updatePage);
  document.getElementById("tab-search").addEventListener("click", updatePage);
  document.getElementById("tab-history").addEventListener("click", updatePage);
  document.getElementById("tab-settings").addEventListener("click", updatePage);
  // Toggles
  // document.getElementById("toggle-code-view").addEventListener("click", centerView);
  // Right
  document.getElementById("tab-item-info").addEventListener("click", updatePage);
  document.getElementById("tab-selected-info").addEventListener("click", updatePage);
  document.getElementById("tab-related-items").addEventListener("click", updatePage);
});

function updatePage() {
  const tabs = this.parentElement;
  const container = document.getElementById(tabs.getAttribute("data-container"));
  // currently supports multiple panels, was used by an older version, may be used in the future
  const panels = this.hasAttribute("data-panels") ? this.getAttribute("data-panels").split(" ").map(id => document.getElementById(id)) : [];
  console.debug(`${this.id} (${tabs.id}) clicked for ${this.getAttribute("data-panels")} (${container.id}) navigation`);

  // if tab is already active, hide the sidebar
  if (this.classList.contains("active")) {
    this.classList.remove("active");
    container.hidden = true;
    return;
  } else if (container.hidden) {
    // if not, and the container is hidden, make it visible
    container.hidden = false;
  }

  // remove active from all other tab buttons
  for (const element of Array.from(tabs.getElementsByClassName("ion active"))) {
    element.classList.remove("active");
  }

  // make the clicked tab button active
  this.classList.add("active");

  // remove active from all panels and hide them
  for (const element of Array.from(container.getElementsByClassName("active"))) {
    element.classList.remove("active");
    element.hidden = true;
  }

  // make the respective panels active and visible
  for (const element of panels) {
    element.classList.add("active");
    element.hidden = false;
  }
}

// function centerView() {
//   this.classList.toggle("active");
//   const display = document.getElementById("display");
//   const code = document.getElementById("code");
//   display.hidden = !display.hidden;
//   code.hidden = !code.hidden;
//   console.debug(display.hidden ? "Switched to code view" : "Switched to display view");
// }
