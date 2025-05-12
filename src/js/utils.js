// Utility functions for the Shadow Corporation website

/**
 * Initialize local storage with default data if not present
 */
export function initializeStorage() {
  if (!localStorage.getItem('shadowcorp_announcements')) {
    localStorage.setItem('shadowcorp_announcements', JSON.stringify([
      {
        id: 1,
        title: 'Shadow Corporation Launch',
        content: 'Welcome to the official launch of Shadow Corporation. Join our ranks and help us shape the future.',
        date: new Date().toISOString()
      }
    ]));
  }

  if (!localStorage.getItem('shadowcorp_status')) {
    localStorage.setItem('shadowcorp_status', JSON.stringify({
      message: 'All systems operational',
      level: 'normal',
      timestamp: new Date().toISOString()
    }));
  }

  if (!localStorage.getItem('shadowcorp_contacts')) {
    localStorage.setItem('shadowcorp_contacts', JSON.stringify([]));
  }
}

/**
 * Get all announcements
 * @returns {Array} Array of announcement objects
 */
export function getAnnouncements() {
  const announcements = localStorage.getItem('shadowcorp_announcements');
  return announcements ? JSON.parse(announcements) : [];
}

/**
 * Add a new announcement
 * @param {Object} announcement - The announcement object to add
 */
export function addAnnouncement(announcement) {
  const announcements = getAnnouncements();
  const newAnnouncement = {
    id: Date.now(),
    ...announcement,
    date: new Date().toISOString()
  };
  announcements.unshift(newAnnouncement);
  localStorage.setItem('shadowcorp_announcements', JSON.stringify(announcements));
  return newAnnouncement;
}

/**
 * Delete an announcement
 * @param {number} id - The ID of the announcement to delete
 */
export function deleteAnnouncement(id) {
  const announcements = getAnnouncements();
  const filteredAnnouncements = announcements.filter(a => a.id !== id);
  localStorage.setItem('shadowcorp_announcements', JSON.stringify(filteredAnnouncements));
}

/**
 * Get organization status
 * @returns {Object} Status object
 */
export function getStatus() {
  const status = localStorage.getItem('shadowcorp_status');
  return status ? JSON.parse(status) : { message: 'Status unavailable', level: 'normal', timestamp: new Date().toISOString() };
}

/**
 * Update organization status
 * @param {Object} status - The status object to update
 */
export function updateStatus(status) {
  const newStatus = {
    ...status,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('shadowcorp_status', JSON.stringify(newStatus));
  return newStatus;
}

/**
 * Get contact submissions
 * @returns {Array} Array of contact submission objects
 */
export function getContacts() {
  const contacts = localStorage.getItem('shadowcorp_contacts');
  return contacts ? JSON.parse(contacts) : [];
}

/**
 * Add a new contact submission
 * @param {Object} contact - The contact submission object to add
 */
export function addContact(contact) {
  const contacts = getContacts();
  const newContact = {
    id: Date.now(),
    ...contact,
    date: new Date().toISOString(),
    status: 'unread'
  };
  contacts.unshift(newContact);
  localStorage.setItem('shadowcorp_contacts', JSON.stringify(contacts));
  return newContact;
}

/**
 * Format date to readable string
 * @param {String} dateString - ISO date string
 * @returns {String} Formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Authentication check
 * @param {String} password - Password to check
 * @returns {Boolean} Whether the password is correct
 */
export function authenticate(password) {
  // Simple client-side authentication
  return password === 'admin';
}