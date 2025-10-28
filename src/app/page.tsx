"use client";
import FireworkEffect from "@/components/FireworkEffect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FormCV from "@/form/formComponent/Form";
import React from "react";

const page = () => {
  const [thema, setThema] = React.useState(false);
  const [wel, setWel] = React.useState(true);

  setTimeout(() => {
    setWel(!wel);
  }, 9000);

  return (
    <>
      <FireworkEffect />
      <Header thema={thema} setThema={setThema} />
      <main>
        <section>
          {wel && (
            <h1 className="text-center text-bold text-3xl">Xoş gəlifsiniz :) </h1>
          )}
          <FormCV thema={thema} />
        </section>
      </main>
      <Footer thema={thema} setThema={setThema} />
    </>
  );
};

export default page;
