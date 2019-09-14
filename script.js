const includesSearch = input => input.toLowerCase().includes('search');

const isSearch = input => {
  if (input.type === 'search' || includesSearch(input.id) || includesSearch(input.title) ||
      input.placeholder && includesSearch(input.placeholder)) {
    return true;
  }

  for (let cls of input.classList) {
    if (includesSearch(cls)) return true;
  }

  return false;
};

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.key === 'q' || event.key === 'Q')) {
    if (document.activeElement && isSearch(document.activeElement)) {
      document.activeElement.blur();
      return;
    }

    const inputTypes = 'input[type=text], input[type=search], input:not([type])';
    for (let input of document.querySelectorAll(inputTypes)) {
      if (isSearch(input)) {
        input.focus();
        break;
      }
    }
  }
});
