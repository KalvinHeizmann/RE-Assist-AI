
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './services/Sidebar';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import Tasks from './services/context/Tasks';
import Calendar from './pages/Calendar';
import Email from './pages/Email';
import Integrations from './pages/Integrations';
import AIAssistant from './pages/AIAssistant';

const AppLayout: React.FC = () => (
  <div className="flex h-screen bg-brand-dark font-sans text-brand-light-gray">
    <Sidebar />
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 md:p-8 h-full">
        <Outlet />
      </div>
    </main>
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistant" element={<AIAssistant />} />
        <Route path="/email" element={<Email />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/integrations" element={<Integrations />} />
      </Route>
    </Routes>
  );
};

export default App;