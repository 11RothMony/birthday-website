import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Dashboard Hub - BirthdayDesk',
  description:
    "Central command center for managing staff birthdays, celebrations, and cake coordination. View today's birthdays, upcoming celebrations, and quick action items in one organized dashboard.",
};

export default function DashboardHubPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <DashboardInteractive />
    </>
  );
}
