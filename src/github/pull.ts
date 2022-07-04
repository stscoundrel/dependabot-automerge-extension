import { MERGE_QUERY_PARAM } from './constants';
import { SELECTORS } from './selectors';

export const isDependabotPr = (): boolean => {
  const author = document.querySelector(SELECTORS.GITHUB_PR_AUTHOR);

  if (author && author.innerHTML === 'dependabot') return true;

  return false;
};

export const shouldMerge = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  const dependabotParam = urlParams.get(MERGE_QUERY_PARAM);

  if (dependabotParam) {
    return true;
  }

  return false;
};

export default {
  isDependabotPr,
  shouldMerge,
};
