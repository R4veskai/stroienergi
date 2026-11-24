import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

export default function ContactForm() {
  const form = useRef(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        "service_fau1gxj",
        "template_xrbtv75",
        form.current,
        {
          publicKey: "jruFxelScrAYmJVXe",
        }
      );

      setStatus("success");
      form.current.reset();
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact__content">

        <h2>Получите бесплатную консультацию</h2>

        <p>
          Наши специалисты ответят на ваши вопросы
          и дадут экспертные советы
        </p>

        <form
          ref={form}
          className="contact__form"
          onSubmit={sendEmail}
        >
          <input
            type="text"
            name="user_name"
            placeholder="Имя"
            aria-label="Имя"
            autoComplete="name"
            maxLength={100}
            required
          />

          <input
            type="tel"
            name="user_phone"
            placeholder="Номер телефона"
            aria-label="Номер телефона"
            autoComplete="tel"
            pattern="[+0-9\\s\\(\\)\\-]{7,25}"
            title="Введите корректный номер телефона"
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить запрос"}
          </button>
        </form>

        {status === "success" && (
          <div className="contact__success" role="status">
            Спасибо! Ваш запрос успешно отправлен.
            Наши специалисты свяжутся с вами
            в ближайшее время.
          </div>
        )}

        {status === "error" && (
          <div className="contact__error" role="alert">
            Не удалось отправить запрос.
            Пожалуйста, попробуйте ещё раз.
          </div>
        )}

      </div>
    </section>
  );
}