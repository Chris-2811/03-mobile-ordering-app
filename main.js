import { menuArray } from './menuArray.js';

const menuItemsList = document.getElementById('menu-items-list');
const orderList = document.getElementById('order-list');
const orderBtn = document.getElementById('order-btn');
const totalPrice = document.getElementById('total-price');
const modalEl = document.getElementById('modal');
const payBtn = document.getElementById('pay-btn');
const formEl = document.getElementById('form');

const inputName = document.getElementById('name');
const inputCard = document.getElementById('card-number');
const inputCVV = document.getElementById('cvv');
const alertEl = document.getElementById('alert');

let orderArr = [];

render();

// Render menu items
function render() {
  menuArray.forEach((menu) => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.setAttribute('data-id', menu.id);

    div.innerHTML = `
              <p>${menu.emoji}</p>
              <div>
                <div>
                  <div>${menu.name}</div>
                  <p class="toppings">${menu.ingredients}</p>
                  <div class="price">$${menu.price}</div>
                </div>
                <div class="add-btn">+</div>
              </div>
    `;

    menuItemsList.appendChild(div);
  });
}

// Add Item to order
function addToOrder(e) {
  const id = e.target.parentElement.parentElement.getAttribute('data-id');

  menuArray.forEach((menu) => {
    if (parseInt(id) === menu.id) {
      orderArr.push(menu);
    }
  });

  renderOrder();
  document.querySelector('.order').hidden = false;
}

// Render ordered items
function renderOrder() {
  orderList.innerHTML = '';

  orderArr.forEach((order, index) => {
    const div = document.createElement('div');
    div.classList.add('order-item');

    div.innerHTML = `
      <div>
        <div>${order.name}</div>
        <small class="remove" data-index="${index}">remove</small>
      </div>
      <div class="price">$${order.price}</div>

    `;

    orderList.appendChild(div);
  });

  totalPrice.textContent = `$${calculateTotalPrice()}`;

  const removeBtns = document.querySelectorAll('.remove');

  removeBtns.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });
}

// Remove Item from order
function removeItem(e) {
  const index = parseInt(e.target.getAttribute('data-index'));
  console.log(index);

  orderArr.splice(index, 1);

  renderOrder();
}

// Calculate total price of the order
function calculateTotalPrice() {
  const total = orderArr.reduce((total, order) => {
    return total + order.price;
  }, 0);

  return total;
}

// Close Modal
function closeModal(e) {
  if (
    e.target !== orderBtn &&
    e.target !== modalEl &&
    !modalEl.contains(e.target) &&
    e.target !== payBtn
  ) {
    modalEl.style.display = 'none';
  }
}

// Add eventlisteners
const addBtns = document.querySelectorAll('.add-btn');

addBtns.forEach((btn) => {
  btn.addEventListener('click', addToOrder);
});

orderBtn.addEventListener('click', (e) => {
  modalEl.style.display = 'block';

  console.log(e.target);
  window.addEventListener('click', closeModal);
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  if (
    inputCVV.value !== '' &&
    inputName.value !== '' &&
    inputCard.value !== ''
  ) {
    modalEl.style.display = 'none';
    document.querySelector('.order').innerHTML = `
    <div class="message">Thanks, ${inputName.value}! Your order is on its way!</div>
    `;
  } else {
    alertEl.style.display = 'block';
  }
});
