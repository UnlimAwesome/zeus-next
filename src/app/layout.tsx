import { RootLayout as Root } from '@/widgets/RootLayout';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Root>{children}</Root>;
}
