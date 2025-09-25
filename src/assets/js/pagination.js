// Função para renderizar a paginação

export function renderPagination(currentPage, totalItems, limit, container, prevBtn, nextBtn, onPageChange) {
  const totalPages = Math.ceil(totalItems / limit);
  container.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    if (i > currentPage - 3 && i < currentPage + 3) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.classList.add('pagination__number');
      if (i === currentPage) pageBtn.classList.add('active');
      pageBtn.addEventListener('click', () => onPageChange(i));
      container.appendChild(pageBtn);
    }
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}
