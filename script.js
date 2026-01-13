const API = "https://komando-api.jalu-atmaja88.workers.dev";

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
 LOAD SITES (ON PAGE LOAD)
*****************/
async function loadSites() {
  const res = await fetch(`${API}/sites`);
  const sites = await res.json();

  const table = document.getElementById("sitesTable");
  table.innerHTML = "";

  sites.forEach(site => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${site.url}</td>
      <td>Connected</td>
    `;
    table.appendChild(row);
  });
}

window.addEventListener("load", loadSites);

/*****************
 ADD SITE (API)
*****************/
document.getElementById("addSiteBtn").addEventListener("click", async () => {
  const url = document.getElementById("site-url").value;
  const user = document.getElementById("site-user").value;
  const pass = document.getElementById("site-pass").value;

  if (!url || !user || !pass) {
    alert("Lengkapi semua field");
    return;
  }

  await fetch(`${API}/add-site`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, user, pass })
  });

  loadSites(); // reload table
});
