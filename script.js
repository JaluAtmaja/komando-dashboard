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
