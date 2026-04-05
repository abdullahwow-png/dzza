<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نظام المحاسبة - شركة</title>
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Login Screen -->
    <div id="login-screen" class="login-screen">
        <div class="login-box">
            <div class="login-logo">
                <i class="fas fa-calculator"></i>
                <h1>نظام المحاسبة</h1>
            </div>
            <form id="login-form">
                <div class="form-group">
                    <label>اسم المستخدم</label>
                    <input type="text" id="username" placeholder="أدخل اسم المستخدم" required>
                </div>
                <div class="form-group">
                    <label>كلمة المرور</label>
                    <input type="password" id="password" placeholder="أدخل كلمة المرور" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                    <i class="fas fa-sign-in-alt"></i> تسجيل الدخول
                </button>
            </form>
        </div>
    </div>

    <!-- Main App -->
    <div id="app" class="app hidden">
        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <i class="fas fa-calculator"></i>
                <span>نظام المحاسبة</span>
                <button class="close-sidebar" id="close-sidebar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <nav class="sidebar-nav">
                <a href="#" class="nav-item active" data-page="dashboard">
                    <i class="fas fa-home"></i>
                    <span>الرئيسية</span>
                </a>
                <a href="#" class="nav-item" data-page="customers">
                    <i class="fas fa-users"></i>
                    <span>العملاء</span>
                </a>
                <a href="#" class="nav-item" data-page="sales">
                    <i class="fas fa-shopping-cart"></i>
                    <span>فواتير المبيعات</span>
                </a>
                <a href="#" class="nav-item" data-page="purchases">
                    <i class="fas fa-truck"></i>
                    <span>فواتير المشتريات</span>
                </a>
                <a href="#" class="nav-item" data-page="expenses">
                    <i class="fas fa-wallet"></i>
                    <span>المصروفات</span>
                </a>
                <a href="#" class="nav-item" data-page="payroll">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>الرواتب</span>
                </a>
                <a href="#" class="nav-item" data-page="reports">
                    <i class="fas fa-chart-bar"></i>
                    <span>التقارير المالية</span>
                </a>
                <a href="#" class="nav-item" data-page="users" id="users-menu">
                    <i class="fas fa-user-cog"></i>
                    <span>إدارة المستخدمين</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <span id="current-user">المستخدم</span>
                <button id="logout-btn" class="btn btn-sm btn-danger">
                    <i class="fas fa-sign-out-alt"></i> خروج
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Header -->
            <header class="header">
                <button class="menu-toggle" id="menu-toggle">
                    <i class="fas fa-bars"></i>
                </button>
                <h2 id="page-title">الرئيسية</h2>
                <div class="header-actions">
                    <span id="current-date"></span>
                </div>
            </header>

            <!-- Dashboard Page -->
            <div class="page active" id="page-dashboard">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-arrow-up"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-sales">0</h3>
                            <p>إجمالي المبيعات</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-danger">
                            <i class="fas fa-arrow-down"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-purchases">0</h3>
                            <p>إجمالي المشتريات</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-expenses">0</h3>
                            <p>إجمالي المصروفات</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-info">
                            <i class="fas fa-balance-scale"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="net-profit">0</h3>
                            <p>صافي الربح</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-sections">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-clock"></i> آخر الفواتير</h3>
                        </div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>رقم الفاتورة</th>
                                        <th>النوع</th>
                                        <th>العميل/المورد</th>
                                        <th>المبلغ</th>
                                        <th>التاريخ</th>
                                    </tr>
                                </thead>
                                <tbody id="recent-invoices">
                                    <tr><td colspan="5" class="text-center">لا توجد فواتير</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Customers Page -->
            <div class="page" id="page-customers">
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="showModal('customer-modal')">
                        <i class="fas fa-plus"></i> عميل جديد
                    </button>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>قائمة العملاء</h3>
                        <input type="text" class="search-input" id="search-customers" placeholder="بحث...">
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>الاسم</th>
                                        <th>الهاتف</th>
                                        <th>العنوان</th>
                                        <th>الرصيد</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="customers-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sales Page -->
            <div class="page" id="page-sales">
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="showModal('sales-modal')">
                        <i class="fas fa-plus"></i> فاتورة بيع جديدة
                    </button>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>فواتير المبيعات</h3>
                        <input type="text" class="search-input" id="search-sales" placeholder="بحث...">
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>رقم الفاتورة</th>
                                        <th>التاريخ</th>
                                        <th>العميل</th>
                                        <th>المبلغ</th>
                                        <th>الحالة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="sales-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Purchases Page -->
            <div class="page" id="page-purchases">
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="showModal('purchase-modal')">
                        <i class="fas fa-plus"></i> فاتورة شراء جديدة
                    </button>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>فواتير المشتريات</h3>
                        <input type="text" class="search-input" id="search-purchases" placeholder="بحث...">
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>رقم الفاتورة</th>
                                        <th>التاريخ</th>
                                        <th>المورد</th>
                                        <th>المبلغ</th>
                                        <th>الحالة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="purchases-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Expenses Page -->
            <div class="page" id="page-expenses">
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="showModal('expense-modal')">
                        <i class="fas fa-plus"></i> مصروف جديد
                    </button>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>المصروفات</h3>
                        <input type="text" class="search-input" id="search-expenses" placeholder="بحث...">
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>التاريخ</th>
                                        <th>البيان</th>
                                        <th>الفئة</th>
                                        <th>المبلغ</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="expenses-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payroll Page -->
            <div class="page" id="page-payroll">
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="showModal('employee-modal')">
                        <i class="fas fa-plus"></i> موظف جديد
                    </button>
                    <button class="btn btn-success" onclick="showModal('salary-modal')">
                        <i class="fas fa-money-check"></i> صرف راتب
                    </button>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>الموظفين</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>الاسم</th>
                                        <th>الوظيفة</th>
                                        <th>الراتب الأساسي</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="employees-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-header">
                        <h3>سجل الرواتب</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>التاريخ</th>
                                        <th>الموظف</th>
                                        <th>الراتب</th>
                                        <th>الإضافات</th>
                                        <th>الخصومات</th>
                                        <th>الصافي</th>
                                    </tr>
                                </thead>
                                <tbody id="payroll-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reports Page -->
            <div class="page" id="page-reports">
                <div class="card">
                    <div class="card-header">
                        <h3>التقارير المالية</h3>
                    </div>
                    <div class="card-body">
                        <div class="report-filters">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>من تاريخ</label>
                                    <input type="date" id="report-from">
                                </div>
                                <div class="form-group">
                                    <label>إلى تاريخ</label>
                                    <input type="date" id="report-to">
                                </div>
                                <div class="form-group">
                                    <label>نوع التقرير</label>
                                    <select id="report-type">
                                        <option value="all">الكل</option>
                                        <option value="sales">المبيعات</option>
                                        <option value="purchases">المشتريات</option>
                                        <option value="expenses">المصروفات</option>
                                        <option value="payroll">الرواتب</option>
                                    </select>
                                </div>
                                <button class="btn btn-primary" onclick="generateReport()">
                                    <i class="fas fa-sync"></i> عرض
                                </button>
                            </div>
                        </div>
                        <div id="report-results" class="mt-4">
                            <div class="report-summary">
                                <div class="summary-item">
                                    <span>إجمالي المبيعات:</span>
                                    <strong id="report-sales">0</strong>
                                </div>
                                <div class="summary-item">
                                    <span>إجمالي المشتريات:</span>
                                    <strong id="report-purchases">0</strong>
                                </div>
                                <div class="summary-item">
                                    <span>إجمالي المصروفات:</span>
                                    <strong id="report-expenses">0</strong>
                                </div>
                                <div class="summary-item">
                                    <span>إجمالي الرواتب:</span>
                                    <strong id="report-payroll">0</strong>
                                </div>
                                <div class="summary-item total">
                                    <span>صافي الربح/الخسارة:</span>
                                    <strong id="report-net">0</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Users Page -->
            <div class="page" id="page-users">
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="showModal('user-modal')">
                        <i class="fas fa-plus"></i> مستخدم جديد
                    </button>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>المستخدمين</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>اسم المستخدم</th>
                                        <th>الدور</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="users-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Modals -->
    <!-- Customer Modal -->
    <div class="modal" id="customer-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>عميل جديد</h3>
                <button class="close-modal" onclick="closeModal('customer-modal')">&times;</button>
            </div>
            <form id="customer-form">
                <input type="hidden" id="customer-id">
                <div class="form-group">
                    <label>الاسم *</label>
                    <input type="text" id="customer-name" required>
                </div>
                <div class="form-group">
                    <label>الهاتف</label>
                    <input type="tel" id="customer-phone">
                </div>
                <div class="form-group">
                    <label>العنوان</label>
                    <input type="text" id="customer-address">
                </div>
                <div class="form-group">
                    <label>البريد الإلكتروني</label>
                    <input type="email" id="customer-email">
                </div>
                <div class="form-group">
                    <label>الرصيد الافتتاحي</label>
                    <input type="number" id="customer-balance" value="0" step="0.01">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('customer-modal')">إلغاء</button>
                    <button type="submit" class="btn btn-primary">حفظ</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Sales Invoice Modal -->
    <div class="modal" id="sales-modal">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <h3>فاتورة بيع جديدة</h3>
                <button class="close-modal" onclick="closeModal('sales-modal')">&times;</button>
            </div>
            <form id="sales-form">
                <input type="hidden" id="sale-id">
                <div class="form-row">
                    <div class="form-group">
                        <label>العميل *</label>
                        <select id="sale-customer" required>
                            <option value="">اختر العميل</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>التاريخ</label>
                        <input type="date" id="sale-date" required>
                    </div>
                </div>
                <div class="invoice-items">
                    <h4>الأصناف</h4>
                    <table class="table" id="sale-items-table">
                        <thead>
                            <tr>
                                <th>البيان</th>
                                <th>الكمية</th>
                                <th>السعر</th>
                                <th>الإجمالي</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <button type="button" class="btn btn-sm btn-secondary" onclick="addSaleItem()">
                        <i class="fas fa-plus"></i> إضافة صنف
                    </button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>الخصم</label>
                        <input type="number" id="sale-discount" value="0" step="0.01">
                    </div>
                    <div class="form-group">
                        <label>الضريبة (%)</label>
                        <input type="number" id="sale-tax" value="0" step="0.01">
                    </div>
                </div>
                <div class="invoice-total">
                    <span>الإجمالي: <strong id="sale-total">0</strong></span>
                </div>
                <div class="form-group">
                    <label>ملاحظات</label>
                    <textarea id="sale-notes" rows="2"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('sales-modal')">إلغاء</button>
                    <button type="submit" class="btn btn-primary">حفظ الفاتورة</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Purchase Modal -->
    <div class="modal" id="purchase-modal">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <h3>فاتورة شراء جديدة</h3>
                <button class="close-modal" onclick="closeModal('purchase-modal')">&times;</button>
            </div>
            <form id="purchase-form">
                <input type="hidden" id="purchase-id">
                <div class="form-row">
                    <div class="form-group">
                        <label>المورد *</label>
                        <input type="text" id="purchase-supplier" required>
                    </div>
                    <div class="form-group">
                        <label>التاريخ</label>
                        <input type="date" id="purchase-date" required>
                    </div>
                </div>
                <div class="invoice-items">
                    <h4>الأصناف</h4>
                    <table class="table" id="purchase-items-table">
                        <thead>
                            <tr>
                                <th>البيان</th>
                                <th>الكمية</th>
                                <th>السعر</th>
                                <th>الإجمالي</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <button type="button" class="btn btn-sm btn-secondary" onclick="addPurchaseItem()">
                        <i class="fas fa-plus"></i> إضافة صنف
                    </button>
                </div>
                <div class="invoice-total">
                    <span>الإجمالي: <strong id="purchase-total">0</strong></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('purchase-modal')">إلغاء</button>
                    <button type="submit" class="btn btn-primary">حفظ الفاتورة</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Expense Modal -->
    <div class="modal" id="expense-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>مصروف جديد</h3>
                <button class="close-modal" onclick="closeModal('expense-modal')">&times;</button>
            </div>
            <form id="expense-form">
                <input type="hidden" id="expense-id">
                <div class="form-group">
                    <label>البيان *</label>
                    <input type="text" id="expense-description" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>الفئة *</label>
                        <select id="expense-category" required>
                            <option value="">اختر الفئة</option>
                            <option value="salaries">رواتب</option>
                            <option value="rent">إيجار</option>
                            <option value="utilities">فواتير خدمات</option>
                            <option value="transport">مواصلات</option>
                            <option value="maintenance">صيانة</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>المبلغ *</label>
                        <input type="number" id="expense-amount" required step="0.01">
                    </div>
                </div>
                <div class="form-group">
                    <label>التاريخ</label>
                    <input type="date" id="expense-date" required>
                </div>
                <div class="form-group">
                    <label>ملاحظات</label>
                    <textarea id="expense-notes" rows="2"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('expense-modal')">إلغاء</button>
                    <button type="submit" class="btn btn-primary">حفظ</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Employee Modal -->
    <div class="modal" id="employee-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>موظف جديد</h3>
                <button class="close-modal" onclick="closeModal('employee-modal')">&times;</button>
            </div>
            <form id="employee-form">
                <input type="hidden" id="employee-id">
                <div class="form-group">
                    <label>الاسم *</label>
                    <input type="text" id="employee-name" required>
                </div>
                <div class="form-group">
                    <label>الوظيفة</label>
                    <input type="text" id="employee-position">
                </div>
                <div class="form-group">
                    <label>الهاتف</label>
                    <input type="tel" id="employee-phone">
                </div>
                <div class="form-group">
                    <label>الراتب الأساسي *</label>
                    <input type="number" id="employee-salary" required step="0.01">
                </div>
                <div class="form-group">
                    <label>تاريخ التعيين</label>
                    <input type="date" id="employee-hire-date">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('employee-modal')">إلغاء</button>
                    <button type="submit" class="btn btn-primary">حفظ</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Salary Modal -->
    <div class="modal" id="salary-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>صرف راتب</h3>
                <button class="close-modal" onclick="closeModal('salary-modal')">&times;</button>
            </div>
            <form id="salary-form">
                <div class="form-group">
                    <label>الموظف *</label>
                    <select id="salary-employee" required>
                        <option value="">اختر الموظف</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>الراتب الأساسي</label>
                        <input type="number" id="salary-base" readonly>
                    </div>
                    <div class="form-group">
                        <label>الإضافات</label>
                        <input type="number" id="salary-bonus" value="0" step="0.01">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>الخصومات</label>
                        <input type="number" id="salary-deductions" value="0" step="0.01">
                    </div>
                    <div class="form-group">
                        <label>الصافي</label>
                        <input type="number" id="salary-net" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label>التاريخ</label>
                    <input type="date" id="salary-date" required>
                </div>
                <div class="form-group">
                    <label>ملاحظات</label>
                    <textarea id="salary-notes" rows="2"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('salary-modal')">إلغاء</button>
                    <button type="submit" class="btn btn-primary">صرف الراتب</button>
                </div>
            </form>
        </div>
    </div>

    <!-- User Modal -->
    <div class="modal" id="user-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>مستخدم جديد</h3>
                <button class="close-modal" onclick="closeModal('user-modal')">&times;</button>
            </div>
            <form id="user-form">
                <input type="hidden" id="user-edit-id">
                <div class="form-group">
                    <label>اسم المستخدم *</label>
                    <input type="text" id="user-username" required>
                </div>
                <div class="form-group">
                    <label>كلمة المرور *</label>
                    <input type="password" id="user-password" required>
                </div>
                <div class="form-group">
                    <label>الدور</label>
                    <select id="user-role">
                        <option value="admin">مدير</option>
                        <option value="user">مستخدم</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('user-modal')">إلغاء</button>
                    <button type="submit" class="btn btn-primary">حفظ</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Print Modal -->
    <div class="modal" id="print-modal">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <h3>معاينة الفاتورة</h3>
                <button class="close-modal" onclick="closeModal('print-modal')">&times;</button>
            </div>
            <div id="print-content" class="print-area"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal('print-modal')">إغلاق</button>
                <button type="button" class="btn btn-primary" onclick="window.print()">
                    <i class="fas fa-print"></i> طباعة
                </button>
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
