import type { Metadata } from 'next';
import { AdminClient } from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'OceanWay Tours travel desk admin panel.',
};

export default function AdminPage() {
  return <AdminClient />;
}
