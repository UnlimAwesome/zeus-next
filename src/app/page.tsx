import { ServiceSlider } from '@/entities/Service';

export default function Home() {
    return (
        <div className='flex h-[calc(100svh-var(--header-height))] w-full items-center justify-evenly gap-10 p-20'>
            <div className='flex size-full flex-col gap-10'>
                <div className='basis-2/5 bg-[hsla(var(--brown),.8)]'>LOGO</div>
                <div className='flex basis-3/5 items-center justify-center rounded-2xl bg-[hsla(var(--brown),.8)] text-center text-2xl font-medium text-white'>
                    <p>Краткая информация о компании: цель, деятельность</p>
                </div>
            </div>
            <ServiceSlider
                className='shrink-0 basis-2/3'
                width='w-5/7'
                height='h-full'
            />
        </div>
    );
}
