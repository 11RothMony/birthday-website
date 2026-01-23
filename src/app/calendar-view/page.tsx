import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import CalendarInteractive from './components/CalendarInteractive';

export const metadata: Metadata = {
  title: 'Calendar View - BirthdayDesk',
  description: 'Visual monthly, weekly, daily, and yearly calendar views with celebration planning tools, drag-and-drop features, and comprehensive birthday timeline management for workplace celebrations.',
};

export default function CalendarViewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CalendarInteractive />
        </div>
      </main>
    </div>
  );
}