import { JobsView } from '@/widgets/JobsView';
import { MainView } from '@/widgets/MainView';
import { NewsView } from '@/widgets/NewsView';

export default function Home() {
    return (
        <>
            <MainView />
            <NewsView />
            <JobsView />
        </>
    );
}
