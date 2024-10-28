// ui.js

// Function to render bears to the DOM
export const renderBears = (bears) => {
    const moreBearsSection = document.querySelector('.more_bears');
    moreBearsSection.innerHTML = ''; // Clear existing content
    bears.forEach(bear => {
        moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
    });
};

// Function to set up the comments section toggle
export const setupCommentToggle = () => {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');
    commentWrapper.style.display = 'none';

    showHideBtn.onclick = () => {
        showHideBtn.textContent = showHideBtn.textContent === 'Show comments' ? 'Hide comments' : 'Show comments';
        commentWrapper.style.display = commentWrapper.style.display === 'none' ? 'block' : 'none';
    };
};

// Function to handle form submission for adding new comments
export const setupCommentForm = () => {
    const form = document.querySelector('.comment-form');
    const nameField = document.querySelector('#name');
    const commentField = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');

    form.onsubmit = (e) => {
        e.preventDefault();
        const listItem = document.createElement('li');
        const namePara = document.createElement('p');
        const commentPara = document.createElement('p');
        namePara.textContent = nameField.value;
        commentPara.textContent = commentField.value;

        list.appendChild(listItem);
        listItem.appendChild(namePara);
        listItem.appendChild(commentPara);

        nameField.value = '';
        commentField.value = '';
    };
};
