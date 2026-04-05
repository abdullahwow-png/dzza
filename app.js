// ══════════════════════════════════════════
//  نظام المحاسبة - app.js
// ══════════════════════════════════════════

// ─── STATE ───────────────────────────────
const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  getObj(key, def = {}) {
    try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; }
  }
};

let currentUser = null;

// ─── INIT ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDefaultUsers();
  setupLoginForm();
  setupSidebar();
  setupNav();
  setCurrentDate();
  setupOverlay();

  const saved = sessionStorage.getItem('loggedIn');
  if (saved) {
    currentUser = JSON.parse(saved);
    loginSuccess();
  }
});

function initDefaultUsers() {
  const users = DB.get('users');
  if (users.length === 0) {
    DB.set('users', [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin' }
    ]);
  }
}

// ─── LOGIN ───────────────────────────────
function setupLoginForm() {
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const users = DB.get('users');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      currentUser = user;
      sessionStorage.setItem('loggedIn', JSON.stringify(user));
      loginSuccess();
    } else {
      showToast('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
    }
  });
}

function loginSuccess() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('current-user').textContent = currentUser.username;
  if (currentUser.role !== 'admin') {
    document.getElementById('users-menu').style.display = 'none';
  }
  document.getElementById('logout-btn').addEventListener('click', logout);
  navigateTo('dashboard');
  updateDashboard();
  renderAllTables();
}

function logout() {
  sessionStorage.removeItem('loggedIn');
  currentUser = null;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-form').reset();
}

// ─── NAV ─────────────────────────────────
function setupNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const page = item.dataset.page;
      navigateTo(page);
      closeSidebar();
    });
  });
}

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const nav = document.querySelector(`.nav-item[data-page="${page}"]`);
  const pg = document.getElementById(`page-${page}`);
  if (nav) nav.classList.add('active');
  if (pg) pg.classList.add('active');
  const titles = {
    dashboard: 'الرئيسية', customers: 'العملاء', sales: 'فواتير المبيعات',
    purchases: 'فواتير المشتريات', expenses: 'المصروفات',
    payroll: 'الرواتب', reports: 'التقارير المالية', users: 'إدارة المستخدمين'
  };
  document.getElementById('page-title').textContent = titles[page] || '';
  if (page === 'dashboard') updateDashboard();
}

// ─── SIDEBAR ─────────────────────────────
function setupSidebar() {
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
    document.querySelector('.sidebar-overlay').classList.add('visible');
  });
  document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.querySelector('.sidebar-overlay').classList.remove('visible');
}

function setupOverlay() {
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }
  overlay.addEventListener('click', closeSidebar);
}

