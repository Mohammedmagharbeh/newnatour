const addItemForm = document.getElementById("addItemForm");
const itemsTableBody = document.getElementById("itemsTableBody");
const totalPriceSpan = document.getElementById("totalPrice");

let items = JSON.parse(localStorage.getItem("items")) || [];

updateTable();

// إضافة مادة جديدة
addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const itemName = document.getElementById("itemName").value;
  const itemQuantity = parseInt(document.getElementById("itemQuantity").value);
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);

  const newItem = { name: itemName, quantity: itemQuantity, price: itemPrice };
  items.push(newItem);

  updateTable();

  addItemForm.reset();
});

// تحديث الجدول
function updateTable() {
  itemsTableBody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    const itemTotalPrice = (item.quantity * item.price).toFixed(2);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${itemTotalPrice}</td>
      <td><button onclick="removeItem(${index})">إزالة</button></td>
      <td><button onclick="editItem(${index})">تعديل</button></td> <!-- زر التعديل -->
    `;

    itemsTableBody.appendChild(row);
  });

  updateTotalPrice();

  localStorage.setItem("items", JSON.stringify(items));
}

// إزالة مادة
function removeItem(index) {
  items.splice(index, 1);
  updateTable();
}

// تعديل مادة
function editItem(index) {
  const item = items[index];
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemQuantity").value = item.quantity;
  document.getElementById("itemPrice").value = item.price;

  // إزالة المادة القديمة عند التعديل
  items.splice(index, 1);
  updateTable();
}

// حساب المجموع الكلي
function updateTotalPrice() {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  totalPriceSpan.textContent = total.toFixed(2);
}
