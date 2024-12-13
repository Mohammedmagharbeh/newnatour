const addItemForm = document.getElementById("addItemForm");
const itemsTableBody = document.getElementById("itemsTableBody");
const totalPriceSpan = document.getElementById("totalPrice");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

let items = JSON.parse(localStorage.getItem("items")) || [];
let filteredItems = [...items]; // نسخة من العناصر للفلترة

// تحديث الجدول عند أول تحميل للصفحة
updateTable();

// إضافة مادة جديدة
addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const itemName = document.getElementById("itemName").value;
  const itemQuantity = parseInt(document.getElementById("itemQuantity").value);
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);

  const newItem = { name: itemName, quantity: itemQuantity, price: itemPrice };
  items.push(newItem);

  // حفظ البيانات في localStorage
  localStorage.setItem("items", JSON.stringify(items));

  // تحديث الفلترة لتشمل العناصر الجديدة
  filteredItems = [...items];

  updateTable();
  addItemForm.reset();
});

// تحديث الجدول بناءً على البيانات المخزنة
function updateTable() {
  itemsTableBody.innerHTML = ""; // تفريغ الجدول

  // عرض العناصر المتوافقة مع الفلترة
  filteredItems.forEach((item, index) => {
    const row = document.createElement("tr");

    const itemTotalPrice = (item.quantity * item.price).toFixed(2);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${itemTotalPrice}</td>
      <td><button onclick="removeItem(${index})">إزالة</button></td>
      <td><button onclick="editItem(${index})">تعديل</button></td>
    `;

    itemsTableBody.appendChild(row);
  });

  updateTotalPrice();
}

// إزالة مادة
function removeItem(index) {
  items.splice(index, 1);
  filteredItems = [...items]; // إعادة تعيين الفلترة بعد الحذف
  localStorage.setItem("items", JSON.stringify(items)); // حفظ البيانات بعد الحذف
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
  filteredItems = [...items]; // إعادة تعيين الفلترة بعد التعديل
  localStorage.setItem("items", JSON.stringify(items)); // حفظ البيانات بعد التعديل
  updateTable();
}

// حساب المجموع الكلي
function updateTotalPrice() {
  const total = filteredItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  totalPriceSpan.textContent = total.toFixed(2);
}

// البحث عن منتج
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value.toLowerCase().trim(); // النص المدخل في مربع البحث

  // فلترة العناصر بناءً على البحث
  filteredItems = items.filter(item => item.name.toLowerCase().includes(query));

  updateTable(); // تحديث الجدول بناءً على الفلترة
});
