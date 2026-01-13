const API = "https://komando-api.jalu-atmaja88.workers.dev";

let generatedArticles = [];

/* =====================
 NAVIGATION
===================== */
document.querySelectorAll(".sidebar a").forEach(link => {
  link.onclick = e => {
    e.preventDefault();
    document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    link.classList.add("active");
    document.getElementById(link.dataset.page).classList.add("active");
  };
});

/* =====================
 LOAD SITES
===================== */
async function loadSites() {
  const res = await fetch(`${API}/sites`);
  const sites = await res.json();

  const select = document.getElementById("siteSelect");
  select.innerHTML = "";

  sites.forEach(s => {
    select.innerHTML += `<option value="${s.id}">${s.url}</option>`;
  });
}

/* =====================
 LOAD CATEGORIES
===================== */
async function loadCategories(siteId) {
  const res = await fetch(`${API}/categories?siteId=${siteId}`);
  const cats = await res.json();

  const select = document.getElementById("categorySelect");
  select.innerHTML = "";

  cats.forEach(c => {
    select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });
}

document.getElementById("siteSelect").onchange = e => {
  loadCategories(e.target.value);
};

/* =====================
 GENERATE AI
===================== */
document.getElementById("generateBtn").onclick = async () => {
  const res = await fetch(`${API}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: baseTitle.value,
      content: baseContent.value,
      count: articleCount.value
    })
  });

  const data = await res.json();
  generatedArticles = data.articles;

  const list = document.getElementById("generatedList");
  const select = document.getElementById("articleSelect");

  list.innerHTML = "";
  select.innerHTML = "";

  generatedArticles.forEach((a, i) => {
    list.innerHTML += `
      <div class="article-preview">
        <strong>${a.title}</strong>
        <p>${a.content.substring(0, 150)}...</p>
      </div>
    `;
    select.innerHTML += `<option value="${i}">Artikel ${i + 1}</option>`;
  });
};

/* =====================
 PUBLISH
===================== */
document.getElementById("publishBtn").onclick = async () => {
  const article = generatedArticles[articleSelect.value];
  const file = imageInput.files[0];

  let mediaId = null;

  if (file) {
    const form = new FormData();
    form.append("file", file);

    const img = await fetch(`${API}/upload-image?siteId=${siteSelect.value}`, {
      method: "POST",
      body: form
    });

    const imgData = await img.json();
    mediaId = imgData.mediaId;
  }

  const res = await fetch(`${API}/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      siteId: siteSelect.value,
      title: article.title,
      content: article.content,
      category: categorySelect.value,
      featuredImage: mediaId
    })
  });

  const data = await res.json();
  publishStatus.innerHTML = `✅ <a href="${data.link}" target="_blank">Lihat Artikel</a>`;
};

/* =====================
 INIT
===================== */
loadSites();
