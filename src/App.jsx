import { useMemo, useState } from 'react';

const courses = [
  { id: 1, title: 'React Fundamentals', category: 'Development', progress: 85, status: 'In Progress' },
  { id: 2, title: 'UI/UX Design Basics', category: 'Design', progress: 100, status: 'Completed' },
  { id: 3, title: 'AWS Cloud Essentials', category: 'Cloud', progress: 45, status: 'In Progress' },
  { id: 4, title: 'Docker for Beginners', category: 'DevOps', progress: 0, status: 'Not Started' },
  { id: 5, title: 'JavaScript Mastery', category: 'Development', progress: 70, status: 'In Progress' },
  { id: 6, title: 'Figma Prototyping', category: 'Design', progress: 30, status: 'In Progress' },
  { id: 7, title: 'Azure Deployment Basics', category: 'Cloud', progress: 100, status: 'Completed' },
  { id: 8, title: 'CI/CD Pipelines', category: 'DevOps', progress: 0, status: 'Not Started' },
];

const categories = ['All', 'Development', 'Cloud', 'Design', 'DevOps'];

function NavBar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white">L</div>
          <div>
            <p className="text-lg font-semibold text-slate-800">LearnSphere</p>
            <p className="text-sm text-slate-500">Student Learning Dashboard</p>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#courses" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Courses</a>
          <a href="#stats" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Stats</a>
          <a href="#continue" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Continue</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 p-2 text-slate-600 hover:border-indigo-500 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">JD</div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-xl">
        <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium">Welcome back!</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Keep growing your skills with LearnSphere.</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
          Track your learning journey, explore new courses, and continue where you left off with a calm and simple dashboard.
        </p>
        <button className="mt-6 rounded-full bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50">
          Start Learning
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">This week’s focus</h2>
        <p className="mt-3 text-sm text-slate-600">You have 3 lessons left in your React path and 2 new recommendations ready.</p>
        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-slate-700">React Fundamentals</span>
              <span className="text-slate-500">85%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[85%] rounded-full bg-indigo-600"></div>
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-slate-700">Cloud Essentials</span>
              <span className="text-slate-500">45%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[45%] rounded-full bg-emerald-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { label: 'Courses Completed', value: '12', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Hours Learned', value: '48h', color: 'bg-sky-100 text-sky-700' },
    { label: 'Active Streak', value: '7 Days', color: 'bg-amber-100 text-amber-700' },
    { label: 'Certificates', value: '3', color: 'bg-violet-100 text-violet-700' },
  ];

  return (
    <section id="stats" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${stat.color}`}>{stat.label}</div>
            <p className="mt-4 text-3xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CourseCard({ course }) {
  const statusStyles = {
    Completed: 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-sky-100 text-sky-700',
    'Not Started': 'bg-slate-100 text-slate-600',
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-indigo-600">{course.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-800">{course.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[course.status]}`}>
          {course.status}
        </span>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-sm text-slate-500">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>

      <button className="mt-5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600">
        View Course
      </button>
    </article>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      const searchText = searchTerm.toLowerCase();
      const matchesSearch =
        course.title.toLowerCase().includes(searchText) ||
        course.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const continueLearning = filteredCourses.filter((course) => course.status === 'In Progress');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <NavBar />
      <HeroSection />
      <StatsSection />

      <main id="courses" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Explore Courses</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Find your next lesson</h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search courses"
                  className="w-full bg-transparent outline-none"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <section id="continue" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Continue Learning</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Pick up where you left off</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {continueLearning.map((course) => (
              <div key={course.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">{course.title}</h3>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{course.progress}% done</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">Continue your journey in {course.category.toLowerCase()} with a short lesson today.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold text-slate-800">LearnSphere</p>
            <p className="mt-1 text-sm text-slate-500">Simple learning, steady progress.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <a href="#" className="hover:text-indigo-600">About</a>
            <a href="#" className="hover:text-indigo-600">Support</a>
            <a href="#" className="hover:text-indigo-600">Privacy</a>
          </div>
          <div className="flex gap-3 text-slate-600">
            <a href="#" className="rounded-full border border-slate-200 p-2 hover:border-indigo-500 hover:text-indigo-600">X</a>
            <a href="#" className="rounded-full border border-slate-200 p-2 hover:border-indigo-500 hover:text-indigo-600">in</a>
            <a href="#" className="rounded-full border border-slate-200 p-2 hover:border-indigo-500 hover:text-indigo-600">f</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
