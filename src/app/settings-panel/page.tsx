import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import SettingsInteractive from './components/SettingsInteractive';

export const metadata: Metadata = {
  title: 'Settings Panel - BirthdayDesk',
  description:
    'Customize your BirthdayDesk experience with notification preferences, display options, data management, and accessibility settings. Manage your celebration tracking preferences and backup your data.',
};

export default function SettingsPanelPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="lg:ml-64 pt-16">
        <SettingsInteractive />
      </main>
    </>
  );
}
