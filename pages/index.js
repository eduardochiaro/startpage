import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HeaderComponent from '../components/front/header'
import CenterComponent from '../components/front/center'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Start App</title>
        <meta name="description" content="Start app page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent/>
      <CenterComponent/>
    </div>
  )
}
