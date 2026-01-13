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
    const pageId = link.dataset.page;
    document.getElementById(pageId).classList.add("active");

    if (pageId === "sites") {
      loadSites();
    }
  });
});

/*****************
 LOAD SITES
*****************/
async function loadSites() {
  const table = document.getElementById("sitesTable");
  table.innerHTML = "";

  const res = await fetch(`${API}/sites`);
  const sites = await res.json();

  sites.forEach(site => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${site.url}</td>
      <td>Connected</td>
      <td>
        <button onclick="deleteSite('${site.id}')">Hapus</button>
      </td>
    `;

    table.appendChild(row);
  });
}

/*****************
 ADD SITE
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

  document.getElementById("site-url").value = "";
  document.getElementById("site-user").value = "";
  document.getElementById("site-pass").value = "";

  loadSites();
});

/*****************
 DELETE SITE
*****************/
async function deleteSite(id) {
  if (!confirm("Hapus site ini?")) return;

  await fetch(`${API}/delete-site?id=${id}`, {
    method: "DELETE"
  });

  loadSites();
}
