import { useState } from "react"
import { motion } from "framer-motion"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Customer Support",
    message: "",
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    console.log("Contact form submitted:", formData)

    window.alert(
      "Your message form is working. Email delivery will be connected later."
    )
  }

  return (
    <main className="min-h-screen bg-black px-8 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">

        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-500">
            Contact Worlbess
          </p>

          <h1 className="mt-5 text-5xl font-serif md:text-7xl">
            How Can We Help?
          </h1>

          <p className="mt-7 text-lg leading-8 text-gray-300">
            Reach out for customer support, wholesale inquiries, retail
            partnerships, media requests, or general questions.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr]">

          <motion.section
            className="space-y-6"
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {[
              {
                title: "Customer Support",
                text: "Questions about products, shipping, or an existing order.",
              },
              {
                title: "Wholesale Inquiries",
                text: "Learn about carrying Worlbess products in your store.",
              },
              {
                title: "Retail Partnerships",
                text: "Discuss collaborations, distribution, and brand opportunities.",
              },
              {
                title: "Media and Press",
                text: "Contact the Worlbess team regarding interviews and features.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-7"
              >
                <h2 className="text-2xl font-serif text-yellow-500">
                  {item.title}
                </h2>

                <p className="mt-3 leading-7 text-gray-400">
                  {item.text}
                </p>
              </article>
            ))}

            <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-7">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
                Business Hours
              </p>

              <div className="mt-5 space-y-3 text-gray-300">
                <div className="flex justify-between gap-4">
                  <span>Monday–Friday</span>
                  <span>9:00 AM–6:00 PM</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Saturday</span>
                  <span>10:00 AM–4:00 PM</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-yellow-500/25 bg-[#111111] p-8 md:p-10"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif">
              Send a Message
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-300"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="subject"
                className="block text-sm text-gray-300"
              >
                Subject
              </label>

              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
              >
                <option>Customer Support</option>
                <option>Wholesale Inquiry</option>
                <option>Retail Partnership</option>
                <option>Media and Press</option>
                <option>General Question</option>
              </select>
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="block text-sm text-gray-300"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="8"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black hover:bg-yellow-400 transition"
            >
              Send Message
            </button>

            <p className="mt-5 text-center text-sm text-gray-500">
              Email delivery will be connected when we build the backend.
            </p>
          </motion.form>

        </div>

        <section className="mt-20 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-[#171717] to-black px-8 py-14 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-500">
            Frequently Asked Questions
          </p>

          <h2 className="mt-5 text-4xl font-serif md:text-5xl">
            Answers Before You Ask
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
            Shipping, returns, age requirements, product information, and order
            questions will be covered in our full FAQ section.
          </p>

          <button
            type="button"
            className="mt-8 rounded-full border border-yellow-500 px-8 py-3 text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
          >
            View FAQs
          </button>
        </section>

      </div>
    </main>
  )
}

export default Contact