/*********************
 * NAVIGATION
 *********************/
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

/*********************
 * CONFIG
 *********************/
const API_URL = "https://komando-api.yourname.workers.dev"; // GANTI

/*********************
 * ADD SITE
 *********************/
const addSiteBtn = document.getElementById("addSiteBtn");
const siteStatus = document.getElementById("siteStatus");
const sitesTable = document.querySelector("#sitesTable tbody");

if (addSiteBtn) {
  addSiteBtn.addEventListener("click", async () => {
    const data = {
      name: document.getElementById("site-name").value,
      url: document.getElementById("site-url").value,
      user: document.getElementById("site-user").value,
      pass: document.getElementById("site-pass").value
    };

    siteStatus.textContent = "⏳ Adding site...";

    try {
      const res = await fetch(`${API_URL}/add-site`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error();

      const result = await res.json();

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.name}</td>
        <td><span class="badge active">Connected</span></td>
      `;
      sitesTable.appendChild(row);

      siteStatus.textContent = "✅ Site added";
    } catch {
      siteStatus.textContent = "❌ Failed to add site";
    }
  });
}
