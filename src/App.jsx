import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const courses = [
  { id: 1, title: 'React Fundamentals', category: 'Development', progress: 85, status: 'In Progress', lessons: 18, duration: '6h 40m', description: 'Build a practical foundation in components, state, effects, and modern React patterns.' },
  { id: 2, title: 'UI/UX Design Basics', category: 'Design', progress: 100, status: 'Completed', lessons: 12, duration: '4h 15m', description: 'Learn user-centred design, clear visual hierarchy, and usable interface patterns.' },
  { id: 3, title: 'AWS Cloud Essentials', category: 'Cloud', progress: 45, status: 'In Progress', lessons: 16, duration: '5h 30m', description: 'Understand the core AWS services and how to select them for common workloads.' },
  { id: 4, title: 'Docker for Beginners', category: 'DevOps', progress: 0, status: 'Not Started', lessons: 10, duration: '3h 45m', description: 'Package, run, and share applications consistently with Docker containers.' },
  { id: 5, title: 'JavaScript Mastery', category: 'Development', progress: 70, status: 'In Progress', lessons: 24, duration: '8h 20m', description: 'Strengthen your JavaScript skills with asynchronous workflows and modern language features.' },
  { id: 6, title: 'Figma Prototyping', category: 'Design', progress: 30, status: 'In Progress', lessons: 14, duration: '4h 50m', description: 'Create interactive prototypes that communicate product behaviour and user flows.' },
  { id: 7, title: 'Azure Deployment Basics', category: 'Cloud', progress: 100, status: 'Completed', lessons: 11, duration: '4h 10m', description: 'Deploy a small cloud application and learn the building blocks of Azure releases.' },
  { id: 8, title: 'CI/CD Pipelines', category: 'DevOps', progress: 0, status: 'Not Started', lessons: 13, duration: '5h 05m', description: 'Automate testing and delivery with a reliable continuous integration workflow.' },
];

const categories = ['All', 'Development', 'Cloud', 'Design', 'DevOps'];
const buttonBase = 'inline-flex items-center justify-center rounded-full font-semibold transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';
const iconButton = `${buttonBase} h-10 w-10 border border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600`;

function SearchIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>; }
function BellIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2c0 .53-.21 1.04-.59 1.41L4 17h5m6 0v1a3 3 0 0 1-6 0v-1m6 0H9" /></svg>; }
function CloseIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 6 12 12M18 6 6 18" /></svg>; }

