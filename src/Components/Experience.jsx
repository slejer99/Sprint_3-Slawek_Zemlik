import { useState } from "react";
import s from "./Experience.module.css";

const Experience = ({ onExpChange }) => {
  const [exp, setExp] = useState([]);

  const handleAddExperience = () => {
    const newField = {
      id: Date.now(),
      language: "Javascript",
      years: 1,
    };
    const updatedExp = [...exp, newField];
    setExp([...exp, newField]);
    onExpChange(updatedExp);
  };

  const handleDeleteExperience = (id) => {
    const updatedExp = exp.filter((item) => item.id !== id);
    setExp(updatedExp);
    onExpChange(updatedExp);
  };

  const handleChange = (id, field, value) => {
    const updatedExp = exp.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setExp(updatedExp);
    onExpChange(updatedExp);
  };

  return (
    <>
      <button
        type="button"
        className={s.addButton}
        onClick={handleAddExperience}
      >
        Dodaj doświadczenie
      </button>
      {exp.map((experience) => (
        <div key={experience.id} className={s.experienceField}>
          <select
            className={s.select}
            value={experience.language}
            onChange={(e) => {
              handleChange(experience.id, "language", e.target.value);
            }}
          >
            <option value="Javascript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
          </select>
          <select
            className={s.input}
            value={experience.years}
            onChange={(e) => {
              handleChange(experience.id, "years", parseInt(e.target.value));
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button
            type="button"
            className={s.deleteButton}
            onClick={() => handleDeleteExperience(experience.id)}
          >
            Usuń
          </button>
        </div>
      ))}
    </>
  );
};

export default Experience;
