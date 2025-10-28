"use client"
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import SectionWithAdd from "./Modal";

interface FormValues {
  name: string;
  surname: string;
  profession: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  photo: File | null;
  education: string[];
  experience: string[];
  training: string[];
}

const FormCV = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      surname: "",
      profession: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      photo: null,
      education: [],
      experience: [],
      training: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      surname: Yup.string().required("Required"),
      profession: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: async () => {
      if (!pdfRef.current) return;
      pdfRef.current.classList.remove("hidden");
      const canvas = await html2canvas(pdfRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("CV.pdf");
      pdfRef.current.classList.add("hidden");
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("photo", e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Your CV</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 space-y-2">
            <input type="text" name="name" placeholder="Name" value={formik.values.name} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="surname" placeholder="Surname" value={formik.values.surname} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="profession" placeholder="Profession" value={formik.values.profession} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded-lg" />
            <input type="email" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="phone" placeholder="Phone" value={formik.values.phone} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="linkedin" placeholder="LinkedIn" value={formik.values.linkedin} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="github" placeholder="GitHub" value={formik.values.github} onChange={formik.handleChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="flex-none ">
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-[80%] p-1.5 m-auto rounded-[10px] bg-black text-white cursor-pointer" />
            {photoURL && <img src={photoURL} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto mt-2" />}
          </div>
        </div>

        {/* Sections */}
        <SectionWithAdd title="Education" items={formik.values.education} onChange={(items) => formik.setFieldValue("education", items)} />
        <SectionWithAdd title="Experience" items={formik.values.experience} onChange={(items) => formik.setFieldValue("experience", items)} />
        <SectionWithAdd title="Training" items={formik.values.training} onChange={(items) => formik.setFieldValue("training", items)} />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Generate CV PDF</button>
      </form>

      {/* PDF Preview */}
      <div ref={pdfRef} className="hidden p-6 bg-white text-black max-w-3xl mx-auto mt-6 rounded-lg shadow-md space-y-4">
        {photoURL && <img src={photoURL} alt="Photo" className="w-32 h-32 object-cover rounded-full mx-auto" />}
        <h1 className="text-3xl font-bold text-center">{formik.values.name} {formik.values.surname}</h1>
        <p className="text-center">{formik.values.profession}</p>
        <p className="text-center">{formik.values.email} | {formik.values.phone}</p>
        <p className="text-center">LinkedIn: {formik.values.linkedin} | GitHub: {formik.values.github}</p>
        <div>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
          <ul className="list-disc list-inside">{formik.values.education.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
          <ul className="list-disc list-inside">{formik.values.experience.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Training</h2>
          <ul className="list-disc list-inside">{formik.values.training.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      </div>
    </div>
  );
};

export default FormCV;
