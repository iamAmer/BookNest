import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import spotlightImg from "../../../src/assets/imgs/71qsovx-x6L._AC_UL320_.jpg";
import James_Clear from "../../../src/assets/imgs/james-Clear.webp";
import trending from "../../../src/assets/imgs/trending.png";
import Yuval from "../../../src/assets/imgs/Yuval_Noah_Harari.png";
import OIP from "../../../src/assets/imgs/OIP.webp";

export default function ShareSection() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <div>
        {/* ── Why Choose BookNest ── */}
        <section className="mt-10 py-16 px-5 sm:px-10 lg:px-20 bg-[#FFFFFF]">
          <h1
            data-aos="fade-down"
            className="text-center text-[#6B5744] sm:text-4xl font-semibold text-[40px] mb-10"
          >
            Why Choose BookNest?
          </h1>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "fa-layer-group",
                title: "Curated Collection",
                desc: "Handpicked books across all genres for every reader",
                delay: 0,
              },
              {
                icon: "fa-wand-magic-sparkles",
                title: "Personalized",
                desc: "Smart recommendations based on your reading taste",
                delay: 100,
              },
              {
                icon: "fa-ban",
                title: "Ad-Free Reading",
                desc: "Immersive experience without any distractions",
                delay: 200,
              },
              {
                icon: "fa-chart-line",
                title: "Track Progress",
                desc: "Monitor your reading journey and achievements",
                delay: 300,
              },
            ].map(({ icon, title, desc, delay }) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="flex flex-col items-center text-center gap-4 p-4
                  bg-[#F4E8D7] rounded-2xl
                  transition-all duration-300 ease-in-out
                  hover:-translate-y-2 hover:shadow-xl hover:bg-[#EDD9BC]
                  cursor-pointer group"
              >
                <div
                  className="w-11 h-11 rounded-xl bg-[#795420] flex items-center justify-center shrink-0
                    transition-transform duration-300 group-hover:scale-110"
                >
                  <i className={`fa-solid ${icon} text-white`}></i>
                </div>
                <div className="contentCard">
                  <h2 className="text-[#795420] font-semibold text-[25px] mb-1">
                    {title}
                  </h2>
                  <p className="text-[#795420] text-[16px]">{desc}</p>
                </div>
              </div>
            ))}
          </div> */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "fa-layer-group",
                num: "01",
                title: "Curated Collection",
                desc: "Handpicked books across all genres — chosen to be both enjoyable and enriching for language learners.",
                delay: 100,
              },
              {
                icon: "fa-wand-magic-sparkles",
                num: "02",
                title: "Personalized for You",
                desc: "Smart recommendations that adapt to your reading level, interests, and learning goals.",
                delay: 200,
              },
              {
                icon: "fa-ban",
                num: "03",
                title: "Ad-Free Reading",
                desc: "Pure, distraction-free reading. No banners, no pop-ups — just you and the story.",
                delay: 300,
              },
              {
                icon: "fa-chart-line",
                num: "04",
                title: "Track Progress",
                desc: "Watch your reading habit and vocabulary grow with milestones that keep you motivated.",
                delay: 400,
              },
            ].map(({ icon, num, title, desc, delay }) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="group relative bg-white rounded-[18px] p-8 overflow-hidden cursor-pointer
          border border-[rgba(195,149,99,0.18)]
          transition-all duration-300 ease-out
          hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(121,84,32,0.10)]
          hover:border-[rgba(195,149,99,0.4)]"
              >
                {/* Ghost number */}
                <span
                  className="absolute top-4 right-5 font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "52px",
                    color: "rgba(212,165,116,0.12)",
                  }}
                >
                  {num}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5
            transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{
                    background: "linear-gradient(140deg,#D4A574,#C08040)",
                  }}
                >
                  <i className={`fa-solid ${icon} text-white text-lg`} />
                </div>

                {/* Accent line */}
                <div
                  className="w-8 h-[3px] rounded-full mb-4"
                  style={{
                    background: "linear-gradient(90deg,#D4A574,#E8C49A)",
                  }}
                />

                <h3
                  className="text-[#3D2F20] font-bold text-xl mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#7A6050] text-sm leading-relaxed"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Spotlight ── */}
        <section className="mt-24" style={{ gap: "40px" }}>
          <h2
            data-aos="fade-down"
            className="text-center font-semibold text-[#6B5744] mb-10"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "40px",
              lineHeight: "100%",
            }}
          >
            Spotlight
          </h2>

          <div className="bg-[#F1E1CB] w-full" style={{ padding: "40px 80px" }}>
            <div
              className="flex flex-col sm:flex-row w-full mx-auto"
              style={{ maxWidth: "1167px", gap: "25px" }}
            >
              {/* Book cover */}
              <img
                data-aos="fade-right"
                data-aos-duration="800"
                src={spotlightImg}
                alt="The Midnight Library"
                className="rounded-[4px] shadow-md object-cover
                   w-full sm:w-[296px] sm:h-[416px]
                   max-h-[260px] sm:max-h-none flex-shrink-0"
              />

              {/* Content */}
              <div
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="150"
                className="flex flex-col"
                style={{ gap: "24px", maxWidth: "954px" }}
              >
                <div className="flex flex-col gap-4">
                  <span
                    className="inline-block bg-[#DFBA86] text-[#795420]
                      px-4 py-1.5 rounded-xl text-sm font-medium
                      border-2 border-[#C99A5E] w-fit"
                  >
                    Featured Book of the Week
                  </span>

                  <div className="flex flex-col gap-2">
                    <p className="text-[28px] text-[#795420] font-medium">
                      Fiction
                    </p>
                    <h3
                      className="text-[40px] sm:text-[48px] font-semibold
                         text-[#795420] leading-tight"
                    >
                      The Midnight Library
                    </h3>
                    <p className="text-[24px] text-[#795420]">by Matt Haig</p>
                  </div>

                  <p className="text-[18px] sm:text-[20px] text-[#795420] leading-[140%]">
                    A transformative read that has captured the hearts of
                    thousands. This week's featured selection offers profound
                    insights and captivating storytelling that will stay with
                    you long after the last page.
                  </p>

                  <div className="flex flex-wrap gap-8 sm:gap-11 text-sm text-[#795420]">
                    <span>📖 Read Time: 8–10 hrs</span>
                    <span>⭐ Rating: 4.8/5</span>
                  </div>
                </div>

                <div className="flex gap-6 sm:gap-11 flex-wrap">
                  <button
                    className="bg-[#795420] text-white px-6 py-3 rounded-xl
                      font-semibold shadow-md hover:shadow-lg transition"
                  >
                    Start Reading
                  </button>
                  <button
                    className="px-6 py-3 rounded-xl font-semibold text-[#795420]
                      hover:bg-[#795420] hover:text-white transition"
                  >
                    Add to Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trending ── */}
        <section className="py-8 px-5 sm:px-10 lg:px-16">
          <div className="mb-12">
            <div data-aos="fade-right" className="flex gap-3 items-center mb-6">
              <div className="w-8 h-8 rounded-xl bg-[#F5E6D3] flex justify-center items-center">
                <i className="fa-solid fa-arrow-trend-up"></i>
              </div>
              <p>Trending Now</p>
            </div>

            <div data-aos="zoom-in" data-aos-delay="100">
              <div className="p-3 w-[228.8px] h-[447.2px] rounded-2xl bg-[#ffffff] shadow-[0px_2px_8px_0_#D4A57414] flex flex-col justify-center items-center gap-3">
                <div className="mb-1 bg-[#F5E6D3] rounded-[14px]">
                  <img
                    src={trending}
                    className="w-full h-full bg-cover"
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="text-[16px] text-[#4A3D2F]">
                    The Midnight Library
                  </h3>
                  <p className="text-[14px] text-[#726353]">Matt Haig</p>
                  <div>
                    <i className="fa-solid fa-star text-[16px] text-[#D4A574]"></i>
                    <span className="text-[14px] text-[#5D4E3E]">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "fa-book-open",
                label: "Total Books",
                value: "10,000+",
                delay: 0,
              },
              {
                icon: "fa-regular fa-clock",
                label: "Active Readers",
                value: "5,000+",
                delay: 100,
              },
              {
                icon: "fa-bullseye",
                label: "Categories",
                value: "20+ Genres",
                delay: 200,
              },
            ].map(({ icon, label, value, delay }) => (
              <div
                key={label}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="p-6 rounded-xl bg-white shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]"
              >
                <div className="flex gap-4 items-center">
                  <div className="rounded-[14px] bg-[#F5E6D3] w-12 h-12 flex justify-center items-center shrink-0">
                    <i className={`fa-solid ${icon} text-[#B8956A]`}></i>
                  </div>
                  <div>
                    <p className="text-[#726353] text-[14px]">{label}</p>
                    <p className="text-[#4A3D2F] text-[16px] font-medium">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Popular Authors ── */}
        <section>
          <div className="px-20 py-10">
            <div data-aos="fade-up" className="mb-10">
              <h2 className="text-[#4A3D2F] text-4xl">Popular Authors</h2>
              <p className="text-[#726353]">
                Discover works from bestselling writers
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div
                data-aos="zoom-in"
                data-aos-delay="100"
                className="cursor-pointer rounded-2xl bg-white border border-[#EDE0CF] p-4
                  transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 
                  flex flex-col gap-3"
              >
                <div className="relative">
                  <div className="w-full aspect-square rounded-xl bg-[#F4E8D7] overflow-hidden">
                    <img
                      src={Yuval}
                      alt="Yuval Noah Harari"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-[26843500px] bg-[#D4A574] shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A] absolute top-32 left-32 flex justify-center items-center">
                    <i className="fa-solid fa-circle text-[#FFFFFF] text-xl"></i>
                  </div>
                </div>
                <div className="text-center flex flex-col gap-1.5">
                  <p className="font-semibold text-[#4A3D2F] text-sm">
                    Yuval Noah Harari
                  </p>
                  <span
                    className="inline-block mx-auto px-3 py-0.5 rounded-full 
                       bg-[#F4E8D7] text-[#795420] text-xs font-medium"
                  >
                    History
                  </span>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#726353]">
                    <span>4 books</span>
                    <span className="text-[#C9B99A]">·</span>
                    <span>1.9K readers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Join Community ── */}
        <section className="relative bg-[linear-gradient(180deg,#F5E6D3_0%,#FFFFFF_50%,#EFE3CE_100%)] py-10 sm:py-16 px-4 sm:px-10">
          <div className="px-2 sm:px-8">
            <h2
              data-aos="fade-down"
              className="text-[#4A3D2F] text-center text-xl sm:text-2xl md:text-4xl mb-3"
            >
              Join Our Reading Community
            </h2>
            <p
              data-aos="fade-down"
              data-aos-delay="100"
              className="text-[#726353] text-center text-sm sm:text-base mb-8 sm:mb-10"
            >
              Be part of something bigger
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: "fa-user-group",
                  value: "50K+",
                  label: "Active Readers",
                  delay: 0,
                },
                {
                  icon: "fa-book-open",
                  value: "10,000+",
                  label: "Books Available",
                  delay: 100,
                },
                {
                  icon: "fa-arrow-trend-up",
                  value: "1M+",
                  label: "Books Read",
                  delay: 200,
                },
                {
                  icon: "fa-award",
                  value: "500+",
                  label: "Badge Winners",
                  delay: 300,
                },
              ].map(({ icon, value, label, delay }) => (
                <div
                  key={label}
                  data-aos="flip-up"
                  data-aos-delay={delay}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 text-center
                    bg-[#FFFFFFE5] rounded-3xl border border-[#E8D4B880]
                    shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A]"
                >
                  <div className="p-2 sm:p-2.5 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[linear-gradient(180deg,#D4A574_0%,#B8915F_100%)] flex items-center justify-center">
                    <i
                      className={`fa-solid ${icon} text-2xl sm:text-4xl text-[#ffffff]`}
                    ></i>
                  </div>
                  <div className="contentCard">
                    <p className="text-[#4A3D2F] text-2xl sm:text-3xl lg:text-[36px] font-medium">
                      {value}
                    </p>
                    <p className="text-[13px] sm:text-[15px] lg:text-[16px] text-[#726353]">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
