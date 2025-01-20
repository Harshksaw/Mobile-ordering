'use client'
import React, { lazy, Suspense } from 'react';


const HomePage = lazy(() => import('./Homepage'));
// const OtherPage = lazy(() => import('./OtherPage'));

const App = () => (

    <Suspense fallback={<div>Loading...</div>}>

<HomePage />


    </Suspense>

);

export default App;