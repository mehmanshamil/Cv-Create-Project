"use client";
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

interface FormCVProps {
  thema: boolean;
}

const FormCV: React.FC<FormCVProps> = ({ thema }) => {
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
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      profession: Yup.string().required("Profession is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      linkedin: Yup.string(),
      github: Yup.string(),
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

  const inputClass = `w-full px-3 py-2 border rounded-lg ${
    thema ? "bg-white text-black border-gray-300" : "bg-gray-800 text-white border-gray-600"
  }`;

  const fileInputClass = `w-[80%] p-1.5 m-auto rounded-[10px] cursor-pointer ${
    thema ? "bg-black text-white" : "bg-white text-black"
  }`;

  const buttonClass = `w-full py-2 rounded-lg transition ${
    thema ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
  }`;

  const bgColor = thema ? "bg-gray-100 text-black" : "bg-gray-900 text-white";

  return (
    <div className={`max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-md ${bgColor}`}>
      <h1 className="text-2xl font-bold mb-6 text-center">Create Your CV</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}

            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.surname && formik.errors.surname && (
              <p className="text-red-500 text-sm">{formik.errors.surname}</p>
            )}

            <input
              type="text"
              name="profession"
              placeholder="Profession"
              value={formik.values.profession}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.profession && formik.errors.profession && (
              <p className="text-red-500 text-sm">{formik.errors.profession}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}

            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.linkedin && formik.errors.linkedin && (
              <p className="text-red-500 text-sm">{formik.errors.linkedin}</p>
            )}

            <input
              type="text"
              name="github"
              placeholder="GitHub"
              value={formik.values.github}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.github && formik.errors.github && (
              <p className="text-red-500 text-sm">{formik.errors.github}</p>
            )}
          </div>

          <div className="flex-none">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={fileInputClass}
            />
            {photoURL && (
              <img
                src={photoURL}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto mt-2"
              />
            )}
          </div>
        </div>

        <SectionWithAdd
          title="Education"
          items={formik.values.education}
          onChange={(items) => formik.setFieldValue("education", items)}
          thema={thema}
        />
        <SectionWithAdd
          title="Experience"
          items={formik.values.experience}
          onChange={(items) => formik.setFieldValue("experience", items)}
          thema={thema}
        />
        <SectionWithAdd
          title="Training"
          items={formik.values.training}
          onChange={(items) => formik.setFieldValue("training", items)}
          thema={thema}
        />

        <button type="submit" className={buttonClass}>
          Generate CV PDF
        </button>
      </form>

      <div
        ref={pdfRef}
        className={`hidden p-6 rounded-lg max-w-3xl mx-auto mt-6 shadow-md space-y-4 ${
          thema ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        {photoURL && <img src={photoURL} alt="Photo" className="w-32 h-32 object-cover rounded-full mx-auto" />}
        <h1 className="text-3xl font-bold text-center">
          {formik.values.name} {formik.values.surname}
        </h1>
        <p className="text-center">{formik.values.profession}</p>
        <p className="text-center">
          {formik.values.email} | {formik.values.phone}
        </p>
        <p className="text-center">
          LinkedIn: {formik.values.linkedin} | GitHub: {formik.values.github}
        </p>
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
