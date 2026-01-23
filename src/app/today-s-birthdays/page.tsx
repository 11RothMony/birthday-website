import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import TodaysBirthdaysInteractive from './components/TodaysBirthdaysInteractive';

export const metadata: Metadata = {
  title: "Today's Birthdays - BirthdayDesk",
  description: 'Manage current day celebrations with preparation checklists, countdown timers, and real-time coordination tools for office birthday celebrations.',
};

export default function TodaysBirthdaysPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <TodaysBirthdaysInteractive />
    </>
  );
}