'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from './ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import { GithubSignInButton } from './authButtons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const FormSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
        });

const SignInForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            setIsLoading(true);
            const signInData = await signIn("credentials", {
                username: values.username,
                password: values.password,
                redirect: false
            });
            console.log(signInData!.url)
            if (signInData?.error) {
				toast(signInData.error)
                console.log(signInData.error)
                setIsLoading(false)
            }
        } catch (error) {
			toast(JSON.stringify(error))
			console.log(error)
            setIsLoading(false)
        }
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input placeholder='Username' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input
                            type='password'
                            placeholder='Password'
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            {isLoading ?
				<Button disabled variant="default" className='disabled mt-4 w-full' type='submit'>
					<Loader className="h-4 w-4 mr-2 animate-spin" />
					Sign In
				</Button>
			:
				<Button variant="default" className="mt-4 w-full" type='submit'>
					Sign In
				</Button>
            }
        </form>
        {/* <GithubSignInButton /> */}
        {/* <p className='text-sm text-foreground/50 mt-2'>
            If you don&apos;t have an account, please&nbsp;
            <Link className='text-blue-500 hover:underline' href='/sign-up'>
                Sign Up
            </Link>
        </p> */}
        </Form>
    );
};

export default SignInForm;