import { JobsView } from '@/widgets/JobsView';
import { MainView } from '@/widgets/MainView';
import { NewsView } from '@/widgets/NewsView';
import { ReviewsView } from '@/widgets/ReviewsView';

export default function Home() {
    return (
        <>
            <MainView />
            <NewsView />
            <JobsView />
            <ReviewsView />
        </>
    );
}
