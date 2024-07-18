"use client"
import React from 'react'
import KeysProvider from './KeysContext'
import StateProvider from './StateContext'

const ContextProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <StateProvider>
        <KeysProvider>
            {children}
        </KeysProvider>
    </StateProvider>
  )
}

export default ContextProvider