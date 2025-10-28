"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FormCV from "@/form/formComponent/Form";
import React from "react";

const page = () => {
  const [thema, setThema] = React.useState(false);

  return (
    <>
      <Header  thema={thema} setThema={setThema}/>
      <main>
        <section>
          <FormCV/>
        </section>
      </main>
      <Footer  thema={thema} setThema={setThema}/>
    </>
  );
};

export default page;
