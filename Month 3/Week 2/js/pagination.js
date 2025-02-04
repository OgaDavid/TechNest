const inputSearch = document.querySelector("[data-input-search]");
const paginationLinksContainer = document.querySelector(".pagination-links");

export function initPagination(updatePage, totalPages) {
  paginationLinksContainer.innerHTML = "";
  // Create pagination links
  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = i;
    link.className = "pg-link";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      debounceUpdatePage(updatePage, i);
    });
    paginationLinksContainer.appendChild(link);
  }

  const paginationLinks = document.querySelectorAll(".pg-link"),
    startBtn = document.querySelector("#startBtn"),
    endBtn = document.querySelector("#endBtn"),
    prevNext = document.querySelectorAll(".prevNext");

  let currentPage = getCurrentPageFromURL();
  highlightActiveLink(currentPage);
  updateBtn(currentPage, paginationLinks, startBtn, endBtn, prevNext);

  paginationLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      currentPage = index + 1;
      handlePageUpdate(currentPage, updatePage);
      scrollToCurrentPagination();
      inputSearch.value = "";
    });
  });

  prevNext.forEach((button) => {
    button.addEventListener("click", (e) => {
      currentPage += e.target.id === "next" ? 1 : -1;
      handlePageUpdate(currentPage, updatePage);
      scrollToCurrentPagination();
      inputSearch.value = "";
    });
  });

  startBtn.addEventListener("click", () => {
    currentPage = 1;
    handlePageUpdate(currentPage, updatePage);
    scrollToCurrentPagination();
    inputSearch.value = "";
  });

  endBtn.addEventListener("click", () => {
    currentPage = paginationLinks.length;
    handlePageUpdate(currentPage, updatePage);
    scrollToCurrentPagination();
    inputSearch.value = "";
  });
}

function handlePageUpdate(page, updatePage) {
  updatePage(page);
  highlightActiveLink(page);
  updateBtn(
    page,
    document.querySelectorAll(".pg-link"),
    document.querySelector("#startBtn"),
    document.querySelector("#endBtn"),
    document.querySelectorAll(".prevNext")
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function updateURL(page) {
  const url = new URL(window.location);
  url.searchParams.set("page", page);
  window.history.pushState({ page }, "", url);
}

function getCurrentPageFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("page")) || 1;
}

// Debounce function to limit the frequency of pagination updates
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debounceUpdatePage = debounce((updatePage, page) => {
  updatePage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}, 300);

function highlightActiveLink(page) {
  document.querySelectorAll(".pg-link").forEach((link, index) => {
    link.classList.toggle("active", index + 1 === page);
  });
}

function updateBtn(currentPage, paginationLinks, startBtn, endBtn, prevNext) {
  startBtn.disabled = currentPage === 1;
  endBtn.disabled = currentPage === paginationLinks.length;
  prevNext[0].disabled = currentPage === 1;
  prevNext[1].disabled = currentPage === paginationLinks.length;
}

function scrollToCurrentPagination() {
  const currentPagination = document.querySelector(".active");
  currentPagination.scrollIntoView({ behavior: "smooth" });
}
