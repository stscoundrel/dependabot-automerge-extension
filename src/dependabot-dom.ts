const hasDependabotPrs = (): boolean => true;

const getDependabotPrs = (prElements: Element[]): Element[] => prElements
  .filter((element: Element) => element.querySelector('.opened-by a')?.innerHTML === 'dependabot');

const getLinks = (prElements: Element[]) : Array<string | null | undefined> => prElements.map((element) => element.querySelector('.js-navigation-open')?.getAttribute('href'));

const mergeAllDependabotPRs = () => {
  const prs = Array.from(document.querySelectorAll('.js-issue-row'));
  const dependabotPrs = getDependabotPrs(prs);
  const links = getLinks(dependabotPrs);

  console.log(links);
};

window.addEventListener('load', () => {
  if (hasDependabotPrs()) {
    console.log('Doing the deed');

    const dependabotBtn = document.createElement('button');
    dependabotBtn.textContent = 'Merge all Dependabot PRs';
    dependabotBtn.classList.add('btn', 'btn-primary');
    dependabotBtn.onclick = () => {
      console.log('Button was indeed clicked!');
      mergeAllDependabotPRs();
    };
    const base = document.querySelector('.repository-content');
    if (base) {
      base.classList.add('vittusaatana');
      base.appendChild(dependabotBtn);
    }
  }
});
