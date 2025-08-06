const courses = [
  { id: 1, title: "HTML Basics", image: "html.png", video: "https://www.youtube.com/embed/ok-plXXHlWw" },
  { id: 2, title: "CSS for Beginners", image: "css.png", video: "https://www.youtube.com/embed/1Rs2ND1ryYc" },
  { id: 3, title: "JavaScript Essentials", image: "js.png", video: "https://www.youtube.com/embed/W6NZfCO5SIk" },
  { id: 4, title: "React Basics", image: "react.png", video: "https://www.youtube.com/embed/bMknfKXIFA8" },
  { id: 5, title: "Node.js Introduction", image: "node.png", video: "https://www.youtube.com/embed/TlB_eWDSMt4" },
  { id: 6, title: "Python for Beginners", image: "python.png", video: "https://www.youtube.com/embed/_uQrJ0TkZlc" },
  { id: 7, title: "Introduction to Data Science", image: "data.png", video: "https://www.youtube.com/embed/X3paOmcrTjQ" },
  { id: 8, title: "Machine Learning with Python", image: "mach.png", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
  { id: 9, title: "Deep Learning Basics", image: "dl.png", video: "https://www.youtube.com/embed/aircAruvnKk" },
  { id: 10, title: "AI for Everyone", image: "ai.png", video: "https://www.youtube.com/embed/2ePf9rue1Ao" }
];

function loadCourses() {
  const list = document.getElementById('course-list');
  list.innerHTML = '';
  courses.forEach(course => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<img src="${course.image}" /><h3>${course.title}</h3><button onclick="enroll(${course.id})">Enroll</button>`;
    list.appendChild(div);
  });
}

function enroll(id) {
  let enrolled = JSON.parse(localStorage.getItem('enrolled')) || [];
  if (!enrolled.includes(id)) {
    enrolled.push(id);
    localStorage.setItem('enrolled', JSON.stringify(enrolled));
    alert('Enrolled!');
  }
}

function loadEnrolledCourses() {
  const enrolled = JSON.parse(localStorage.getItem('enrolled')) || [];
  const list = document.getElementById('enrolled-list');
  list.innerHTML = '';
  courses.forEach(course => {
    if (enrolled.includes(course.id)) {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<img src="${course.image}" /><h3>${course.title}</h3>
        <button onclick="startCourse(${course.id})">Start</button>
        <button onclick="unenroll(${course.id})">Unenroll</button>`;
      list.appendChild(div);
    }
  });
}

function startCourse(id) {
  localStorage.setItem('currentCourse', id);
  window.location.href = 'course.html';
}

function unenroll(id) {
  let enrolled = JSON.parse(localStorage.getItem('enrolled')) || [];
  enrolled = enrolled.filter(cid => cid !== id);
  localStorage.setItem('enrolled', JSON.stringify(enrolled));
  loadEnrolledCourses();
}

function loadCourseContent() {
  const id = localStorage.getItem('currentCourse');
  const course = courses.find(c => c.id == id);
  const section = document.getElementById('video-section');
  if (!course) { section.innerHTML = '<p>Course not found.</p>'; return; }
  section.innerHTML = `<h2>${course.title}</h2>
    <iframe width="560" height="315" src="${course.video}" frameborder="0" allowfullscreen></iframe>`;
}

function registerUser() {
  const user = document.getElementById('signup-username').value;
  const pass = document.getElementById('signup-password').value;
  localStorage.setItem('user', JSON.stringify({ user, pass }));
  alert('Registered!');
  return false;
}

function loginUser() {
  const user = document.getElementById('login-username').value;
  const pass = document.getElementById('login-password').value;
  const stored = JSON.parse(localStorage.getItem('user'));
  if (stored && stored.user === user && stored.pass === pass) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials');
  }
  return false;
}

function loadDashboard() {
  const content = document.getElementById('dashboard-content');
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    content.innerHTML = `<h2>Welcome, ${user.user}</h2><p>Start learning by enrolling in a course.</p>`;
  }
}

function logout() {
  localStorage.removeItem('loggedIn');
  alert('Logged out!');
  window.location.href = 'login.html';
}




script.js