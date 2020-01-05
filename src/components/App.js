import React, { useContext, Suspense } from 'react'
import { GlobalStyle } from './styles/GlobalStyles'
import { Logo } from './Logo'
import { Home } from '../pages/Home'
import { Detail } from '../pages/Detail'
import { User } from '../pages/User'
import { NoRegisteredUser } from '../pages/NoRegisteredUser'
import { Router, Redirect } from '@reach/router'
import { NavBar } from '../components/NavBar'
import { Context } from '../Context'
import { NotFound } from '../pages/NotFound'

//Esto es para cargar páginas de forma dínamica...
const Favs = React.lazy(() => import('../pages/Favs'))

export const App = () => {
  const { isAuth } = useContext(Context)
  // const urlParams = new window.URLSearchParams(window.location.search)
  // const detailId = urlParams.get('detail')
  return (
    <Suspense fallback={<div>Cargando la vista</div>}>
      <GlobalStyle />
      <Logo />
      <Router>
        <NotFound default />
        <Home path='/' />
        <Home path='/pet/:categoryId' />
        <Detail path='/detail/:detailId' />
        {!isAuth && <NoRegisteredUser path='/login' />}
        {!isAuth && <Redirect from='/favs' to='/login' noThrow />}
        {!isAuth && <Redirect from='/user' to='/login' noThrow />}
        {isAuth && <Redirect from='/login' to='/' noThrow />}
        <Favs path='/favs' />
        <User path='/user' />
      </Router>
      <NavBar />
    </Suspense>
  )
}
