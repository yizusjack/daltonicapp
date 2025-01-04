import React, { PropsWithChildren } from 'react'

export default function Can({
    permission,
    children
}: PropsWithChildren<{
    permission: boolean
}>) {
  return (
    <div>
        {
            permission == true &&
            <div> {children} </div>
        }
    </div>
  )
}
