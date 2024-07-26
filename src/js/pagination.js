import dataDonation from '../data/dataDonation';

class Pagination {
  constructor() {
    this.cardsPerPage = 8;
    this.currentPage = 1;
    this.totalCards = 0;
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.filteredData = [];

    this.createCards = this.createCards.bind(this);
    this.updatePaginationLinks = this.updatePaginationLinks.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);

    this.searchInput = document.getElementById('searchInput');
    this.searchInput.addEventListener('input', this.handleSearch);

    this.simulateFetchData();
  }

  handleSearch() {
    this.currentPage = 1; // Reset to the first page when searching
    this.search();
    this.createCards();
    this.updatePaginationLinks();
  }

  search() {
    const searchTerm = this.searchInput.value.toLowerCase();
    this.filteredData = dataDonation.filter((data) => (
      data.title.toLowerCase().includes(searchTerm)
        || data.description.toLowerCase().includes(searchTerm)
    ));

    this.totalCards = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
  }

  createCards() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const dataToUse = this.filteredData.length > 0 ? this.filteredData : dataDonation;

    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = Math.min(startIndex + this.cardsPerPage, this.totalCards);

    const cardContents = dataToUse.slice(startIndex, endIndex).map((data) => {
      if (data && data.links) {
        return `
          <a href="${data.links}" target="_blank" style="text-decoration: none;">
            <div class="card" style="width: 18rem;">
              <img src="${data.imageCard}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title fs-6">${data.title}</h5>
                <p class="card-text mt-4 hidden-description">${data.description}</p>
                <p class="fw-bold mb-0 mt-4">
                  <img src="${data.imageSmall}" class="rounded img-fluid" width="30px" alt="">
                  ${data.titleImageSmall} <i class="bi bi-patch-check-fill ms-2" style="color: #10a8e5;"></i>
                </p>
              </div>
            </div>
          </a>
        `;
      }
      return '';
    });

    cardContainer.innerHTML = cardContents.join('');
  }

  updatePaginationLinks() {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const previousLi = document.createElement('li');
    previousLi.className = 'page-item';
    const previousLink = document.createElement('a');
    previousLink.className = 'page-link';
    previousLink.href = '#';
    previousLink.setAttribute('aria-label', 'Previous');
    const previousSpan = document.createElement('span');
    previousSpan.setAttribute('aria-hidden', 'true');
    previousSpan.innerText = '«';
    previousLink.appendChild(previousSpan);
    previousLi.appendChild(previousLink);
    paginationContainer.appendChild(previousLi);

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= this.totalPages; i++) {
      const li = document.createElement('li');
      li.className = `page-item${i === this.currentPage ? ' active' : ''}`;

      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.innerText = i;

      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentPage = parseInt(a.innerText, 10);
        this.createCards();
        this.updatePaginationLinks();
      });

      li.appendChild(a);
      paginationContainer.appendChild(li);
    }

    // Tambahkan tombol "Next"
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item';
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.setAttribute('aria-label', 'Next');
    const nextSpan = document.createElement('span');
    nextSpan.setAttribute('aria-hidden', 'true');
    nextSpan.innerText = '»';
    nextLink.appendChild(nextSpan);
    nextLi.appendChild(nextLink);
    paginationContainer.appendChild(nextLi);
  }

  simulateFetchData() {
    setTimeout(() => {
      this.totalCards = dataDonation.length; // Set the total number of cards
      this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
      this.createCards();
      this.updatePaginationLinks();
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cardDonation = new Pagination();
  cardDonation.currentPage();
});

export default Pagination;