function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'React lesson is ready', detail: 'Continue with Effects and data fetching.', time: '5 minutes ago', unread: true },
    { id: 2, title: 'Weekly goal almost complete', detail: 'You are one lesson away from your goal.', time: '20 minutes ago', unread: true },
    { id: 3, title: 'New recommendation', detail: 'Try Docker for Beginners next.', time: '1 hour ago', unread: false },
    { id: 4, title: 'Course completed', detail: 'You completed UI/UX Design Basics.', time: 'Yesterday', unread: false },
    { id: 5, title: 'Learning reminder', detail: 'Your Tailwind CSS lesson is waiting.', time: '2 days ago', unread: false },
  ]);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!panelRef.current?.contains(event.target) && !triggerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => { if (event.key === 'Escape') { setIsOpen(false); triggerRef.current?.focus(); } };
    if (isOpen) { document.addEventListener('mousedown', closeOnOutsideClick); document.addEventListener('keydown', closeOnEscape); }
    return () => { document.removeEventListener('mousedown', closeOnOutsideClick); document.removeEventListener('keydown', closeOnEscape); };
  }, [isOpen]);

  function toggleNotifications() {
    setIsOpen((open) => !open);
  }

  function markAllAsRead() {
    setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
  }

  return (
    <div className="relative">
      <button ref={triggerRef} type="button" onClick={toggleNotifications} aria-expanded={isOpen} aria-controls="notification-panel" className={`${iconButton} relative`}>
        <BellIcon />
        <span className="sr-only">{isOpen ? 'Close' : 'Open'} notifications{unreadCount ? `, ${unreadCount} unread` : ''}</span>
        {unreadCount > 0 && <span aria-hidden="true" className="absolute right-0 top-0 flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">{unreadCount}</span>}
      </button>

      {isOpen && <section ref={panelRef} id="notification-panel" aria-label="Notifications" className="absolute right-0 top-full z-30 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 className="font-semibold text-slate-800">Notifications</h2>
          <button type="button" onClick={markAllAsRead} className="rounded-md text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2">Mark all read</button>
        </div>
        <ul className="max-h-80 divide-y divide-slate-100 overflow-x-hidden overflow-y-auto">
          {notifications.map((notification) => <li key={notification.id}><button type="button" className={`w-full px-4 py-3 text-left transition hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 ${notification.unread ? 'bg-indigo-50/60' : 'bg-white'}`}><div className="flex items-start gap-2"><span aria-hidden="true" className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.unread ? 'bg-indigo-600' : 'bg-transparent'}`} /><div className="min-w-0"><p className="text-sm font-semibold text-slate-800">{notification.title}</p><p className="mt-1 text-sm leading-5 text-slate-600">{notification.detail}</p><p className="mt-1 text-xs text-slate-500">{notification.time}</p></div></div></button></li>)}
        </ul>
      </section>}
    </div>
  );
}

function NavBar() {
  return <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur" aria-label="Primary navigation"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"><a href="#top" className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white">L</span><span className="min-w-0"><span className="block truncate text-lg font-semibold text-slate-800">LearnSphere</span><span className="hidden text-sm text-slate-500 sm:block">Student Learning Dashboard</span></span></a><div className="hidden items-center gap-6 md:flex"><a href="#courses" className="nav-link">Courses</a><a href="#stats" className="nav-link">Stats</a><a href="#continue" className="nav-link">Continue</a></div><div className="flex shrink-0 items-center gap-2"><button type="button" className={iconButton}><SearchIcon /><span className="sr-only">Search courses</span></button><NotificationCenter /><div aria-label="Signed in as Jordan Doe" className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">JD</div></div></div></nav>;
}

function ProgressBar({ value, color = 'bg-indigo-600' }) { return <div className="h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={value}><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>; }

function CourseArtwork({ category }) { const colors = { Development: 'from-indigo-500 to-violet-600', Design: 'from-fuchsia-500 to-rose-500', Cloud: 'from-sky-500 to-cyan-500', DevOps: 'from-emerald-500 to-teal-500' }; return <div role="img" aria-label={`${category} course artwork`} className={`flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br ${colors[category] || 'from-slate-500 to-slate-700'} text-6xl shadow-inner`}>{category === 'Development' ? '⚛' : category === 'Design' ? '✦' : category === 'Cloud' ? '☁' : '⌘'}</div>; }

function CourseDetailsModal({ course, onClose }) {
  const closeButtonRef = useRef(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = [...document.querySelectorAll('[role="dialog"] button, [role="dialog"] a, [role="dialog"] input, [role="dialog"] select, [role="dialog"] textarea, [role="dialog"] [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [onClose]);
  if (!course) return null;
  return createPortal(<div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-4 sm:items-center" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="course-modal-title" className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"><div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6"><p className="text-sm font-semibold text-indigo-600">{course.category}</p><button ref={closeButtonRef} type="button" onClick={onClose} className={iconButton}><CloseIcon /><span className="sr-only">Close course details</span></button></div><div className="p-5 sm:p-6"><h2 id="course-modal-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">{course.title}</h2><div className="mt-5"><CourseArtwork category={course.category} /></div><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">Category: {course.category}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">Status: {course.status}</span></div><p className="mt-4 leading-7 text-slate-600">{course.description}</p><dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-4"><dt className="text-sm text-slate-500">Progress</dt><dd className="mt-1 text-xl font-bold text-slate-800">{course.progress}%</dd></div><div className="rounded-2xl bg-slate-50 p-4"><dt className="text-sm text-slate-500">Lessons</dt><dd className="mt-1 text-xl font-bold text-slate-800">{course.lessons}</dd></div><div className="col-span-2 rounded-2xl bg-slate-50 p-4 sm:col-span-1"><dt className="text-sm text-slate-500">Duration</dt><dd className="mt-1 text-xl font-bold text-slate-800">{course.duration}</dd></div></dl><div className="mt-6"><div className="mb-2 flex justify-between text-sm font-medium text-slate-600"><span>Course progress</span><span>{course.progress}%</span></div><ProgressBar value={course.progress} /></div><button type="button" onClick={onClose} className={`${buttonBase} mt-8 w-full bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 sm:w-auto`}>{course.progress ? 'Continue learning' : 'Start course'}</button></div></section></div>, document.body);
}

function HeroSection() { return <section id="top" className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16"><div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-xl"><p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium">Welcome back!</p><h1 className="text-3xl font-bold sm:text-4xl">Keep growing your skills with LearnSphere.</h1><p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">Track your learning journey, explore new courses, and continue where you left off with a calm and simple dashboard.</p><a href="#courses" className={`${buttonBase} mt-6 bg-white px-5 py-3 text-indigo-700 hover:bg-indigo-50`}>Start Learning</a></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold text-slate-800">This week’s focus</h2><p className="mt-3 text-sm text-slate-600">You have 3 lessons left in your React path and 2 new recommendations ready.</p><div className="mt-6 space-y-4"><div><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">React Fundamentals</span><span className="text-slate-500">85%</span></div><ProgressBar value={85} /></div><div><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">Cloud Essentials</span><span className="text-slate-500">45%</span></div><ProgressBar value={45} color="bg-emerald-500" /></div></div></div></section>; }

function StatsSection() { const stats = [{ label: 'Courses Completed', value: '12', color: 'bg-emerald-100 text-emerald-700' }, { label: 'Hours Learned', value: '48h', color: 'bg-sky-100 text-sky-700' }, { label: 'Active Streak', value: '7 Days', color: 'bg-amber-100 text-amber-700' }, { label: 'Certificates', value: '3', color: 'bg-violet-100 text-violet-700' }]; return <section id="stats" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${stat.color}`}>{stat.label}</div><p className="mt-4 text-3xl font-bold text-slate-800">{stat.value}</p></div>)}</div></section>; }

