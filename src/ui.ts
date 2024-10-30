interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

// Function to render bears to the DOM
export const renderBears = (bears: Bear[]): void => {
  const moreBearsSection = document.querySelector('.more_bears');

  if (moreBearsSection instanceof HTMLElement) {
    moreBearsSection.innerHTML = '';
    bears.forEach((bear) => {
      moreBearsSection.innerHTML += `
        <div>
          <h3>${bear.name} (${bear.binomial})</h3>
          <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
          <p><strong>Range:</strong> ${bear.range}</p>
        </div>
      `;
    });
  } else {
    console.error('Element .more_bears not found or is not an HTMLElement');
  }
};

// Function to set up the comments section toggle
export const setupCommentToggle = (): void => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');

  if (
    showHideBtn instanceof HTMLDivElement &&
    commentWrapper instanceof HTMLDivElement
  ) {
    commentWrapper.style.display = 'none';

    showHideBtn.onclick = () => {
      showHideBtn.textContent =
        showHideBtn.textContent === 'Show comments'
          ? 'Hide comments'
          : 'Show comments';
      commentWrapper.style.display =
        commentWrapper.style.display === 'none' ? 'block' : 'none';
    };
  } else {
    console.error(
      'Show/hide button or comment wrapper not found or incorrect type.'
    );
  }
};

// Function to handle form submission for adding new comments
export const setupCommentForm = (): void => {
  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');

  if (
    form instanceof HTMLFormElement &&
    nameField instanceof HTMLInputElement &&
    commentField instanceof HTMLInputElement &&
    list instanceof HTMLUListElement
  ) {
    form.onsubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      namePara.textContent = nameField.value ?? '';
      commentPara.textContent = commentField.value ?? '';

      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);
      list.appendChild(listItem);

      nameField.value = '';
      commentField.value = '';
    };
  } else {
    console.error('Form elements not found or incorrect types.');
  }
};
