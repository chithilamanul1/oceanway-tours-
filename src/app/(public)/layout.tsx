import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ChatWidget from '@/components/layout/ChatWidget';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-white text-ink">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
