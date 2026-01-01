import { Fragment } from 'react'
import Image from 'next/future/image'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'

const codeLanguage = 'typescript'
const code = `requirements {
  node --version >= v24.7.0
  npm --version >= 11.6.2
  tsc --version >= 5.0.0
}

npm install @palindromecryptoescrow/sdk
`

const tabs = [{ name: 'Start here', isActive: true }]

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <h1 className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Palindrome Crypto Pay SDK
              </h1>

              <h2 className="mt-3 text-2xl tracking-tight text-slate-400">
                With Built-in Escrow Service
              </h2>
              <div className="flex flex-row space-x-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="h-8 w-8 flex-none [--icon-background:theme(colors.amber.100)] [--icon-foreground:theme(colors.amber.900)]"
                >
                  <defs>
                    <radialGradient
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      id=":R15pn6:-gradient"
                      gradientTransform="rotate(65.924 1.519 20.92) scale(25.7391)"
                    >
                      <stop stopColor="#FDE68A" offset=".08"></stop>
                      <stop stopColor="#F59E0B" offset=".837"></stop>
                    </radialGradient>
                    <radialGradient
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      id=":R15pn6:-gradient-dark"
                      gradientTransform="matrix(0 24.5 -24.5 0 16 5.5)"
                    >
                      <stop stopColor="#FDE68A" offset=".08"></stop>
                      <stop stopColor="#F59E0B" offset=".837"></stop>
                    </radialGradient>
                  </defs>

                  <g className="dark:hidden">
                    <circle
                      cx="20"
                      cy="20"
                      r="12"
                      fill="url(#:R15pn6:-gradient)"
                    ></circle>
                    <path
                      d="M3 16c0 7.18 5.82 13 13 13s13-5.82 13-13S23.18 3 16 3 3 8.82 3 16Z"
                      fillOpacity="0.5"
                      className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="m15.408 16.509-1.04-5.543a1.66 1.66 0 1 1 3.263 0l-1.039 5.543a.602.602 0 0 1-1.184 0Z"
                      className="fill-[var(--icon-foreground)] stroke-[color:var(--icon-foreground)]"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M16 23a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      fillOpacity="0.5"
                      stroke="currentColor"
                      className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                  <g className="hidden dark:inline">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14-6.268 14-14 14S2 23.732 2 16Zm11.386-4.85a2.66 2.66 0 1 1 5.228 0l-1.039 5.543a1.602 1.602 0 0 1-3.15 0l-1.04-5.543ZM16 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                      fill="url(#:R15pn6:-gradient-dark)"
                    ></path>
                  </g>
                </svg>
                <p className="m-0 font-display text-xl text-amber-900 dark:text-amber-500">
                  Testnet!
                </p>
              </div>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button href="#quick-start">Get started</Button>
                {/* <Button
                  href="https://github.com/Palindromenetwork"
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Button> */}
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <Image
                className="absolute -right-64 -top-64"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <Image
                className="absolute -bottom-40 -right-44"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                <div className="pl-4 pt-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx(
                          'flex h-6 rounded-full',
                          tab.isActive
                            ? 'bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300'
                            : 'text-slate-500'
                        )}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            tab.isActive && 'bg-slate-800'
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm">
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={code}
                      language={codeLanguage}
                      theme={undefined}
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={clsx(
                            className,
                            'flex overflow-x-auto pb-6'
                          )}
                          style={style}
                        >
                          <code className="px-4">
                            {tokens.map((line, lineIndex) => (
                              <div key={lineIndex} {...getLineProps({ line })}>
                                {line.map((token, tokenIndex) => (
                                  <span
                                    key={tokenIndex}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))}
                          </code>
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
