import React, { PropsWithChildren } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function AppCard({
    title,
    description,
    children,
    footer
}: PropsWithChildren<{
    title?: string,
    description?: string,
    footer?: string
}>) {
  return (
    <div className='p-6'>
			<Card className='w-full bg-slate-50'>
				<CardHeader>
					<CardTitle className='text-lg'>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>
					{children}
				</CardContent>
				<CardFooter className='flex justify-end'>
					<p className='text-xs'>{footer}</p>
				</CardFooter>
			</Card>
		</div>
  )
}
