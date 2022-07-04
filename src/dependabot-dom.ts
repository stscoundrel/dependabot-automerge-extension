import { hasDependabotPrs, mergeAllDependabotPRs } from './github/pulls';
import { SELECTORS } from './github/selectors';

const mergeAllBtnAction = () => {
  mergeAllDependabotPRs();
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
  console.log('In plugin!');
  if (hasDependabotPrs()) {
    console.log('Totally found dependabot!');
    const button = createMergeButton();
    appendMergeButton(button);
  }
});

export default {};
