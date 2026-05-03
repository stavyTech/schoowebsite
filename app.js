// Application State Management
const AppState = {
  currentUser: null,
  students: [],
  parents: [],
  teachers: [],
  grades: [],
  attendance: [],
  fees: [],
  announcements: [],

  init() {
    this.loadFromLocalStorage();
    if (!this.students.length) {
      this.initializeMockData();
    }
  },

  initializeMockData() {
    // Mock Students
    this.students = [
       { id: 1, name: 'patience orji', email: 'patienceorji613@.com', class: 'Grade 10', dob: '2010-01-15', status: 'active', enrollmentDate: '2024-09-01' },
      { id: 2, name: 'John Doe', email: 'john@example.com', class: 'Grade 10', dob: '2010-01-15', status: 'active', enrollmentDate: '2024-09-01' },
      { id: 3, name: 'Jane Smith', email: 'jane@example.com', class: 'Grade 9', dob: '2011-05-20', status: 'active', enrollmentDate: '2024-09-01' },
      { id: 4, name: 'Mike Johnson', email: 'mike@example.com', class: 'Grade 10', dob: '2009-12-10', status: 'active', enrollmentDate: '2024-09-01' },
    ];

    // Mock Parents
    this.parents = [
      { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1234567890', studentIds: [1] },
      { id: 2, name: 'Emily Smith', email: 'emily@example.com', phone: '+0987654321', studentIds: [2] },
    ];

    // Mock Teachers
    this.teachers = [
      { id: 1, name: 'Mr. Anderson', email: 'anderson@example.com', subject: 'Mathematics', classes: ['Grade 10', 'Grade 9'] },
      { id: 2, name: 'Ms. Brown', email: 'brown@example.com', subject: 'English', classes: ['Grade 10'] },
    ];

    // Mock Grades
    this.grades = [
      { id: 1, studentId: 1, subject: 'Mathematics', score: 92, term: 'Term 1', grade: 'A' },
      { id: 2, studentId: 1, subject: 'English', score: 88, term: 'Term 1', grade: 'B+' },
      { id: 3, studentId: 1, subject: 'Science', score: 95, term: 'Term 1', grade: 'A' },
      { id: 4, studentId: 2, subject: 'Mathematics', score: 85, term: 'Term 1', grade: 'B' },
    ];

    // Mock Attendance
    this.attendance = [
      { id: 1, studentId: 1, date: '2026-04-20', status: 'present' },
      { id: 2, studentId: 1, date: '2026-04-19', status: 'present' },
      { id: 3, studentId: 1, date: '2026-04-18', status: 'absent' },
    ];

    // Mock Fees
    this.fees = [
      { id: 1, studentId: 1, type: 'Tuition', amount: 500, status: 'pending', dueDate: '2026-05-01' },
      { id: 2, studentId: 1, type: 'Activity', amount: 100, status: 'paid', paidDate: '2026-04-15' },
      { id: 3, studentId: 2, type: 'Tuition', amount: 500, status: 'paid', paidDate: '2026-04-10' },
    ];

    // Mock Announcements
    this.announcements = [
      { id: 1, title: 'School Holiday', content: 'School will be closed on April 25-26', date: '2026-04-20' },
      { id: 2, title: 'Sports Day', content: 'Annual sports day on May 1st', date: '2026-04-19' },
      { id: 3, title: 'Parent-Teacher Meeting', content: 'Scheduled for May 5th', date: '2026-04-18' },
    ];

    this.saveToLocalStorage();
  },

  saveToLocalStorage() {
    localStorage.setItem('appState', JSON.stringify({
      students: this.students,
      parents: this.parents,
      teachers: this.teachers,
      grades: this.grades,
      attendance: this.attendance,
      fees: this.fees,
      announcements: this.announcements,
    }));
  },

  loadFromLocalStorage() {
    const saved = localStorage.getItem('appState');
    if (saved) {
      const data = JSON.parse(saved);
      this.students = data.students || [];
      this.parents = data.parents || [];
      this.teachers = data.teachers || [];
      this.grades = data.grades || [];
      this.attendance = data.attendance || [];
      this.fees = data.fees || [];
      this.announcements = data.announcements || [];
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = user;
    } else {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
    }
  },

  logout() {
    this.setCurrentUser(null);
  },
};

// Authentication Functions
function login(email, password, role) {
  // Mock authentication
  if (email && password && role) {
    const user = {
      id: Math.random(),
      email: email,
      role: role,
      name: email.split('@')[0],
      loginTime: new Date().toISOString(),
    };
    AppState.setCurrentUser(user);
    return user;
  }
  return null;
}

function logout() {
  AppState.logout();
  window.location.href = 'index.html';
}

function isLoggedIn() {
  return AppState.getCurrentUser() !== null;
}

function getCurrentUser() {
  return AppState.getCurrentUser();
}

// Utility Functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function getStudentById(id) {
  return AppState.students.find(s => s.id == id);
}

function getStudentGrades(studentId) {
  return AppState.grades.filter(g => g.studentId == studentId);
}

function getStudentAttendance(studentId) {
  return AppState.attendance.filter(a => a.studentId == studentId);
}

function getStudentFees(studentId) {
  return AppState.fees.filter(f => f.studentId == studentId);
}

function getParentById(id) {
  return AppState.parents.find(p => p.id == id);
}

function getTeacherById(id) {
  return AppState.teachers.find(t => t.id == id);
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
  AppState.init();
  
  // Check if user is logged in and on a protected page
  const protectedPages = ['student-dashboard.html', 'parent-dashboard.html', 'teacher-dashboard.html', 'admin-dashboard.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (protectedPages.includes(currentPage) && !isLoggedIn()) {
    window.location.href = 'login.html';
  }
});

// Tab switching functionality
function switchTab(tabName) {
  // Hide all tab contents
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));
  
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab content
  const selectedContent = document.getElementById(tabName);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }
  
  // Add active class to clicked button
  event.target.classList.add('active');
}

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Export functions for use in HTML
window.AppState = AppState;
window.login = login;
window.logout = logout;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.switchTab = switchTab;
window.validateForm = validateForm;
window.formatDate = formatDate;
window.getStudentById = getStudentById;
window.getStudentGrades = getStudentGrades;
window.getStudentAttendance = getStudentAttendance;
window.getStudentFees = getStudentFees;
window.getParentById = getParentById;
window.getTeacherById = getTeacherById;
