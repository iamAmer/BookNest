import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const faqs = [
  {
    q: 'Is BookNest suitable for beginners?',
    a: 'Absolutely. BookNest is designed with non-native English speakers in mind at all levels. We have books graded from A2 to C2, so whether you\'re just starting out or polishing your advanced vocabulary, there\'s something here for you.'
  },
  {
    q: 'Can I read on my phone or tablet?',
    a: 'Yes — BookNest is fully responsive and works beautifully on any device. Your reading progress syncs automatically, so you can start a book on your laptop and pick it up on your phone right where you left off.'
  },
  {
    q: 'How do personalized recommendations work?',
    a: 'Our recommendation engine looks at what genres you enjoy, your reading pace, and the books you\'ve rated or saved. The more you read, the smarter your recommendations become — like having a personal librarian who knows your taste.'
  },
  {
    q: 'Is BookNest really free to join?',
    a: 'Yes — creating an account and accessing our core library is completely free. We believe access to good books shouldn\'t have barriers, especially for learners building their English skills.'
  },
]

// const inputCls = `w-full px-3.5 py-2.5 rounded-[10px] text-sm text-[#3D2F20] outline-none transition-all
//   bg-white placeholder-[#B0967A]`
const inputStyle = {
  border: '1.5px solid rgba(195,149,99,0.3)',
  fontFamily: "'Lora', serif",
}
// const inputFocusStyle = { borderColor: '#B8956A', boxShadow: '0 0 0 3px rgba(184,149,106,0.15)' }

