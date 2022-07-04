import { MERGE_QUERY_PARAM } from './constants';
import { SELECTORS } from './selectors';

const getDependabotPrs = (prElements: Element[]): Element[] => prElements
  .filter((element: Element) => element.querySelector(SELECTORS.GITHUB_ISSUE_OPENED_BY)?.innerHTML === 'dependabot');

const getLinks = (prElements: Element[]): string[] => prElements
  .map((element) => element.querySelector(SELECTORS.GITHUB_ISSUE_LINK)?.getAttribute('href'))
  .filter((link) => typeof link === 'string')
  .map((link) => `${link}?${MERGE_QUERY_PARAM}=true`);

const openLinksTonewTabs = (links: string[]) => {
  links.forEach((link) => {
    window.open(link);
  });
};

export const hasDependabotPrs = (): boolean => true;

export const mergeAllDependabotPRs = () => {
  const prs = Array.from(document.querySelectorAll(SELECTORS.GITHUB_ISSUE_ELEMENT));
  const dependabotPrs = getDependabotPrs(prs);
  const links = getLinks(dependabotPrs);

  // Opening links should be enough to merge them.
  // Individual PR page action takes care of the rest.
  openLinksTonewTabs(links);
};

export default {
  hasDependabotPrs,
  mergeAllDependabotPRs,
};
