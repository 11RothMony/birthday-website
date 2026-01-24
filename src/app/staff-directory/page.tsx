import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import StaffDirectoryInteractive from './components/StaffDirectoryInteractive';

export const metadata: Metadata = {
  title: 'Staff Directory - BirthdayDesk',
  description:
    "Manage staff birthdays, celebration preferences, and contact information. Search, filter, and organize your team's birthday database with quick-edit capabilities.",
};

export default function StaffDirectoryPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="lg:ml-64 pt-16">
        <StaffDirectoryInteractive />
      </main>
    </>
  );
}
