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
 CONFIG
*****************/
// GANTI DENGAN URL WORKER ANDA
const API_URL = "https://komando-api.jalu-atmaja88.workers.dev";

/*****************
 ADD SITE (LOCAL UI)
*****************/
const addBtn = document.getElementById("addSiteBtn");
const table = document.getElementById("sitesTable");
const siteStatus = document.getElementById("siteStatus");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    const name = document.getElementById("site-name").value;

    if (!name) {
      siteStatus.textContent = "❌ Site name required";
      return;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>Connected</td>
    `;
    table.appendChild(row);

    siteStatus.textContent = "✅ Site added";
  });
}

/*****************
 PUBLISH POST
*****************/
const publishBtn = document.getElementById("publishBtn");
const publishStatus = document.getElementById("publishStatus");

if (publishBtn) {
  publishBtn.addEventListener("click", async () => {
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;

    if (!title || !content) {
      publishStatus.textContent = "❌ Title & content required";
      return;
    }

    publishStatus.textContent = "⏳ Publishing...";

    try {
      const res = await fetch(`${API_URL}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
      });

      if (!res.ok) throw new Error();

      publishStatus.textContent = "✅ Published!";
    } catch (err) {
      publishStatus.textContent = "❌ Publish failed";
    }
  });
}