function FormField({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] tracking-[.06em] uppercase text-[#8B6A40] font-medium mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

// function FocusInput({ as: Tag = 'input', ...props }) {
//   const [focused, setFocused] = useState(false)
//   return (
//     <Tag
//       {...props}
//       className={inputCls + (props.className ? ' ' + props.className : '')}
//       style={{ ...inputStyle, ...(focused ? inputFocusStyle : {}), ...props.style }}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//     />
//   )
// }

export default function ContactPage() {
  const [openFaq, setOpenFaq]   = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  const serif = { fontFamily: "'Playfair Display', Georgia, serif" }
  const lora  = { fontFamily: "'Lora', serif" }

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden text-center px-6 py-20"
        style={{ background: 'linear-gradient(135deg,#F8F6F3 0%,rgba(245,230,211,0.45) 55%,#F8F6F3 100%)' }}
      >
        <div className="pointer-events-none absolute -top-14 -right-14 w-56 h-56 rounded-full opacity-[.06] bg-[#D4A574]" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 w-44 h-44 rounded-full opacity-[.05] bg-[#D4A574]" />
        <span className="pointer-events-none absolute text-[100px] text-[#8B5E2E] opacity-[.04] top-4 left-10"
          style={{ ...serif, lineHeight: 1 }}>@</span>

        <div className="relative z-10 max-w-xl mx-auto">
          <span data-aos="fade" className="block text-[11px] tracking-[.15em] uppercase text-[#C8924A] mb-3">
            get in touch
          </span>
          <h1
            data-aos="fade-down" data-aos-delay="80"
            className="font-bold text-[#3D2F20] leading-tight mb-4"
            style={{ ...serif, fontSize: 'clamp(34px,5vw,52px)' }}
          >
            We'd love to <em className="text-[#B8956A]" style={{ fontStyle: 'italic' }}>hear</em><br />from you
          </h1>
          <p data-aos="fade-up" data-aos-delay="180" className="text-[#6B5744] text-[15px] leading-relaxed" style={lora}>
            Whether you have a question about a book, need help with your English learning journey,
            or just want to say hello — we're here for you.
          </p>
          <div data-aos="fade" data-aos-delay="260" className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-14" style={{ background: 'rgba(195,149,99,0.4)' }} />
            <i className="fa-solid fa-envelope text-[#D4A574] text-sm" />
            <span className="h-px w-14" style={{ background: 'rgba(195,149,99,0.4)' }} />
          </div>
        </div>
      </section>

      {/* ── MAIN TWO-COL ── */}
      <section className="bg-white px-5 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 max-w-5xl mx-auto items-start">

          {/* Left — info cards */}
          <div className="flex flex-col gap-4">
            {[
              { icon: 'fa-envelope',  title: 'Email us',        delay: 100,
                body: <>Drop us a message anytime.<br /><a href="mailto:support@booknest.com" className="text-[#B8956A] hover:underline">support@booknest.com</a></> },
              { icon: 'fa-clock',     title: 'Response time',   delay: 200,
                body: 'We read every message carefully and usually reply within 24 hours on weekdays.' },
              { icon: 'fa-users',     title: 'Join our community', delay: 300,
                body: <>Connect with fellow readers learning English.<br /><a href="#" className="text-[#B8956A] hover:underline">Join the reading circle →</a></> },
            ].map(({ icon, title, body, delay }) => (
              <div
                key={title}
                data-aos="fade-right" data-aos-delay={delay}
                className="flex gap-4 items-start p-5 rounded-[18px] cursor-default group"
                style={{ background: '#FDFAF7', border: '1px solid rgba(195,149,99,0.2)',
                  transition: 'transform .25s,box-shadow .25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(121,84,32,0.09)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <div className="w-11 h-11 rounded-[13px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(140deg,#D4A574,#C08040)' }}>
                  <i className={`fa-${icon.startsWith('fa-clock') ? 'regular' : 'solid'} ${icon} text-white`} style={{ fontSize: '16px' }} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#3D2F20] mb-1" style={serif}>{title}</h4>
                  <p className="text-[13px] text-[#7A6050] leading-relaxed" style={lora}>{body}</p>
                </div>
              </div>
            ))}

            {/* Promise strip */}
            <div
              data-aos="fade-right" data-aos-delay="380"
              className="rounded-[18px] p-5 mt-1"
              style={{ background: 'linear-gradient(135deg,#F1E1CB,#E8D0B0)' }}
            >
              <p className="text-[11px] tracking-[.1em] uppercase text-[#A07840] mb-2">our promise</p>
              <p className="text-[13px] text-[#5C4020] leading-relaxed" style={lora}>
                Every message is read by a real person who cares about your reading journey. No bots, no templates.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            data-aos="fade-left" data-aos-delay="120"
            className="rounded-[22px] p-8"
            style={{ background: '#F5EDE0' }}
          >
            {submitted ? (
              <div className="text-center py-10">
                <i className="fa-solid fa-circle-check text-[#B8956A] text-4xl mb-4 block" />
                <h3 className="text-xl font-bold text-[#3D2F20] mb-2" style={serif}>Message sent!</h3>
                <p className="text-[14px] text-[#6B5744] leading-relaxed" style={lora}>
                  Thank you for reaching out. We'll be in touch within 24 hours. Happy reading!
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-bold text-[#3D2F20] mb-1" style={serif}>Send us a message</h3>
                <p className="text-[13px] text-[#7A6050] mb-6 leading-relaxed" style={lora}>
                  Fill in the form and we'll get back to you as soon as possible.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Your name">
                    <FocusInput placeholder="e.g. Sara Ahmed" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} />
                  </FormField>
                  <FormField label="Email address">
                    <FocusInput type="email" placeholder="you@email.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} />
                  </FormField>
                </div>

                <FormField label="Subject">
                  <FocusInput as="select" value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="" disabled>Choose a topic…</option>
                    <option>General question</option>
                    <option>Book recommendation</option>
                    <option>Technical issue</option>
                    <option>Partnership inquiry</option>
                  </FocusInput>
                </FormField>

                <FormField label="Message">
                  <FocusInput as="textarea" placeholder="Tell us what's on your mind…"
                    className="resize-y min-h-[110px]" value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} />
                </FormField>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3.5 rounded-xl text-white text-sm font-semibold mt-1
                    transition-all hover:opacity-90 hover:-translate-y-px"
                  style={{ background: 'linear-gradient(160deg,#D4A574,#B8732A)', fontFamily: "'Lora',serif" }}
                >
                  <i className="fa-solid fa-paper-plane mr-2" />
                  Send message
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 sm:px-10 lg:px-16 py-20" style={{ background: '#FDFAF7' }}>
        <div className="text-center mb-12">
          <span data-aos="fade" className="block text-[11px] tracking-[.15em] uppercase text-[#C8924A] mb-2">
            quick answers
          </span>
          <h2 data-aos="fade-down" data-aos-delay="80"
            className="font-bold text-[#3D2F20]" style={{ ...serif, fontSize: '32px' }}>
            Frequently asked <em className="text-[#B8956A]" style={{ fontStyle: 'italic' }}>questions</em>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              data-aos="fade-up" data-aos-delay={i * 80 + 100}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#fff', border: '1px solid rgba(195,149,99,0.2)' }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-3
                  hover:bg-[rgba(212,165,116,0.05)] transition-colors"
                style={{ fontFamily: "'Lora',serif", fontSize: '14px', fontWeight: 500, color: '#3D2F20', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {q}
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: openFaq === i ? 'rgba(184,149,106,0.22)' : 'rgba(184,149,106,0.12)' }}
                >
                  <i className="fa-solid fa-plus text-[#B8956A]"
                    style={{ fontSize: '11px', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform .25s' }} />
                </span>
              </button>
              {openFaq === i && (
                <p className="px-5 pb-5 text-[13px] text-[#7A6050] leading-relaxed" style={lora}>{a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}