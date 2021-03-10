document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("code-view").addEventListener("click", centerView);
});

function centerView() {
  this.classList.toggle("active");
  const display = document.getElementById("display");
  const code = document.getElementById("code");
  display.hidden = !display.hidden;
  code.hidden = !code.hidden;
  console.debug(display.hidden ? "Switched to code view" : "Switched to display view");
}
