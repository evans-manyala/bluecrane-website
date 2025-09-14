import React from 'react'
import Admin from './components/Admin'
import FastTopDiv from './components/FastTopDiv'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Leadership from './components/Leadership'
import Services from './components/Services'
import Resources from './components/Resources'
import ContactForm from './components/ContactForm'
import PartnersSlider from './components/PartnersSlider'
import Footer from './components/Footer'

function MainSite() {
  return (
    <>
      <FastTopDiv />
      <Navbar />
      <Hero />
      <AboutUs />
      <Leadership />
      <Services />
      <Resources />
      <ContactForm />
      <PartnersSlider />
      <Footer />
    </>
  )
}

export default function App() {
  const [hash, setHash] = React.useState(window.location.hash)
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  if (hash === '#admin') return <Admin />
  return <MainSite />
}