import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight dark:text-white">
                  Soluções de Marketing e Inovação Para negócios
                </h1>
                <p className="text-body-color dark:text-body-color-dark mb-12 text-base leading-relaxed! sm:text-lg md:text-xl">
                  A AJR é parceira de negócios que desejam se destacar. Criamos
                  soluções inteligentes em marketing, branding e tecnologia que
                  impulsionam a presença da sua empresa, aumentam resultados e
                  garantem segurança em cada etapa.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-primary">3+</span>
                    <span className="ml-2 text-lg text-body-color dark:text-body-color-dark">anos de experiência</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-primary">15+</span>
                    <span className="ml-2 text-lg text-body-color dark:text-body-color-dark">projetos entregues</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-primary">5★</span>
                    <span className="ml-2 text-lg text-body-color dark:text-body-color-dark">avaliações</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">1+</div>
                    <div className="text-sm text-body-color dark:text-body-color-dark">Projetos Concluídos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">1+</div>
                    <div className="text-sm text-body-color dark:text-body-color-dark">Clientes felizes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">24/7</div>
                    <div className="text-sm text-body-color dark:text-body-color-dark">Suporte</div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center py-16">
                  {/* Container da animação */}
                  <div className="relative h-64 w-full max-w-4xl">
                    {/* Círculo central brilhante */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative h-32 w-32">
                        {/* Pulso exterior */}
                        <div className="bg-primary/30 absolute inset-0 animate-ping rounded-full"></div>
                        {/* Círculo principal */}
                        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl"></div>
                        {/* Centro brilhante */}
                        <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-900"></div>
                        {/* Ícone central */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="animate-bounce text-4xl">⚡</span>
                        </div>
                      </div>
                    </div>

                    {/* Ícones orbitantes */}
                    <div
                      className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
                      style={{ animation: "spin 15s linear infinite" }}
                    >
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl"
                          style={{ animation: "float 3s ease-in-out infinite" }}
                        >
                          <span className="text-3xl">🚀</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
                      style={{ animation: "spin 12s linear infinite reverse" }}
                    >
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-xl"
                          style={{
                            animation: "float 3s ease-in-out infinite 0.5s",
                          }}
                        >
                          <span className="text-3xl">💎</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
                      style={{ animation: "spin 15s linear infinite" }}
                    >
                      <div className="absolute top-1/2 -left-4 -translate-y-1/2 transform">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-xl"
                          style={{
                            animation: "float 3s ease-in-out infinite 1s",
                          }}
                        >
                          <span className="text-3xl">🎯</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
                      style={{ animation: "spin 12s linear infinite reverse" }}
                    >
                      <div className="absolute top-1/2 -right-4 -translate-y-1/2 transform">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow-xl"
                          style={{ animation: "float 3s ease-in-out infinite" }}
                        >
                          <span className="text-3xl">✨</span>
                        </div>
                      </div>
                    </div>

                    {/* Partículas decorativas */}
                    <div className="absolute top-1/4 left-1/4 h-3 w-3 animate-ping rounded-full bg-blue-400 opacity-75"></div>
                    <div className="absolute top-1/3 right-1/4 h-2 w-2 animate-pulse rounded-full bg-purple-400 opacity-75"></div>
                    <div
                      className="absolute bottom-1/4 left-1/3 h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute right-1/4 bottom-1/3 h-2 w-2 animate-pulse rounded-full bg-pink-400 opacity-75"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>

                  {/* Texto impactante */}
                  <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 text-center">
                    <h3 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                      Transformando ideias em realidade digital
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
