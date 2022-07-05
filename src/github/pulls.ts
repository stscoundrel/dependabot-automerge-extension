import { wait } from '../utils/time';
import { MERGE_QUERY_PARAM, WAIT_PERIODS } from './constants';
import { SELECTORS } from './selectors';

const getDependabotPrs = (prElements: Element[]): Element[] => prElements
  .filter((element: Element) => element.querySelector(SELECTORS.GITHUB_ISSUE_OPENED_BY)?.innerHTML === 'dependabot');

const getLinks = (prElements: Element[]): string[] => prElements
  .map((element) => element.querySelector(SELECTORS.GITHUB_ISSUE_LINK)?.getAttribute('href'))
  .filter((link) => typeof link === 'string')
  .map((link) => `${link}?${MERGE_QUERY_PARAM}=true`);

/**
 * Opens links to new tabs.
 * Requires a little wait between opens, so that
 * the one that opens remains "active" in view for a bit.
 */
const openLinksTonewTabs = async (links: string[]) => {
  for (let i = 0; i < links.length; i += 1) {
    window.open(links[i]);
    // eslint-disable-next-line no-await-in-loop
    await wait(WAIT_PERIODS.OPEN_NEW_TAB);
  }
};

export const hasDependabotPrs = (): boolean => {
  const prs = Array.from(document.querySelectorAll(SELECTORS.GITHUB_ISSUE_ELEMENT));
  const dependabotPrs = getDependabotPrs(prs);

  if (dependabotPrs.length > 0) {
    return true;
  }

  return false;
};

export const openDependabotPrsToBeMerged = () => {
  const prs = Array.from(document.querySelectorAll(SELECTORS.GITHUB_ISSUE_ELEMENT));
  const dependabotPrs = getDependabotPrs(prs);
  const links = getLinks(dependabotPrs);

  // Opening links should be enough to merge them.
  // Individual PR page action takes care of the rest.
  openLinksTonewTabs(links);
};

export default {
  hasDependabotPrs,
  openDependabotPrsToBeMerged,
};
