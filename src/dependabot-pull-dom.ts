import { isDependabotPr, shouldMerge } from './github/pull';
import { SELECTORS } from './github/selectors';

const writeMergeComment = () => {
  const commentField: HTMLTextAreaElement | null = document.querySelector(
    SELECTORS.GITHUB_NEW_COMMENT_FIELD,
  );
  const form = document.querySelector(SELECTORS.GITHUB_NEW_COMMENT_FORM);

  if (commentField && form) {
    const clickEvent = new Event('click');
    const changeEvent = new Event('change');

    commentField.dispatchEvent(clickEvent);
    commentField.value = '@dependabot merge';
    commentField.dispatchEvent(changeEvent);

    form.dispatchEvent(changeEvent);

    const buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach((button) => {
      if (button.innerHTML.includes(SELECTORS.GITHUB_COMMENT_BUTTON_TEXT)) {
        setTimeout(() => {
          button.click();
        }, 1000);
      }
    });
  }
};

const closeCurrentTab = () => {
  setTimeout(() => {
    window.close();
  }, 2000);
};

window.addEventListener('load', () => {
  if (isDependabotPr() && shouldMerge()) {
    writeMergeComment();
    closeCurrentTab();
  }
});
