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

  const res = await fetch(`${API}/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteId, title, content })
  });

  if (res.ok) {
    status.textContent = "✅ Post berhasil dipublish";
  } else {
    status.textContent = "❌ Gagal publish";
  }
});


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
