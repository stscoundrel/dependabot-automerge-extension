import { hasDependabotPrs, openDependabotPrsToBeMerged } from './github/pulls';
import { SELECTORS } from './github/selectors';

const mergeAllBtnAction = () => {
  openDependabotPrsToBeMerged();
};

const createMergeButton = (): HTMLButtonElement => {
  const dependabotBtn = document.createElement('button');
  dependabotBtn.textContent = 'Merge all Dependabot PRs';
  dependabotBtn.classList.add('btn', 'btn-primary');
  dependabotBtn.onclick = mergeAllBtnAction;

  return dependabotBtn;
};

const appendMergeButton = (btn: HTMLButtonElement) => {
  const parent = document.querySelector(SELECTORS.MERGE_BUTTON_PARENT);
  if (parent) {
    parent.appendChild(btn);
  }
};

window.addEventListener('load', () => {
  if (hasDependabotPrs()) {
    const button = createMergeButton();
    appendMergeButton(button);
  }
});
