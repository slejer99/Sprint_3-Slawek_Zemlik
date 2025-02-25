import s from "./FormComponent.module.css";
import Experience from "./Experience";
import Modal from "./Modal";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

const experienceSchema = z.object({
  language: z.enum(["Javascript", "Python", "C++", "Java"]),
  years: z.number(),
});

const userSchema = z.object({
  firstName: z.string().min(3, { message: "Imię musi mieć minimum 3 znaki" }),
  lastName: z
    .string()
    .min(3, { message: "Nazwisko musi mieć minimum 3 znaki" }),
  email: z.string().email({ message: "Wprowadź poprawny adres e-mail" }),
  phone: z
    .string()
    .regex(/^\d{9}$/, { message: "Numer powinien składać się z 9 cyfr" })
    .min(9, { message: "Numer powinien składać się z 9 cyfr" })
    .max(9, { message: "Numer powinien składać się z 9 cyfr" }),
  cv: z
    .any()
    .refine((files) => files?.length > 0, "Plik CV jest wymagany")
    .refine(
      (files) => ["image/jpeg", "image/png"].includes(files[0]?.type),
      "Akceptowane formaty to JPEG i PNG"
    ),
  techs: z
    .array(z.string())
    .min(1, { message: "Wybierz conajmniej jedną technologię" }),
  mode: z.string(),

  experience: z.array(experienceSchema).optional(),
});

function FormComponent() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm(
    { resolver: zodResolver(userSchema) },
    { defaultValues: { experienceCheckbox: false } }
  );

  const [exp, setExp] = useState([]);
  const [expError, setExpError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    if (isExperienced && exp.length === 0) {
      setExpError(
        "Gdy zaznaczono doświadczenie w programowaniu, lista doświadczeń nie może być pusta."
      );
      return;
    } else {
      setExpError("");

      const cvFile = data.cv[0];
      const cvUrl = URL.createObjectURL(cvFile);

      setSubmittedData({ ...data, cvUrl });
    }
  };

  const isExperienced = watch("experienceCheckbox");
  useEffect(() => {
    if (!isExperienced) {
      setExp([]);
      setValue("experience", []);
      setExpError("");
    }
  }, [isExperienced, setValue]);

  const handleExpChange = (updatedExp) => {
    setExp(updatedExp);
    setValue("experience", updatedExp);
    if (isExperienced && updatedExp.length > 0) {
      setExpError("");
    }
  };
  return (
    <div className={s.main}>
      <h1>Formularz zgłoszeniowy na kurs programowania</h1>
      <div>
        {submittedData ? (
          <Modal data={submittedData} />
        ) : (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h2>Dane osobowe</h2>
            <div className={s.credentialsWrapper}>
              <input
                {...register("firstName")}
                type="text"
                name="firstName"
                placeholder="Imię"
                className={errors.firstName ? s.errorInput : s.input}
              />
              {errors?.firstName && (
                <span className={s.error}>{errors.firstName.message}</span>
              )}
              <input
                {...register("lastName")}
                type="text"
                name="lastName"
                placeholder="Nazwisko"
                className={errors.lastName ? s.errorInput : s.input}
              />
              {errors?.lastName && (
                <span className={s.error}>{errors.lastName.message}</span>
              )}
              <input
                {...register("email")}
                type="text"
                name="email"
                placeholder="E-mail"
                className={errors.email ? s.errorInput : s.input}
              />
              {errors?.email && (
                <span className={s.error}>{errors.email.message}</span>
              )}
              <input
                {...register("phone")}
                type="text"
                name="phone"
                placeholder="Telefon"
                className={errors.phone ? s.errorInput : s.input}
              />
              {errors?.phone && (
                <span className={s.error}>{errors.phone.message}</span>
              )}
            </div>

            <h2>Preferencje kursu</h2>
            <span>Wybierz formę nauki:</span>
            <fieldset className={s.learningMode}>
              <input
                {...register("mode")}
                type="radio"
                id="onsite"
                name="mode"
                value="Onsite"
              />
              <label htmlFor="onsite">Stacjonarne</label>
              <input
                {...register("mode")}
                type="radio"
                id="online"
                name="mode"
                value="Online"
                defaultChecked
              />
              <label htmlFor="online">Online</label>
            </fieldset>
            <select
              {...register("techs")}
              name="techs"
              id="techs"
              className={errors.techs ? s.errorInput : s.select}
              multiple
              size={5}
            >
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="Next.js">Next.js</option>
            </select>
            {errors?.techs && (
              <span className={s.error}>{errors.techs.message}</span>
            )}
            <h2>Dodaj swoje CV</h2>
            <input
              {...register("cv")}
              type="file"
              className={errors.cv ? s.errorInput : s.input}
              accept=".png, .jpeg"
            />
            {errors?.cv && <span className={s.error}>{errors.cv.message}</span>}
            <h2>Doświadczenie w programowaniu</h2>
            <div>
              <input
                {...register("experienceCheckbox")}
                type="checkbox"
                id="experience-input"
              />
              <label htmlFor="experience-input">
                Czy masz doświadczenie w programowaniu?
              </label>
            </div>
            {isExperienced && (
              <Experience onExpChange={handleExpChange}> </Experience>
            )}
            {expError && <span className={s.error}>{expError}</span>}
            <button type="submit" className={s.submitButton}>
              Wyślij zgłoszenie
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default FormComponent;
