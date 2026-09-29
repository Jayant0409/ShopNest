import React from 'react';

const About = () => {
  return (
    <div
      className="
        mx-auto max-w-[900px]
        rounded-2xl
        border border-white/[0.05]
        bg-[#18181b]
        p-10
        text-center
        shadow-[0_10px_40px_rgba(0,0,0,0.5)]
      "
    >
      <img
        src="/dp.jpg"
        alt="@theshivanshvasu"
        className="
          mx-auto mb-5
          h-[180px] w-[180px]
          rounded-full
          border-4 border-orange-500
          object-cover
          shadow-[0_4px_20px_rgba(249,115,22,0.4)]
        "
      />

      <h2 className="mb-2.5 text-[2.5rem] text-white">
        About Me
      </h2>

      <h3 className="mb-[15px] text-2xl text-orange-500">
        Shivansh Vasu (@theshivanshvasu)
      </h3>

      <p
        className="
          mx-auto mb-[30px]
          max-w-[600px]
          text-[1.2rem]
          leading-[1.8]
          text-zinc-400
        "
      >
        <strong>Join the community and grow together!</strong>{' '}
        Welcome to my platform where we build, deploy, and scale highly
        engineered systems.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        <a
          href="https://theshivanshvasu.com"
          target="_blank"
          rel="noreferrer"
          className="
            m-2.5 inline-block
            rounded-lg
            border border-white/10
            bg-[#27272a]
            px-5 py-2.5
            text-white
            no-underline
            transition-all duration-300
            hover:-translate-y-px
          "
        >
          🌐 Website
        </a>

        <a
          href="https://youtube.com/@shivanshvasu"
          target="_blank"
          rel="noreferrer"
          className="
            m-2.5 inline-block
            rounded-lg
            border border-red-500
            bg-red-500/20
            px-5 py-2.5
            text-red-500
            no-underline
            transition-all duration-300
            hover:-translate-y-px
          "
        >
          📺 YouTube
        </a>

        <a
          href="https://instagram.com/theshivanshvasuofficial"
          target="_blank"
          rel="noreferrer"
          className="
            m-2.5 inline-block
            rounded-lg
            border border-pink-500
            bg-pink-500/20
            px-5 py-2.5
            text-pink-500
            no-underline
            transition-all duration-300
            hover:-translate-y-px
          "
        >
          📸 Instagram
        </a>

        <a
          href="https://www.linkedin.com/in/theshivanshvasu"
          target="_blank"
          rel="noreferrer"
          className="
            m-2.5 inline-block
            rounded-lg
            border border-blue-500
            bg-blue-500/20
            px-5 py-2.5
            text-blue-500
            no-underline
            transition-all duration-300
            hover:-translate-y-px
          "
        >
          💼 LinkedIn
        </a>

        <a
          href="https://x.com/theshivanshvasu"
          target="_blank"
          rel="noreferrer"
          className="
            m-2.5 inline-block
            rounded-lg
            border border-white/10
            bg-[#27272a]
            px-5 py-2.5
            text-white
            no-underline
            transition-all duration-300
            hover:-translate-y-px
          "
        >
          ✖️ X (Twitter)
        </a>

        <a
          href="https://whatsapp.com/channel/0029VbAWGE5ICVfcjjKTAS0B"
          target="_blank"
          rel="noreferrer"
          className="
            m-2.5 inline-block
            rounded-lg
            border border-emerald-500
            bg-emerald-500/20
            px-5 py-2.5
            text-emerald-500
            no-underline
            transition-all duration-300
            hover:-translate-y-px
          "
        >
          💬 WhatsApp
        </a>

        <a
          href="https://linktr.ee/shivanshvasu"
          target="_blank"
          rel="noreferrer"
          className="
            m-2.5 inline-block
            rounded-lg
            border border-white/10
            bg-[#27272a]
            px-5 py-2.5
            text-white
            no-underline
            transition-all duration-300
            hover:-translate-y-px
          "
        >
          🔗 Linktree
        </a>
      </div>
    </div>
  );
};

export default About;