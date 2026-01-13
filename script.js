/*****************
 NAVIGATION
*****************/
const links = document.querySelectorAll(".sidebar a");
const pages = document.querySelectorAll(".page");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));
    link.classList.add("active");
    document.getElementById(link.dataset.page).classList.add("active");
  });
});

/*****************
 ADD SITE (LOCAL)
*****************/
const addBtn = document.getElementById("addSiteBtn");
const table = document.getElementById("sitesTable");
const status = document.getElementById("siteStatus");

addBtn.addEventListener("click", () => {
  const name = document.getElementById("site-name").value;
  if (!name) {
    status.textContent = "❌ Site name required";
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>Connected</td>
  `;
  table.appendChild(row);

  status.textContent = "✅ Site added";
});
