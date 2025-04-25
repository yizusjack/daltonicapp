import React, { PropsWithChildren } from 'react'

export default function Can({
    permission,
    children
}: PropsWithChildren<{
    permission: boolean
}>) {
  return (
    <div className="contents">
        {
            permission == true &&
            <div> {children} </div>
        }
    </div>
  )
}
