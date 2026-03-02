import Hero     from "../components/Hero";
import About    from "../components/About";
import Skills   from "../components/Skills";
import Timeline from "../components/Timeline";
import Contact  from "../components/Contact";
import Footer   from "../components/Footer";

export default function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Timeline />
      <div className="divider" />
      <Contact />
      <Footer setPage={setPage} />
    </>
  );
}
