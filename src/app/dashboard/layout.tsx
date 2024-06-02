'use client';
import { DashboardLayout } from '@/widgets/DashboardLayout';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
