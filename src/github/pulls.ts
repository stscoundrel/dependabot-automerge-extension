import { SELECTORS } from './selectors';

const getDependabotPrs = (prElements: Element[]): Element[] => prElements
  .filter((element: Element) => element.querySelector(SELECTORS.GITHUB_ISSUE_OPENED_BY)?.innerHTML === 'dependabot');

const getLinks = (prElements: Element[]): string[] => prElements
  .map((element) => element.querySelector(SELECTORS.GITHUB_ISSUE_LINK)?.getAttribute('href'))
  .filter((link) => typeof link === 'string')
  .map((link) => `${link}?MERGE_DEPENDABOT_PR`);

export const hasDependabotPrs = (): boolean => true;

export const mergeAllDependabotPRs = () => {
  const prs = Array.from(document.querySelectorAll(SELECTORS.GITHUB_ISSUE_ELEMENT));
  const dependabotPrs = getDependabotPrs(prs);
  const links = getLinks(dependabotPrs);

  console.log(links);
};

export default {
  hasDependabotPrs,
  mergeAllDependabotPRs,
};
