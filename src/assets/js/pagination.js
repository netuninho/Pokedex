// Função para renderizar a paginação
export function renderPagination(currentPage, totalItems, limit, container, prevBtn, nextBtn, onPageChange) {
  const totalPages = Math.ceil(totalItems / limit);
  container.innerHTML = '';

  if (currentPage > 3) {
    const firstBtn = document.createElement('button');
    firstBtn.textContent = '1';
    firstBtn.classList.add('pagination__number');
    firstBtn.addEventListener('click', () => onPageChange(1));
    container.appendChild(firstBtn);

    const dotsBefore = document.createElement('button');
    dotsBefore.textContent = '. . .';
    dotsBefore.classList.add('pagination__dots');
    dotsBefore.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = totalPages;
      input.value = currentPage;
      input.id = 'number';
      input.classList.add('pagination__input');
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          let page = parseInt(input.value);
          if (!isNaN(page) && page >= 1 && page <= totalPages) {
            onPageChange(page);
          }
        }
      });
      container.replaceChild(input, dotsBefore);
      input.focus();
    });
    container.appendChild(dotsBefore);
  }

  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    pageBtn.classList.add('pagination__number');
    if (i === currentPage) pageBtn.classList.add('active');
    pageBtn.addEventListener('click', () => onPageChange(i));
    container.appendChild(pageBtn);
  }

  if (currentPage < totalPages - 2) {
    const dotsAfter = document.createElement('button');
    dotsAfter.textContent = '. . .';
    dotsAfter.classList.add('pagination__dots');
    dotsAfter.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = totalPages;
      input.value = currentPage;
      input.id = 'number';
      input.classList.add('pagination__input');
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          let page = parseInt(input.value);
          if (!isNaN(page) && page >= 1 && page <= totalPages) {
            onPageChange(page);
          }
        }
      });
      container.replaceChild(input, dotsAfter);
      input.focus();
    });
    container.appendChild(dotsAfter);

    const lastBtn = document.createElement('button');
    lastBtn.textContent = totalPages;
    lastBtn.classList.add('pagination__number');
    lastBtn.addEventListener('click', () => onPageChange(totalPages));
    container.appendChild(lastBtn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}
