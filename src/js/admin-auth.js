/**
 * Check if the user is authenticated for admin access
 * @returns {Boolean} Whether the user is authenticated
 */
export function checkAdminAuth() {
  return sessionStorage.getItem('shadowcorp_auth') === 'true';
}

/**
 * Redirect to login page if not authenticated
 */
export function requireAdminAuth() {
  if (!checkAdminAuth()) {
    window.location.href = '../admin-login.html';
  }
}

/**
 * Log out the admin user
 */
export function logoutAdmin() {
  sessionStorage.removeItem('shadowcorp_auth');
  window.location.href = '../admin-login.html';
}