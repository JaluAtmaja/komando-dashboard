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

  try {
    const res = await fetch(`${API}/sites`);
    const sites = await res.json();

    sites.forEach(site => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${site.url}</td>
        <td>Connected</td>
      `;

      table.appendChild(row);
    });

    // update dashboard count
    document.querySelector(".stat-card strong").textContent = sites.length;

  } catch (err) {
    console.error("Gagal load sites", err);
  }
}

/*****************
 ADD SITE
*****************/
document.getElementById("addSiteBtn").addEventListener("click", async () => {
  const url = document.getElementById("site-url").value;
  const user = document.getElementById("site-user").value;
  const pass = document.getElementById("site-pass").value;
  const status = document.getElementById("siteStatus");

  if (!url || !user || !pass) {
    status.textContent = "❌ Lengkapi semua field";
    return;
  }

  status.textContent = "⏳ Menambahkan site...";

  const res = await fetch(`${API}/add-site`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, user, pass })
  });

  if (!res.ok) {
    status.textContent = "❌ Site sudah ada / gagal";
    return;
  }

  status.textContent = "✅ Site berhasil ditambahkan";

  // reload list
  loadSites();
});

/*****************
 PUBLISH POST
*****************/
document.getElementById("publishBtn").addEventListener("click", async () => {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const status = document.getElementById("publishStatus");

  if (!title || !content) {
    status.textContent = "❌ Judul & konten wajib diisi";
    return;
  }

  status.textContent = "⏳ Publishing...";

  const res = await fetch(`${API}/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  if (res.ok) {
    status.textContent = "✅ Post berhasil dipublish";
  } else {
    status.textContent = "❌ Gagal publish";
  }
});

/*****************
 AUTO LOAD ON START
*****************/
loadSites();
