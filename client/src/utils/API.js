// getMe function
// GET request to '/me' 
// part of Auth
export const getMe = (token) => {
  return fetch('api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

// createUser function
// sends POST with the user data entered into the Modal
export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
};
  
// loginUser function
// POST reqest to /login
// Data is username/password
export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
};

// createEvent function, 
// POST request to /events
export const createEvent = (eventData, token) => {
  return fetch('/api/users/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
};

// deleteEvent function
// DELETE request to /events:eventID
// params: event._id
export const deleteEvent = (eventId, token) => {
  return fetch(`/api/users/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// editEvent function
// PUT request to /events:event._id
// eventData contains changed data
export const editEvent = (eventData, token) => {
  return fetch(`/api/users/events/${eventData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
};

// editBudget function
// PUT request to /budget
export const editBudget = (budgetData, token) => {
  return fetch(`/api/users/budget`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budgetData),
  });
};