function setCurrentDate() {
  const d = new Date();
  document.getElementById('current-date').textContent = d.toLocaleDateString('ar-IQ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// ─── MODAL ───────────────────────────────
function showModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  // Populate selects
  if (id === 'sales-modal') populateSaleCustomers();
  if (id === 'salary-modal') populateSalaryEmployees();
  if (id === 'sales-modal' && !document.getElementById('sale-date').value) {
    document.getElementById('sale-date').value = today();
  }
  if (id === 'purchase-modal' && !document.getElementById('purchase-date').value) {
    document.getElementById('purchase-date').value = today();
  }
  if (id === 'expense-modal' && !document.getElementById('expense-date').value) {
    document.getElementById('expense-date').value = today();
  }
  if (id === 'salary-modal' && !document.getElementById('salary-date').value) {
    document.getElementById('salary-date').value = today();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('active');
  const form = modal.querySelector('form');
  if (form) form.reset();
  // Reset invoice items
  if (id === 'sales-modal') { document.querySelector('#sale-items-table tbody').innerHTML = ''; updateSaleTotal(); }
  if (id === 'purchase-modal') { document.querySelector('#purchase-items-table tbody').innerHTML = ''; updatePurchaseTotal(); }
}

// ─── DASHBOARD ───────────────────────────
function updateDashboard() {
  const sales = DB.get('sales').reduce((s, i) => s + (i.total || 0), 0);
  const purchases = DB.get('purchases').reduce((s, i) => s + (i.total || 0), 0);
  const expenses = DB.get('expenses').reduce((s, i) => s + (i.amount || 0), 0);
  const payroll = DB.get('payroll').reduce((s, i) => s + (i.net || 0), 0);
  const profit = sales - purchases - expenses - payroll;

  document.getElementById('total-sales').textContent = formatMoney(sales);
  document.getElementById('total-purchases').textContent = formatMoney(purchases);
  document.getElementById('total-expenses').textContent = formatMoney(expenses + payroll);
  document.getElementById('net-profit').textContent = formatMoney(profit);

  // Recent invoices
  const allInvoices = [
    ...DB.get('sales').map(i => ({ ...i, type: 'مبيعات', party: i.customerName })),
    ...DB.get('purchases').map(i => ({ ...i, type: 'مشتريات', party: i.supplier }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  const tbody = document.getElementById('recent-invoices');
  if (allInvoices.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">لا توجد فواتير</td></tr>';
  } else {
    tbody.innerHTML = allInvoices.map(i => `
      <tr>
        <td>${i.invoiceNo || '-'}</td>
        <td><span class="badge badge-${i.type === 'مبيعات' ? 'success' : 'info'}">${i.type}</span></td>
        <td>${i.party || '-'}</td>
        <td>${formatMoney(i.total)}</td>
        <td>${formatDate(i.date)}</td>
      </tr>`).join('');
  }
}

function renderAllTables() {
  renderCustomers();
  renderSales();
  renderPurchases();
  renderExpenses();
  renderEmployees();
  renderPayroll();
  renderUsers();
  setupForms();
}

// ─── CUSTOMERS ───────────────────────────
function renderCustomers(filter = '') {
  const data = DB.get('customers').filter(c =>
    c.name.includes(filter) || (c.phone || '').includes(filter)
  );
  const tbody = document.getElementById('customers-table');
  tbody.innerHTML = data.length === 0
    ? '<tr><td colspan="6" class="text-center">لا يوجد عملاء</td></tr>'
    : data.map((c, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${c.name}</td>
        <td>${c.phone || '-'}</td>
        <td>${c.address || '-'}</td>
        <td>${formatMoney(c.balance || 0)}</td>
        <td>
          <button class="btn btn-sm btn-secondary btn-icon" onclick="editCustomer(${c.id})" title="تعديل"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="deleteCustomer(${c.id})" title="حذف"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`).join('');
}

document.getElementById('search-customers')?.addEventListener('input', e => renderCustomers(e.target.value));

function editCustomer(id) {
  const c = DB.get('customers').find(x => x.id === id);
  if (!c) return;
  document.getElementById('customer-id').value = c.id;
  document.getElementById('customer-name').value = c.name;
  document.getElementById('customer-phone').value = c.phone || '';
  document.getElementById('customer-address').value = c.address || '';
  document.getElementById('customer-email').value = c.email || '';
  document.getElementById('customer-balance').value = c.balance || 0;
  document.querySelector('#customer-modal .modal-header h3').textContent = 'تعديل عميل';
  showModal('customer-modal');
}

function deleteCustomer(id) {
  if (!confirm('هل تريد حذف هذا العميل؟')) return;
  DB.set('customers', DB.get('customers').filter(c => c.id !== id));
  renderCustomers();
  showToast('تم حذف العميل');
}

// ─── SALES ───────────────────────────────
function renderSales(filter = '') {
  const data = DB.get('sales').filter(s =>
    (s.invoiceNo || '').includes(filter) || (s.customerName || '').includes(filter)
  ).sort((a, b) => new Date(b.date) - new Date(a.date));
  const tbody = document.getElementById('sales-table');
  tbody.innerHTML = data.length === 0
    ? '<tr><td colspan="6" class="text-center">لا توجد فواتير مبيعات</td></tr>'
    : data.map(s => `
      <tr>
        <td>${s.invoiceNo}</td>
        <td>${formatDate(s.date)}</td>
        <td>${s.customerName}</td>
        <td>${formatMoney(s.total)}</td>
        <td><span class="badge badge-success">مكتملة</span></td>
        <td>
          <button class="btn btn-sm btn-secondary btn-icon" onclick="printInvoice('sale',${s.id})" title="طباعة"><i class="fas fa-print"></i></button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="deleteSale(${s.id})" title="حذف"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`).join('');
}

document.getElementById('search-sales')?.addEventListener('input', e => renderSales(e.target.value));

function deleteSale(id) {
  if (!confirm('هل تريد حذف هذه الفاتورة؟')) return;
  DB.set('sales', DB.get('sales').filter(s => s.id !== id));
  renderSales(); updateDashboard();
  showToast('تم حذف الفاتورة');
}

function populateSaleCustomers() {
  const sel = document.getElementById('sale-customer');
  const current = sel.value;
  sel.innerHTML = '<option value="">اختر العميل</option>' +
    DB.get('customers').map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  if (current) sel.value = current;
}

function addSaleItem() {
  const tbody = document.querySelector('#sale-items-table tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" class="form-control item-desc" placeholder="البيان" style="width:100%"></td>
    <td><input type="number" class="form-control item-qty" value="1" min="0.01" step="0.01" style="width:80px" oninput="calcSaleRow(this)"></td>
    <td><input type="number" class="form-control item-price" value="0" min="0" step="0.01" style="width:100px" oninput="calcSaleRow(this)"></td>
    <td class="item-total">0</td>
    <td><button type="button" class="btn btn-sm btn-danger btn-icon" onclick="this.closest('tr').remove();updateSaleTotal()"><i class="fas fa-times"></i></button></td>`;
  tbody.appendChild(row);
  styleInlineInputs(row);
}

function calcSaleRow(el) {
  const row = el.closest('tr');
  const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
  const price = parseFloat(row.querySelector('.item-price').value) || 0;
  row.querySelector('.item-total').textContent = formatMoney(qty * price);
  updateSaleTotal();
}

function updateSaleTotal() {
  let sub = 0;
  document.querySelectorAll('#sale-items-table tbody tr').forEach(row => {
    const qty = parseFloat(row.querySelector('.item-qty')?.value) || 0;
    const price = parseFloat(row.querySelector('.item-price')?.value) || 0;
    sub += qty * price;
  });
  const discount = parseFloat(document.getElementById('sale-discount').value) || 0;
  const taxPct = parseFloat(document.getElementById('sale-tax').value) || 0;
  const total = (sub - discount) * (1 + taxPct / 100);
  document.getElementById('sale-total').textContent = formatMoney(Math.max(0, total));
}

// ─── PURCHASES ───────────────────────────
function renderPurchases(filter = '') {
  const data = DB.get('purchases').filter(p =>
    (p.invoiceNo || '').includes(filter) || (p.supplier || '').includes(filter)
  ).sort((a, b) => new Date(b.date) - new Date(a.date));
  const tbody = document.getElementById('purchases-table');
  tbody.innerHTML = data.length === 0
    ? '<tr><td colspan="6" class="text-center">لا توجد فواتير مشتريات</td></tr>'
    : data.map(p => `
      <tr>
        <td>${p.invoiceNo}</td>
        <td>${formatDate(p.date)}</td>
        <td>${p.supplier}</td>
        <td>${formatMoney(p.total)}</td>
        <td><span class="badge badge-info">مكتملة</span></td>
        <td>
          <button class="btn btn-sm btn-secondary btn-icon" onclick="printInvoice('purchase',${p.id})" title="طباعة"><i class="fas fa-print"></i></button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="deletePurchase(${p.id})" title="حذف"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`).join('');
}

document.getElementById('search-purchases')?.addEventListener('input', e => renderPurchases(e.target.value));

function deletePurchase(id) {
  if (!confirm('هل تريد حذف هذه الفاتورة؟')) return;
  DB.set('purchases', DB.get('purchases').filter(p => p.id !== id));
  renderPurchases(); updateDashboard();
  showToast('تم حذف الفاتورة');
}

function addPurchaseItem() {
  const tbody = document.querySelector('#purchase-items-table tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" class="form-control item-desc" placeholder="البيان" style="width:100%"></td>
    <td><input type="number" class="form-control item-qty" value="1" min="0.01" step="0.01" style="width:80px" oninput="calcPurchaseRow(this)"></td>
    <td><input type="number" class="form-control item-price" value="0" min="0" step="0.01" style="width:100px" oninput="calcPurchaseRow(this)"></td>
    <td class="item-total">0</td>
    <td><button type="button" class="btn btn-sm btn-danger btn-icon" onclick="this.closest('tr').remove();updatePurchaseTotal()"><i class="fas fa-times"></i></button></td>`;
  tbody.appendChild(row);
  styleInlineInputs(row);
}

function calcPurchaseRow(el) {
  const row = el.closest('tr');
  const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
  const price = parseFloat(row.querySelector('.item-price').value) || 0;
  row.querySelector('.item-total').textContent = formatMoney(qty * price);
  updatePurchaseTotal();
}

function updatePurchaseTotal() {
  let total = 0;
  document.querySelectorAll('#purchase-items-table tbody tr').forEach(row => {
    const qty = parseFloat(row.querySelector('.item-qty')?.value) || 0;
    const price = parseFloat(row.querySelector('.item-price')?.value) || 0;
    total += qty * price;
  });
  document.getElementById('purchase-total').textContent = formatMoney(total);
}

// ─── EXPENSES ────────────────────────────
function renderExpenses(filter = '') {
  const cats = { salaries:'رواتب', rent:'إيجار', utilities:'فواتير خدمات', transport:'مواصلات', maintenance:'صيانة', other:'أخرى' };
  const data = DB.get('expenses').filter(e =>
    (e.description || '').includes(filter)
  ).sort((a, b) => new Date(b.date) - new Date(a.date));
  const tbody = document.getElementById('expenses-table');
  tbody.innerHTML = data.length === 0
    ? '<tr><td colspan="6" class="text-center">لا توجد مصروفات</td></tr>'
    : data.map((e, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${formatDate(e.date)}</td>
        <td>${e.description}</td>
        <td>${cats[e.category] || e.category}</td>
        <td>${formatMoney(e.amount)}</td>
        <td>
          <button class="btn btn-sm btn-secondary btn-icon" onclick="editExpense(${e.id})" title="تعديل"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="deleteExpense(${e.id})" title="حذف"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`).join('');
}

document.getElementById('search-expenses')?.addEventListener('input', e => renderExpenses(e.target.value));

function editExpense(id) {
  const e = DB.get('expenses').find(x => x.id === id);
  if (!e) return;
  document.getElementById('expense-id').value = e.id;
  document.getElementById('expense-description').value = e.description;
  document.getElementById('expense-category').value = e.category;
  document.getElementById('expense-amount').value = e.amount;
  document.getElementById('expense-date').value = e.date;
  document.getElementById('expense-notes').value = e.notes || '';
  document.querySelector('#expense-modal .modal-header h3').textContent = 'تعديل مصروف';
  showModal('expense-modal');
}

function deleteExpense(id) {
  if (!confirm('هل تريد حذف هذا المصروف؟')) return;
  DB.set('expenses', DB.get('expenses').filter(e => e.id !== id));
  renderExpenses(); updateDashboard();
  showToast('تم حذف المصروف');
}

// ─── PAYROLL ─────────────────────────────
function renderEmployees() {
  const data = DB.get('employees');
  const tbody = document.getElementById('employees-table');
  tbody.innerHTML = data.length === 0
    ? '<tr><td colspan="5" class="text-center">لا يوجد موظفون</td></tr>'
    : data.map((e, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${e.name}</td>
        <td>${e.position || '-'}</td>
        <td>${formatMoney(e.salary)}</td>
        <td>
          <button class="btn btn-sm btn-secondary btn-icon" onclick="editEmployee(${e.id})" title="تعديل"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="deleteEmployee(${e.id})" title="حذف"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`).join('');
}

function renderPayroll() {
  const data = DB.get('payroll').sort((a, b) => new Date(b.date) - new Date(a.date));
  const tbody = document.getElementById('payroll-table');
  tbody.innerHTML = data.length === 0
    ? '<tr><td colspan="6" class="text-center">لا يوجد سجلات رواتب</td></tr>'
    : data.map(p => `
      <tr>
        <td>${formatDate(p.date)}</td>
        <td>${p.employeeName}</td>
        <td>${formatMoney(p.base)}</td>
        <td>${formatMoney(p.bonus)}</td>
        <td>${formatMoney(p.deductions)}</td>
        <td><strong>${formatMoney(p.net)}</strong></td>
      </tr>`).join('');
}

function populateSalaryEmployees() {
  const sel = document.getElementById('salary-employee');
  sel.innerHTML = '<option value="">اختر الموظف</option>' +
    DB.get('employees').map(e => `<option value="${e.id}">${e.name}</option>`).join('');
  sel.onchange = function () {
    const emp = DB.get('employees').find(e => e.id == this.value);
    if (emp) {
      document.getElementById('salary-base').value = emp.salary;
      calcSalaryNet();
    }
  };
  ['salary-bonus', 'salary-deductions'].forEach(id => {
    document.getElementById(id).oninput = calcSalaryNet;
  });
}

function calcSalaryNet() {
  const base = parseFloat(document.getElementById('salary-base').value) || 0;
  const bonus = parseFloat(document.getElementById('salary-bonus').value) || 0;
  const ded = parseFloat(document.getElementById('salary-deductions').value) || 0;
  document.getElementById('salary-net').value = (base + bonus - ded).toFixed(2);
}

function editEmployee(id) {
  const e = DB.get('employees').find(x => x.id === id);
  if (!e) return;
  document.getElementById('employee-id').value = e.id;
  document.getElementById('employee-name').value = e.name;
  document.getElementById('employee-position').value = e.position || '';
  document.getElementById('employee-phone').value = e.phone || '';
  document.getElementById('employee-salary').value = e.salary;
  document.getElementById('employee-hire-date').value = e.hireDate || '';
  document.querySelector('#employee-modal .modal-header h3').textContent = 'تعديل موظف';
  showModal('employee-modal');
}

function deleteEmployee(id) {
  if (!confirm('هل تريد حذف هذا الموظف؟')) return;
  DB.set('employees', DB.get('employees').filter(e => e.id !== id));
  renderEmployees();
  showToast('تم حذف الموظف');
}

// ─── USERS ───────────────────────────────
function renderUsers() {
  const data = DB.get('users');
  const tbody = document.getElementById('users-table');
  tbody.innerHTML = data.map((u, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${u.username}</td>
      <td><span class="badge badge-${u.role === 'admin' ? 'success' : 'info'}">${u.role === 'admin' ? 'مدير' : 'مستخدم'}</span></td>
      <td>
        ${u.username !== 'admin' ? `<button class="btn btn-sm btn-danger btn-icon" onclick="deleteUser(${u.id})" title="حذف"><i class="fas fa-trash"></i></button>` : '-'}
      </td>
    </tr>`).join('');
}

function deleteUser(id) {
  if (!confirm('هل تريد حذف هذا المستخدم؟')) return;
  DB.set('users', DB.get('users').filter(u => u.id !== id));
  renderUsers();
  showToast('تم حذف المستخدم');
}

// ─── FORMS SETUP ─────────────────────────
function setupForms() {
  // Customer form
  document.getElementById('customer-form').onsubmit = function (e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('customer-id').value);
    const customers = DB.get('customers');
    const obj = {
      name: document.getElementById('customer-name').value.trim(),
      phone: document.getElementById('customer-phone').value.trim(),
      address: document.getElementById('customer-address').value.trim(),
      email: document.getElementById('customer-email').value.trim(),
      balance: parseFloat(document.getElementById('customer-balance').value) || 0
    };
    if (id) {
      const idx = customers.findIndex(c => c.id === id);
      customers[idx] = { ...customers[idx], ...obj };
      showToast('تم تعديل العميل');
    } else {
      obj.id = Date.now();
      customers.push(obj);
      showToast('تم إضافة العميل');
    }
    DB.set('customers', customers);
    closeModal('customer-modal');
    renderCustomers();
    document.querySelector('#customer-modal .modal-header h3').textContent = 'عميل جديد';
  };

  // Sales form
  document.getElementById('sales-form').onsubmit = function (e) {
    e.preventDefault();
    const customerId = document.getElementById('sale-customer').value;
    if (!customerId) { showToast('الرجاء اختيار العميل', 'error'); return; }
    const rows = document.querySelectorAll('#sale-items-table tbody tr');
    if (rows.length === 0) { showToast('الرجاء إضافة صنف واحد على الأقل', 'error'); return; }
    const items = [];
    rows.forEach(row => {
      items.push({
        desc: row.querySelector('.item-desc')?.value || '',
        qty: parseFloat(row.querySelector('.item-qty')?.value) || 0,
        price: parseFloat(row.querySelector('.item-price')?.value) || 0,
        total: (parseFloat(row.querySelector('.item-qty')?.value) || 0) * (parseFloat(row.querySelector('.item-price')?.value) || 0)
      });
    });
    const sub = items.reduce((s, i) => s + i.total, 0);
    const discount = parseFloat(document.getElementById('sale-discount').value) || 0;
    const taxPct = parseFloat(document.getElementById('sale-tax').value) || 0;
    const total = (sub - discount) * (1 + taxPct / 100);
    const customer = DB.get('customers').find(c => c.id == customerId);
    const sales = DB.get('sales');
    const obj = {
      id: Date.now(),
      invoiceNo: 'INV-' + String(sales.length + 1).padStart(4, '0'),
      customerId, customerName: customer?.name || '',
      date: document.getElementById('sale-date').value,
      items, discount, taxPct, total: Math.max(0, total),
      notes: document.getElementById('sale-notes').value
    };
    sales.push(obj);
    DB.set('sales', sales);
    // Update customer balance
    if (customer) {
      customer.balance = (customer.balance || 0) + total;
      const customers = DB.get('customers');
      const idx = customers.findIndex(c => c.id == customerId);
      if (idx !== -1) { customers[idx] = customer; DB.set('customers', customers); }
    }
    closeModal('sales-modal');
    renderSales(); updateDashboard();
    showToast('تم حفظ فاتورة المبيعات');
  };

  // Purchase form
  document.getElementById('purchase-form').onsubmit = function (e) {
    e.preventDefault();
    const rows = document.querySelectorAll('#purchase-items-table tbody tr');
    if (rows.length === 0) { showToast('الرجاء إضافة صنف واحد على الأقل', 'error'); return; }
    const items = [];
    rows.forEach(row => {
      items.push({
        desc: row.querySelector('.item-desc')?.value || '',
        qty: parseFloat(row.querySelector('.item-qty')?.value) || 0,
        price: parseFloat(row.querySelector('.item-price')?.value) || 0,
        total: (parseFloat(row.querySelector('.item-qty')?.value) || 0) * (parseFloat(row.querySelector('.item-price')?.value) || 0)
      });
    });
    const total = items.reduce((s, i) => s + i.total, 0);
    const purchases = DB.get('purchases');
    const obj = {
      id: Date.now(),
      invoiceNo: 'PUR-' + String(purchases.length + 1).padStart(4, '0'),
      supplier: document.getElementById('purchase-supplier').value.trim(),
      date: document.getElementById('purchase-date').value,
      items, total
    };
    purchases.push(obj);
    DB.set('purchases', purchases);
    closeModal('purchase-modal');
    renderPurchases(); updateDashboard();
    showToast('تم حفظ فاتورة المشتريات');
  };

  // Expense form
  document.getElementById('expense-form').onsubmit = function (e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('expense-id').value);
    const expenses = DB.get('expenses');
    const obj = {
      description: document.getElementById('expense-description').value.trim(),
      category: document.getElementById('expense-category').value,
      amount: parseFloat(document.getElementById('expense-amount').value) || 0,
      date: document.getElementById('expense-date').value,
      notes: document.getElementById('expense-notes').value
    };
    if (id) {
      const idx = expenses.findIndex(e => e.id === id);
      expenses[idx] = { ...expenses[idx], ...obj };
      showToast('تم تعديل المصروف');
    } else {
      obj.id = Date.now();
      expenses.push(obj);
      showToast('تم إضافة المصروف');
    }
    DB.set('expenses', expenses);
    closeModal('expense-modal');
    renderExpenses(); updateDashboard();
    document.querySelector('#expense-modal .modal-header h3').textContent = 'مصروف جديد';
  };

  // Employee form
  document.getElementById('employee-form').onsubmit = function (e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('employee-id').value);
    const employees = DB.get('employees');
    const obj = {
      name: document.getElementById('employee-name').value.trim(),
      position: document.getElementById('employee-position').value.trim(),
      phone: document.getElementById('employee-phone').value.trim(),
      salary: parseFloat(document.getElementById('employee-salary').value) || 0,
      hireDate: document.getElementById('employee-hire-date').value
    };
    if (id) {
      const idx = employees.findIndex(em => em.id === id);
      employees[idx] = { ...employees[idx], ...obj };
      showToast('تم تعديل الموظف');
    } else {
      obj.id = Date.now();
      employees.push(obj);
      showToast('تم إضافة الموظف');
    }
    DB.set('employees', employees);
    closeModal('employee-modal');
    renderEmployees();
    document.querySelector('#employee-modal .modal-header h3').textContent = 'موظف جديد';
  };

  // Salary form
  document.getElementById('salary-form').onsubmit = function (e) {
    e.preventDefault();
    const empId = document.getElementById('salary-employee').value;
    if (!empId) { showToast('الرجاء اختيار الموظف', 'error'); return; }
    const emp = DB.get('employees').find(em => em.id == empId);
    const payroll = DB.get('payroll');
    const obj = {
      id: Date.now(),
      employeeId: empId,
      employeeName: emp?.name || '',
      base: parseFloat(document.getElementById('salary-base').value) || 0,
      bonus: parseFloat(document.getElementById('salary-bonus').value) || 0,
      deductions: parseFloat(document.getElementById('salary-deductions').value) || 0,
      net: parseFloat(document.getElementById('salary-net').value) || 0,
      date: document.getElementById('salary-date').value,
      notes: document.getElementById('salary-notes').value
    };
    payroll.push(obj);
    DB.set('payroll', payroll);
    closeModal('salary-modal');
    renderPayroll(); updateDashboard();
    showToast('تم صرف الراتب');
  };

  // User form
  document.getElementById('user-form').onsubmit = function (e) {
    e.preventDefault();
    const users = DB.get('users');
    const username = document.getElementById('user-username').value.trim();
    if (users.some(u => u.username === username)) {
      showToast('اسم المستخدم موجود مسبقاً', 'error'); return;
    }
    const obj = {
      id: Date.now(),
      username,
      password: document.getElementById('user-password').value,
      role: document.getElementById('user-role').value
    };
    users.push(obj);
    DB.set('users', users);
    closeModal('user-modal');
    renderUsers();
    showToast('تم إضافة المستخدم');
  };

  // Sale discount/tax listeners
  ['sale-discount', 'sale-tax'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateSaleTotal);
  });
}

// ─── REPORTS ─────────────────────────────
function generateReport() {
  const from = document.getElementById('report-from').value;
  const to = document.getElementById('report-to').value;
  const type = document.getElementById('report-type').value;

  function inRange(date) {
    if (!from && !to) return true;
    if (from && date < from) return false;
    if (to && date > to) return false;
    return true;
  }

  const salesTotal = (type === 'all' || type === 'sales')
    ? DB.get('sales').filter(s => inRange(s.date)).reduce((s, i) => s + i.total, 0) : 0;
  const purchasesTotal = (type === 'all' || type === 'purchases')
    ? DB.get('purchases').filter(p => inRange(p.date)).reduce((s, i) => s + i.total, 0) : 0;
  const expensesTotal = (type === 'all' || type === 'expenses')
    ? DB.get('expenses').filter(e => inRange(e.date)).reduce((s, i) => s + i.amount, 0) : 0;
  const payrollTotal = (type === 'all' || type === 'payroll')
    ? DB.get('payroll').filter(p => inRange(p.date)).reduce((s, i) => s + i.net, 0) : 0;
  const net = salesTotal - purchasesTotal - expensesTotal - payrollTotal;

  document.getElementById('report-sales').textContent = formatMoney(salesTotal);
  document.getElementById('report-purchases').textContent = formatMoney(purchasesTotal);
  document.getElementById('report-expenses').textContent = formatMoney(expensesTotal);
  document.getElementById('report-payroll').textContent = formatMoney(payrollTotal);
  const netEl = document.getElementById('report-net');
  netEl.textContent = formatMoney(net);
  netEl.style.color = net >= 0 ? 'var(--success)' : 'var(--danger)';

  showToast('تم تحديث التقرير');
}

// ─── PRINT ───────────────────────────────
function printInvoice(type, id) {
  let inv, title;
  if (type === 'sale') {
    inv = DB.get('sales').find(s => s.id === id);
    title = 'فاتورة مبيعات';
  } else {
    inv = DB.get('purchases').find(p => p.id === id);
    title = 'فاتورة مشتريات';
  }
  if (!inv) return;

  const party = type === 'sale'
    ? `<p><span>العميل:</span> ${inv.customerName}</p>`
    : `<p><span>المورد:</span> ${inv.supplier}</p>`;

  const rows = (inv.items || []).map(item => `
    <tr>
      <td>${item.desc}</td>
      <td>${item.qty}</td>
      <td>${formatMoney(item.price)}</td>
      <td>${formatMoney(item.total)}</td>
    </tr>`).join('');

  document.getElementById('print-content').innerHTML = `
    <div class="print-invoice">
      <div class="print-invoice-header">
        <h2>${title}</h2>
        <p>${inv.invoiceNo}</p>
      </div>
      <div class="print-invoice-info">
        ${party}
        <p><span>التاريخ:</span> ${formatDate(inv.date)}</p>
      </div>
      <table class="table" style="margin-bottom:16px">
        <thead><tr><th>البيان</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${inv.discount ? `<p>الخصم: ${formatMoney(inv.discount)}</p>` : ''}
      ${inv.taxPct ? `<p>الضريبة: ${inv.taxPct}%</p>` : ''}
      <div class="invoice-total" style="text-align:right">
        <span>الإجمالي الكلي: <strong>${formatMoney(inv.total)}</strong></span>
      </div>
      ${inv.notes ? `<p style="margin-top:12px;color:#666">ملاحظات: ${inv.notes}</p>` : ''}
    </div>`;

  showModal('print-modal');
}

// ─── HELPERS ─────────────────────────────
function formatMoney(n) {
  return (parseFloat(n) || 0).toLocaleString('ar-IQ', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' د.ع';
}

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('ar-IQ', { year: 'numeric', month: 'short', day: 'numeric' });
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function styleInlineInputs(row) {
  row.querySelectorAll('input').forEach(inp => {
    inp.style.border = '1px solid var(--gray-300)';
    inp.style.borderRadius = '6px';
    inp.style.padding = '6px 10px';
    inp.style.fontFamily = 'Tajawal, sans-serif';
    inp.style.fontSize = '13px';
  });
}

function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; }, 2500);
  setTimeout(() => toast.remove(), 2900);
}
