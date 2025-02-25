import s from "./Modal.module.css";

const Modal = ({ data }) => {
  return (
    <div className={s.main}>
      <div>
        <h2>Dane osobowe:</h2>
        <p>Imię: {data.firstName}</p>
        <p>Nazwisko: {data.lastName}</p>
        <p>Email: {data.email}</p>
        <p>Telefon: {data.phone}</p>
      </div>
      {data.experience.length > 1 && (
        <div>
          <h2>Doświadczenie w programowaniu:</h2>
          <ul>
            {data.experience.map((item) => (
              <li>
                Technologia: {item.language}/Poziom: {item.years}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2>Preferencje kursu:</h2>
        <p>Typ kursu: {data.mode}</p>
      </div>
      <div>
        <h2>Curriculu vitae:</h2>
        <img src={data.cvUrl} alt="CV" />
      </div>
    </div>
  );
};

export default Modal;
