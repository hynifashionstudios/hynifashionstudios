const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://hynifashionstudios-1xwd.vercel.app/api'
    : 'http://localhost:5000/api'
);

export function getToken() {
  return localStorage.getItem('hyni_token');
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const isForm = options.body instanceof FormData;
  const headers = { ...(isForm ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok || payload?.success === false) {
    const error = new Error(payload?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

const query = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, value);
  });
  const text = search.toString();
  return text ? `?${text}` : '';
};

const productBody = (data) => {
  if (data instanceof FormData) return data;
  return JSON.stringify(data);
};

export const api = {
  // Health
  health: () => apiRequest('/health'),

  // Authentication
  login: (email, password) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data) => apiRequest('/auth/customer/register', { method: 'POST', body: JSON.stringify(data) }),
  registerWholesale: (data) => apiRequest('/auth/wholesale/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => apiRequest('/auth/me'),
  pendingWholesale: () => apiRequest('/auth/admin/wholesale/pending'),
  approveWholesale: (id) => apiRequest(`/auth/admin/wholesale/${encodeURIComponent(id)}/approve`, { method: 'PATCH' }),

  // Catalogue
  products: (params = '') => apiRequest(`/products?limit=50${params ? `&${params}` : ''}`),
  product: (id) => apiRequest(`/products/${encodeURIComponent(id)}`),
  categories: () => apiRequest('/categories'),
  category: (id) => apiRequest(`/categories/${encodeURIComponent(id)}`),
  adminCategories: (params) => apiRequest(`/categories/admin/all${query(params)}`),
  createCategory: (data) => apiRequest('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) => apiRequest(`/categories/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) => apiRequest(`/categories/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  // Cart
  cart: () => apiRequest('/customer/cart'),
  addCart: (data) => apiRequest('/customer/cart/items', { method: 'POST', body: JSON.stringify(data) }),
  updateCart: (productId, data) => apiRequest(`/customer/cart/items/${encodeURIComponent(productId)}`, { method: 'PATCH', body: JSON.stringify(data) }),
  removeCart: (cartItemId) => apiRequest(`/customer/cart/items/${encodeURIComponent(cartItemId)}`, { method: 'DELETE' }),
  clearCart: () => apiRequest('/customer/cart', { method: 'DELETE' }),

  // Wishlist
  wishlist: () => apiRequest('/customer/wishlist'),
  addWishlist: (productId) => apiRequest('/customer/wishlist/items', { method: 'POST', body: JSON.stringify({ productId }) }),
  removeWishlist: (productId) => apiRequest(`/customer/wishlist/items/${encodeURIComponent(productId)}`, { method: 'DELETE' }),
  clearWishlist: () => apiRequest('/customer/wishlist', { method: 'DELETE' }),

  // Addresses
  addresses: () => apiRequest('/customer/addresses'),
  address: (id) => apiRequest(`/customer/addresses/${encodeURIComponent(id)}`),
  addAddress: (data) => apiRequest('/customer/addresses', { method: 'POST', body: JSON.stringify(data) }),
  updateAddress: (id, data) => apiRequest(`/customer/addresses/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteAddress: (id) => apiRequest(`/customer/addresses/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  setDefaultAddress: (id) => apiRequest(`/customer/addresses/${encodeURIComponent(id)}/default`, { method: 'PATCH' }),

  // Checkout and orders
  checkoutPreview: () => apiRequest('/checkout/preview'),
  createOrder: (addressId) => apiRequest('/checkout/orders', { method: 'POST', body: JSON.stringify({ addressId }) }),
  wholesaleValidation: () => apiRequest('/wholesale/checkout-validation'),
  myOrders: (params) => apiRequest(`/orders/my${query({ limit: 50, ...params })}`),
  order: (id) => apiRequest(`/orders/my/${encodeURIComponent(id)}`),
  adminOrders: (params) => apiRequest(`/orders/admin${query({ limit: 100, ...params })}`),
  adminOrder: (id) => apiRequest(`/orders/admin/${encodeURIComponent(id)}`),
  updateOrderStatus: (id, data) => apiRequest(`/orders/admin/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: JSON.stringify(data) }),
  updateOrderTracking: (id, data) => apiRequest(`/orders/admin/${encodeURIComponent(id)}/tracking`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Payments
  paymentQR: (orderId) => apiRequest(`/payments/orders/${encodeURIComponent(orderId)}/qr`),
  submitPayment: (orderId, file, utrNumber) => {
    const form = new FormData();
    form.append('screenshot', file);
    form.append('utrNumber', utrNumber);
    return apiRequest(`/payments/orders/${encodeURIComponent(orderId)}/submit`, { method: 'POST', body: form });
  },
  pendingPayments: (params) => apiRequest(`/payments/admin/pending${query(params)}`),
  verifyPayment: (orderId) => apiRequest(`/payments/admin/${encodeURIComponent(orderId)}/verify`, { method: 'PATCH' }),
  rejectPayment: (orderId, reason) => apiRequest(`/payments/admin/${encodeURIComponent(orderId)}/reject`, { method: 'PATCH', body: JSON.stringify({ reason }) }),
  manualVerifyPayment: (orderId, verificationNote) => apiRequest(`/payments/admin/${encodeURIComponent(orderId)}/manual-verify`, { method: 'PATCH', body: JSON.stringify({ verificationNote }) }),
  paymentSupport: () => apiRequest('/payments/support-contact'),

  // Profile
  profile: () => apiRequest('/customer/profile'),
  updateProfile: (data) => apiRequest('/customer/profile', { method: 'PATCH', body: JSON.stringify(data) }),

  // Chatbot
  chatbot: (path) => apiRequest(`/chatbot${path}`),

  // Admin dashboard
  dashboard: () => apiRequest('/admin/dashboard/summary'),
  salesTrend: (days = 30) => apiRequest(`/admin/dashboard/sales-trend?days=${Number(days) || 30}`),
  adminCustomers: (params) => apiRequest(`/admin/customers${query(params)}`),

  // Product management
  adminProducts: (params) => apiRequest(`/products/admin/all${query({ limit: 100, ...params })}`),
  createProduct: (data) => apiRequest('/products', { method: 'POST', body: productBody(data) }),
  updateProduct: (id, data) => apiRequest(`/products/${encodeURIComponent(id)}`, { method: 'PUT', body: productBody(data) }),
  deleteProduct: (id) => apiRequest(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  // Inventory
  inventory: (params) => apiRequest(`/inventory${query(params)}`),
  inventorySummary: () => apiRequest('/inventory/summary'),
  lowStock: () => apiRequest('/inventory/low-stock'),
  adjustInventory: (mongoId, change, reason) => apiRequest(`/inventory/${encodeURIComponent(mongoId)}/adjust`, { method: 'POST', body: JSON.stringify({ change, reason }) }),

  // Offline sales
  offlineSales: (params) => apiRequest(`/offline-sales${query({ limit: 100, ...params })}`),
  offlineSale: (saleId) => apiRequest(`/offline-sales/${encodeURIComponent(saleId)}`),
  offlineSalesSummary: () => apiRequest('/offline-sales/summary'),
  createOfflineSale: (data) => apiRequest('/offline-sales', { method: 'POST', body: JSON.stringify(data) }),

  // Employees
  employees: (params) => apiRequest(`/employees/admin${query({ limit: 100, ...params })}`),
  employee: (id) => apiRequest(`/employees/admin/${encodeURIComponent(id)}`),
  createEmployee: (data) => apiRequest('/auth/admin/employees', { method: 'POST', body: JSON.stringify(data) }),
  updateEmployee: (id, data) => apiRequest(`/employees/admin/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(data) }),
  employeePermissions: () => apiRequest('/employees/admin/permissions'),
  myEmployeeProfile: () => apiRequest('/employees/me'),
  updateMyEmployeeProfile: (data) => apiRequest('/employees/me', { method: 'PATCH', body: JSON.stringify(data) }),

  // Attendance
  checkIn: () => apiRequest('/attendance/check-in', { method: 'POST' }),
  checkOut: () => apiRequest('/attendance/check-out', { method: 'POST' }),
  myAttendance: (params) => apiRequest(`/attendance/my-attendance${query(params)}`),
  adminAttendance: (params) => apiRequest(`/attendance/admin${query({ limit: 100, ...params })}`),

  // Newsletter
  subscribeNewsletter: (email) => apiRequest('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email, source: 'footer' }) }),
};