function CourseCard({ course, onOpen }) { const statusStyles = { Completed: 'bg-emerald-100 text-emerald-700', 'In Progress': 'bg-sky-100 text-sky-700', 'Not Started': 'bg-slate-100 text-slate-600' }; return <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="text-sm font-semibold text-indigo-600">{course.category}</p><h3 className="mt-1 break-words text-lg font-semibold text-slate-800">{course.title}</h3></div><span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[course.status]}`}>{course.status}</span></div><div className="mt-4"><div className="mb-2 flex justify-between text-sm text-slate-500"><span>Progress</span><span>{course.progress}%</span></div><ProgressBar value={course.progress} /></div><div className="mt-5 flex flex-wrap gap-3"><a href="#continue" className={`${buttonBase} bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700`}>{course.progress ? 'Continue learning' : 'Start course'}</a><button type="button" onClick={() => onOpen(course)} className={`${buttonBase} border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-indigo-500 hover:text-indigo-600`}>View details<span className="sr-only">: {course.title}</span></button></div></article>; }

function App() { const [activeCategory, setActiveCategory] = useState('All'); const [searchTerm, setSearchTerm] = useState(''); const [selectedCourse, setSelectedCourse] = useState(null); const filteredCourses = useMemo(() => courses.filter((course) => (activeCategory === 'All' || course.category === activeCategory) && (course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.category.toLowerCase().includes(searchTerm.toLowerCase()))), [activeCategory, searchTerm]); const continueLearning = filteredCourses.filter((course) => course.status === 'In Progress'); return <div className="h-dvh overflow-x-hidden overflow-y-scroll bg-slate-50 text-slate-800"><NavBar /><HeroSection /><StatsSection /><main id="courses" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"><section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Explore Courses</p><h2 className="mt-2 text-2xl font-bold text-slate-800">Find your next lesson</h2></div><label className="flex w-full items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-500 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-600/20 lg:max-w-xs"><SearchIcon /><span className="sr-only">Search courses</span><input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search courses" className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none" /></label></div><div className="mt-6 flex flex-wrap gap-3">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`${buttonBase} px-4 py-2 text-sm ${activeCategory === category ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{category}</button>)}</div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} onOpen={setSelectedCourse} />)}</div>{filteredCourses.length === 0 && <p className="mt-8 rounded-2xl bg-slate-50 p-6 text-center text-slate-600" role="status">No courses match your search.</p>}</section><section id="continue" className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Continue Learning</p><h2 className="mt-2 text-2xl font-bold text-slate-800">Pick up where you left off</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{continueLearning.map((course) => <div key={course.id} className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="break-words text-lg font-semibold text-slate-800">{course.title}</h3><span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{course.progress}% done</span></div><p className="mt-3 text-sm text-slate-600">Continue your journey in {course.category.toLowerCase()} with a short lesson today.</p></div>)}</div></section></main><footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><p className="text-lg font-semibold text-slate-800">LearnSphere</p><p className="mt-1 text-sm text-slate-500">Simple learning, steady progress.</p></div><div className="flex flex-wrap gap-4 text-sm text-slate-600"><a href="#top" className="nav-link">About</a><a href="#top" className="nav-link">Support</a><a href="#top" className="nav-link">Privacy</a></div></div></footer><CourseDetailsModal course={selectedCourse} onClose={() => setSelectedCourse(null)} /></div>; }

export default App;
