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
 * CONFIG API WORKER
 *********************/
const API_URL = "https://komando-api.jalu-atmaja88.workers.dev";
// ⚠️ GANTI dengan URL Worker Anda yang ASLI

/*********************
 * PUBLISH TO WORDPRESS
 *********************/
const publishBtn = document.getElementById("publishBtn");

if (publishBtn) {
  publishBtn.addEventListener("click", async () => {
    const title = document.getElementById("wp-title").value;
    const content = document.getElementById("wp-content").value;
    const statusEl = document.getElementById("publishStatus");

    if (!title || !content) {
      statusEl.textContent = "❌ Title dan content wajib diisi";
      return;
    }

    statusEl.textContent = "⏳ Publishing...";

    try {
      const res = await fetch(`${API_URL}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      });

      if (!res.ok) throw new Error("Publish failed");

      statusEl.textContent = "✅ Post berhasil dipublish";
      document.getElementById("wp-title").value = "";
      document.getElementById("wp-content").value = "";

    } catch (err) {
      statusEl.textContent = "❌ Gagal publish ke WordPress";
      console.error(err);
    }
  });
}
