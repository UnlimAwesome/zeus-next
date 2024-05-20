import { ContactsView } from '@/widgets/ContactsView';
import { Header } from '@/widgets/Header';
import { JobsView } from '@/widgets/JobsView';
import { MainView } from '@/widgets/MainView';
import { NewsView } from '@/widgets/NewsView';
import { ReviewsView } from '@/widgets/ReviewsView';

export const dynamic = 'force-dynamic';

const circleSize = 35;

export default function Home() {
    return (
        <>
            <Header className='fixed z-50 h-[var(--header-height)] bg-[hsl(var(--dark))] filter-none' />
            <main
                className='min-h-full w-full pt-[var(--header-height)] dark:brightness-50'
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(255, 255, 255, 0.4) 20%, transparent 35%),' +
                        'radial-gradient(circle, rgba(255, 255, 255, 0.4) 20%, transparent 35%),' +
                        'radial-gradient(circle, rgba(255, 255, 255, 0.4) 20%, transparent 35%),' +
                        'radial-gradient(circle, rgba(255, 255, 255, 0.4) 20%, transparent 35%),' +
                        'linear-gradient(to bottom, #64848c 0%, #cdd5d7 25%, #b2c0cd 75%, #64848c 100%)',
                    backgroundSize:
                        `${circleSize}px ${circleSize}px,` +
                        `${circleSize}px ${circleSize}px,` +
                        `${circleSize}px ${circleSize}px,` +
                        `${circleSize}px ${circleSize}px,` +
                        '100% 100%',
                    backgroundPosition:
                        `${(circleSize / 2) * 1.5}px ${circleSize / 2}px,` +
                        `${(circleSize / 2) * -1.5}px ${circleSize / 2}px,` +
                        `${circleSize}px ${circleSize}px,` +
                        `${1.5 * circleSize}px ${circleSize}px,` +
                        '0 0',
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'scroll',
                }}
            >
                <>
                    <MainView />
                    <NewsView />
                    <JobsView />
                    <ReviewsView />
                    <ContactsView />
                </>
            </main>
            <footer className='flex h-[var(--header-height)] w-full items-center justify-center bg-[hsl(var(--dark))]'>
                <p className='text-center text-base text-white'>
                    © Copyright 2024 ТОПРУС. Все права защищены.
                </p>
            </footer>
        </>
    );
}
