const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  CHECKED_TODO: 'checked',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  const currentQuantity = parseInt(itemCountSpan.innerText);
  const uncheckedItems = parseInt(uncheckedCountSpan.innerText);
  const item = document.createElement('li');
  const label = document.createElement('span');
  const checkbox = document.createElement('input');
  const deleteBtn = document.createElement('button');

  // Set up the TODO text
  label.classList.add(classNames.TODO_TEXT);
  label.innerText = prompt('TODO Text');

  // Set up checkbox
  checkbox.classList.add(classNames.TODO_CHECKBOX);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('click', handleCheck, false);

  // Set up delete
  deleteBtn.classList.add(classNames.TODO_DELETE);
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', handleDelete, false);

  // Set up item
  item.classList.add(classNames.TODO_ITEM);
  item.appendChild(checkbox);
  item.appendChild(label);
  item.appendChild(deleteBtn);

  // Append to item list
  list.appendChild(item);

  // Update counter
  itemCountSpan.innerText = currentQuantity + 1;

  // Update unchecked items counter
  uncheckedCountSpan.innerText = uncheckedItems + 1;
}

function handleDelete(event){
  const parent = event.target.parentNode;
  const items = parseInt(itemCountSpan.innerText);
  const uncheckedItems = parseInt(uncheckedCountSpan.innerText);
  // The first child is always the checkbox
  const checked = parent.children[0].checked;

  // Update items counter
  itemCountSpan.innerText = items - 1;

  if (!checked) {
    uncheckedCountSpan.innerText = uncheckedItems - 1;
  }

  parent.remove();
}

function handleCheck(event) {
  const checkbox = event.target;
  const item = event.target.parentNode;
  const currentQuantity = parseInt(uncheckedCountSpan.innerText);

  if (checkbox.checked) {
    // Toggle CSS class
    item.classList.add(classNames.CHECKED_TODO);

    // Update counter
    uncheckedCountSpan.innerText = currentQuantity - 1;
  } else {
    // Toggle CSS class
    item.classList.remove(classNames.CHECKED_TODO);

    // Update counter
    uncheckedCountSpan.innerText = currentQuantity + 1;
  }


}
