'use strict';
const $tabContainer = document.querySelector('.tab-container');
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');
if (!$tabContainer) throw new Error('$tabContainer query failed');
if (!tabs) throw new Error('tabs query failed');
if (!views) throw new Error('views query failed');
$tabContainer.addEventListener('click', handleClick);
function handleClick(event) {
  const $eventTarget = event.target;
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
      const $view = views[i];
      if ($view.dataset.view === language) {
        $view.className = 'view';
      } else {
        $view.className = 'view hidden';
      }
    }
  }
}
