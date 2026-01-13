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
 LOAD SITES (TABLE + SELECT)
*****************/
async function loadSites() {
  const res = await fetch(`${API}/sites`);
  const sites = await res.json();

  const table = document.getElementById("sitesTable");
  const select = document.getElementById("siteSelect");

  table.innerHTML = "";
  select.innerHTML = '<option value="">Pilih Site</option>';

  sites.forEach(site => {
    // TABLE ROW
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${site.url}</td>
      <td>Connected</td>
      <td>
        <button class="delete-btn" data-id="${site.id}">
          🗑 Hapus
        </button>
      </td>
    `;
    table.appendChild(row);

    // SELECT OPTION (Publish)
    const opt = document.createElement("option");
    opt.value = site.id;
    opt.textContent = site.url;
    select.appendChild(opt);
  });

  // DELETE HANDLER
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const siteId = btn.dataset.id;

      if (!confirm("Hapus site ini?")) return;

      await fetch(`${API}/delete-site`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId })
      });

      loadSites();
    });
  });
}


/*****************
 ADD SITE (API)
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

  status.textContent = "⏳ Menyimpan site...";

  try {
    const res = await fetch(`${API}/add-site`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, user, pass })
    });

    if (!res.ok) throw new Error("Add site failed");

    status.textContent = "✅ Site berhasil ditambahkan";
    document.getElementById("site-url").value = "";
    document.getElementById("site-user").value = "";
    document.getElementById("site-pass").value = "";

    loadSites();

  } catch (err) {
    console.error(err);
    status.textContent = "❌ Gagal menambahkan site";
  }
});

/*****************
 PUBLISH POST
*****************/
document.getElementById("publishBtn").addEventListener("click", async () => {
  const siteId = document.getElementById("siteSelect").value;
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  const status = document.getElementById("publishStatus");

  if (!siteId || !title || !content) {
    status.textContent = "❌ Lengkapi semua field";
    return;
  }

  status.textContent = "⏳ Publishing...";

  try {
    const res = await fetch(`${API}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId, title, content })
    });

    if (!res.ok) throw new Error("Publish failed");

    status.textContent = "✅ Post berhasil dipublish";
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";

  } catch (err) {
    console.error(err);
    status.textContent = "❌ Gagal publish post";
  }
});

/*****************
 INIT
*****************/
window.addEventListener("load", () => {
  loadSites();
});
