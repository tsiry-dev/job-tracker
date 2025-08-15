import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center bg-background h-[100vh]">
            <div className='flex justify-center'>
                <div>
                    <img
                    className='w-full'
                    src="https://i.pinimg.com/1200x/8e/90/80/8e9080b568929a595e9396ba8b23b04a.jpg" alt="image" />
                </div>
            </div>

            <div className="w-ful flex justify-center bg-primary h-auto md:h-[100vh]">
                <div className="flex flex-col gap-8 max-w-sm mt-30">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only text-white">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium text-white">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground text-white">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
