interface View extends HTMLDivElement {
  dataset: {
    view: string;
  };
}

const $tabContainer = document.querySelector('.tab-container');
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');

if (!$tabContainer) throw new Error('$tabContainer query failed');
if (!tabs) throw new Error('tabs query failed');
if (!views) throw new Error('views query failed');

$tabContainer.addEventListener('click', handleClick);

function handleClick(event: Event): void {
  const $eventTarget = event.target as HTMLDivElement;

  if ($eventTarget.matches('.tab')) {
    tabs.forEach(($tab) => {
      if ($tab.isSameNode($eventTarget)) {
        $tab.className = 'tab active';
      } else {
        $tab.className = 'tab';
      }
    });

    const language = $eventTarget.dataset.view;

    console.log('views:', views);
    for (let i = 0; i < views.length; i++) {
      const $view = views[i] as View;

      if ($view.dataset.view === language) {
        $view.className = 'view';
      } else {
        $view.className = 'view hidden';
      }
    }
  }
}
