'use strict';
const $taskList = document.querySelector('.task-list');
if (!$taskList) throw new Error('$taskList query failed');
function handleClick(event) {
  const eventTarget = event.target;
  if (eventTarget.tagName === 'BUTTON') {
    const $taskItem = eventTarget.closest('.task-list-item');
    $taskItem.remove();
  }
}
$taskList.addEventListener('click', handleClick);
const $addNewTaskButton = document.querySelector('.add-new-task');
if (!$addNewTaskButton) throw new Error('$addNewTaskButton query failed');
function makeNewTask() {
  const task = prompt('What task would you like to add?');
  const $newTask = document.createElement('li');
  const $taskText = document.createElement('span');
  const $doneButton = document.createElement('button');
  $taskText.textContent = task;
  $doneButton.textContent = 'Done';
  $newTask.className = 'task-list-item';
  $newTask.append($taskText, $doneButton);
  return $newTask;
}
$addNewTaskButton.addEventListener('click', () => {
  const $newTask = makeNewTask();
  $taskList.appendChild($newTask);
});
