import Head from 'next/head'
import classes from '../styles/Home.module.css'
import NavBar from "../components/NavBar/NavBar";
import React from 'react';
import Filter from '../components/Filters/Filter';
import Insurances from '../components/Insurances/Insurances';

// Calendar Imports
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function Home() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className={classes.Body}>
      <Head>
        <title>I Center | Chubb</title>
        <meta name="description" content="Get the best insurances for you!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={classes.main}>
        <Filter />
        <Insurances />
      </main>
    </div>
  )
}
