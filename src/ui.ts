interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

// Function to render bears to the DOM
export const renderBears = (bears: Bear[]): void => {
  const moreBearsSection = document.querySelector('.more_bears') as HTMLElement;
  if (moreBearsSection) {
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
  }
};

// Function to set up the comments section toggle
export const setupCommentToggle = (): void => {
  // Use type assertions for `HTMLDivElement` for elements needing `style` and `onclick`
  const showHideBtn = document.querySelector('.show-hide') as HTMLDivElement;
  const commentWrapper = document.querySelector('.comment-wrapper') as HTMLDivElement;

  if (showHideBtn && commentWrapper) {
    commentWrapper.style.display = 'none';

    showHideBtn.onclick = () => {
      showHideBtn.textContent =
          showHideBtn.textContent === 'Show comments'
              ? 'Hide comments'
              : 'Show comments';
      commentWrapper.style.display =
          commentWrapper.style.display === 'none' ? 'block' : 'none';
    };
  }
};

// Function to handle form submission for adding new comments
export const setupCommentForm = (): void => {
  // Explicitly cast the form element to `HTMLFormElement` for `onsubmit`
  const form = document.querySelector('.comment-form') as HTMLFormElement;
  const nameField = document.querySelector('#name') as HTMLInputElement;
  const commentField = document.querySelector('#comment') as HTMLInputElement;
  const list = document.querySelector('.comment-container') as HTMLUListElement;

  if (form && nameField && commentField && list) {
    form.onsubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      // Check if values are defined before assigning
      namePara.textContent = nameField.value ?? '';
      commentPara.textContent = commentField.value ?? '';

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      // Clear values after submission
      nameField.value = '';
      commentField.value = '';
    };
  }
};
