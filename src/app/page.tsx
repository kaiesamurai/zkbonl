import Link from 'next/link';
import Header from '../components/header'
import Footer from '../components/footer'
import Image from 'next/image';

export default function Home() {
  return (
    <div className='bg-zinc-900'>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <main className="flex-grow">
          <section className='text-center min-h-screen flex flex-col justify-center relative'>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                filter: 'blur(180px)',
                width: '550px',
                height: '550px',
              }}
            />
            <div
              className="absolute left-1/2 transform translate-x-40 -translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
                filter: 'blur(80px)',
                width: '330px',
                height: '330px',
              }}
            />
            <div
              className="absolute transform -translate-x-10 -translate-y-80 "
              style={{
                background: 'linear-gradient(to bottom, rgba(83,32,73,1) 30%, rgba(82,55,149,1) 93%)',
                filter: 'blur(80px)',
                width: '330px',
                height: '330px',
              }}
            />
            <div className='relative z-10 mx-auto w-2/3'>
              <h1 className="text-8xl text-lavender font-sans font-bold leading-tight text-center responsive-heading">
                Building Trust
              </h1>
              <h1 className="text-8xl text-white font-sans font-bold leading-tight text-center responsive-heading">
                With Privacy.
              </h1>
              <p className="text-2xl mt-20 text-gray-300 mt-16 text-center">
                Securely verify and validate financial integrity while safeguarding privacy through our Private Data services.
              </p>
              <nav className="flex justify-center mt-20 p-8">
                <Link href="/all-proofs" className="text-2xl text-black mr-16 bg-white hover:bg-lavender font-bold font-sans py-4 px-14 rounded-lg transition duration-300">
                  Launch
                </Link>
                <Link href="/verifier" className="text-xl text-white font-bold py-4 px-4">
                  Verify a proof
                </Link>
              </nav>
            </div>
          </section>
          {/* Section 3 */}
          <section className=" w-full">
            <div className="flex flex-wrap items-center justify-around mx-auto mt-20 px-4">
              <div className="w-full md:w-1/2 flex justify-center relative">
                <div className="absolute transform translate-x-10 " style={{
                  background: 'linear-gradient(to bottom, rgba(167,251,255,1) 39%, rgba(0,0,0,0) 100%)',
                  filter: 'blur(180px)',
                  width: '550px',
                  height: '550px',
                }} />
                <Image
                  src="/images/icon/IsometricProof.svg"
                  alt="Description of the first image"
                  width={400}
                  height={400}
                  className='z-5'
                />
                {/*
                <Image
                  src="/images/icon/shield2.svg"
                  alt="Description of the first image"
                  width={150}
                  height={150}
                  className='absolute z-10 transform translate-x-28 translate-y-72'
                /> */}
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0 px-20">
                <h2 className="text-6xl font-bold font-tiempos-headline text-white mb-6">Proof of financial integrity, Delivered.</h2>
                <p className="text-gray-500 mb-8 text-xl">
                  Verify asset holdings in real-time, ensuring transparency and trust in financial declarations.
                </p>
                <Link href="/dashboard"
                  className="inline-block bg-white ml-5 text-black hover:bg-old_rose py-3 px-10 rounded-lg transition duration-300">Dive In
                </Link>
              </div>
            </div>
          </section>
          {/* Section 4 */}
          <section className="w-full mt-20">
            <div className="flex flex-wrap items-center justify-around mx-auto mt-32 px-4">
              <div className="w-full md:w-1/2 mt-4 md:mt-0 px-20 ">
                <h2 className="text-6xl font-bold font-tiempos-headline text-white mb-6">Credit Score</h2>
                <p className="text-gray-500 mb-8 text-xl">
                  Leverage our Credit Score Index to quantify and demonstrate your credibility to partners and customers.
                </p>
                <Link href="/credit-score"
                  className="inline-block bg-white ml-5 text-black hover:bg-old_rose py-3 px-10 rounded-lg transition duration-300">Dive In
                </Link>
              </div>
              <div className="w-full md:w-1/2 flex justify-center relative">
                <div style={{
                  background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                  filter: 'blur(180px)',
                  width: '550px',
                  height: '550px',
                  position: 'absolute',
                  zIndex: '1',
                }} />
                <Image
                  src="/images/icon/credit-score.svg"
                  alt="Description of the first image"
                  width={550}
                  height={550}
                  className='z-5 relative'
                />
              </div>
            </div>
          </section>
          {/* Section 5 */}
          <section className="w-full mt-20">
            <div className="flex flex-wrap items-center justify-around mx-auto mt-20 px-4">
              <div className="w-full md:w-1/2 flex justify-center relative">
                <div className="absolute transform translate-x-10 " style={{
                  background: 'linear-gradient(to bottom, rgba(83,32,73,1) 30%, rgba(82,55,149,1) 93%)',
                  filter: 'blur(180px)',
                  width: '550px',
                  height: '550px',
                  position: 'absolute',
                  zIndex: '1',
                }} />
                <Image
                  src="/images/icon/swap2.svg"
                  alt="Description of the first image"
                  width={550}
                  height={550}
                  className='z-10'
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0 px-20">
                <h2 className="text-6xl font-bold font-tiempos-headline text-white mb-6">Swap Solutions, Tailored for Foundations.</h2>
                <p className="text-gray-500 mb-8 text-xl">
                  Provide your supporters with a secure, transparent means to contribute to your cause or project, bolstering trust through clear financial transactions.
                </p>
                <Link href="/"
                  className="inline-block bg-white ml-5 text-black hover:bg-old_rose py-3 px-10 rounded-lg transition duration-300">Dive In
                </Link>
              </div>
            </div>
          </section>
          {/* Section 6 : Contact */}
          <section id="contact" className='flex flex-col relative my-40'>
            <div className="w-full md:w-1/2 px-4 mb-20 ml-8">
              <h2 className="text-6xl font-bold text-white mb-10">Make Your Move with Confidence</h2>
              <p className="text-2xl text-gray-400">
                Join a fast-growing community of developers and innovators connected all over the world, building the new era of the internet.
              </p>
            </div>
            <div
              className="absolute left-1/2 transform -translate-x-1/2  translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                filter: 'blur(180px)',
                width: '550px',
                height: '550px',
                position: 'absolute',
                zIndex: '1',
              }}
            />
            <div className="rounded-xl grid grid-cols-2 gap-8 px-8 pb-12 relative">
              {/* Grid item 1 */}
              <a href="https://t.me/+p9c_Y7ksKHowM2Y0" className="cursor-pointer z-10">
                <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4">
                  <Image
                    src="/images/icon/telegram.svg" // Assuming you have a dedicated Telegram icon
                    alt="Community Chat on Telegram"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-3xl font-semibold mb-4 text-white">Community Chat</h3>
                    <p className="text-xl text-gray-400">
                      Ask general questions and chat with the worldwide community on Telegram.
                    </p>
                  </div>
                </div>
              </a>
              {/* Grid item 2 */}
              <a href="https://twitter.com/provehance" className="cursor-pointer z-10">
                <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4">
                  <Image
                    src="/images/icon/twitter.svg" // Assuming you have a dedicated Twitter icon
                    alt="Twitter"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-3xl font-semibold mb-4 text-white">Twitter</h3>
                    <p className="text-xl text-gray-400">
                      Follow us to get the latest news and updates from across the ecosystem.
                    </p>
                  </div>
                </div>
              </a>
              {/* Grid item 3 */}
              <a href="https://www.linkedin.com/company/provehance" className="cursor-pointer z-10">
                <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4">
                  <Image
                    src="/images/icon/linkedin.svg" // Assuming you have a dedicated Discord icon
                    alt="linkedin"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-3xl font-semibold mb-4 text-white">Linkedin page</h3>
                    <p className="text-xl text-gray-400">
                      Follow us on our linkedin profile to get update about our product.
                    </p>
                  </div>
                </div>
              </a>
              {/* Grid item 4 */}
              <a href="https://github.com/Provehance/" className="cursor-pointer z-10">
                <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4">
                  <Image
                    src="/images/icon/github.svg"
                    alt="Github Organisation"
                    width={64}
                    height={64}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="text-3xl mb-4 font-semibold text-white">Github Organisation</h3>
                    <p className="text-xl text-gray-400">
                      Curious about our code or eager to contribute? Explore our repositories and become part of our community.
                    </p>
                  </div>
                </div>
              </a>
            </div>

          </section>

        </main>
        <Footer />
      </div>
    </div >
  );
}