import { hasDependabotPrs, openDependabotPrsToBeMerged } from './github/pulls';
import { SELECTORS } from './github/selectors';

const MERGE_BUTTON_ID = 'dependabot-automerge-extension-button';

const mergeAllBtnAction = () => {
  openDependabotPrsToBeMerged();
};

const createMergeButton = (): HTMLButtonElement => {
  const dependabotBtn = document.createElement('button');
  dependabotBtn.textContent = 'Merge all Dependabot PRs';
  dependabotBtn.classList.add('btn', 'btn-primary');
  dependabotBtn.id = MERGE_BUTTON_ID;
  dependabotBtn.onclick = mergeAllBtnAction;

  return dependabotBtn;
};

const appendMergeButton = (btn: HTMLButtonElement) => {
  const parent = document.querySelector(SELECTORS.MERGE_BUTTON_PARENT);
  const wrapper = document.createElement('div');
  wrapper.classList.add('mt-3', 'text-center');
  if (parent) {
    wrapper.appendChild(btn);
    parent.appendChild(wrapper);
  }
};

const maybeAppendMergeButton = () => {
  /**
   * Steps to check:
   * 1. Url looks like pulls page
   * 2. We have not already appended a button.
   * 3. There are Dependabot PRs.
   */
  const currentUrl = window.location.href;

  if (currentUrl.includes('/pulls')) {
    if (!document.querySelector(`#${MERGE_BUTTON_ID}`)) {
      if (hasDependabotPrs()) {
        const button = createMergeButton();
        appendMergeButton(button);
      }
    }
  }
};

window.addEventListener('load', () => {
  // Page load detect.
  maybeAppendMergeButton();

  // URL change polling for GH client side navigations.
  // Unfortunate waste of resources, but GH navigations can not otherwise be reliably detected.
  setInterval(() => maybeAppendMergeButton(), 4000);
});
