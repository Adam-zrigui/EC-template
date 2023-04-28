import Head from 'next/head'
import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
type Props = {
  children: React.ReactNode
}
export default function Layout({children} : Props ) {
  return (
    <div>
      <Head>
      <meta charSet="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>e-commerce</title>
      </Head>
   <header>
    <Nav />
   </header>
   
   <main>
    {children}
   </main>
   <Footer />
    </div>
  )
}
