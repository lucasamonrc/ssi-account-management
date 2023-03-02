/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from 'next/link';


export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up | SSI Account Management</title>
      </Head>
      
      <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
        <main className="w-1/3 bg-white px-8 py-12 rounded shadow">
          <h1 className="mb-1 text-blue-600 text-2xl font-bold">
            Sign Up for a Credential
          </h1>

          <hr className="mb-4" />

          <p className="text-gray-700 text-lg mb-4">
            Fill the forms below to get a verifiable credential containing you account information to sign in.
          </p>

          <p className="text-gray-700 text-lg mb-8">
            You will need to save this credential in a SSI wallet such as {' '}
            <a className="text-blue-600 hover:underline" href="https://trinsic.id/trinsic-wallet/" target="_blank" rel="noreferrer">
              Trinsic Wallet
            </a>
            .
          </p>

          <form className="mb-8" action="/api/signup" method="post">
            <div className="mb-4">
              <label className="block font-bold mb-1">Name:</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="block w-full bg-white rounded p-2 border"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">Email:</label>
              <input
                name="email"
                type="email"
                placeholder="name@domain.com"
                className="block w-full bg-white rounded p-2 border"
                required
              />
            </div>

            <button
              type="submit"
              className="block w-full p-2 rounded bg-blue-600 text-white font-bold hover:brightness-90 transition"
            >
              Issue
            </button>
          </form>

          <Link href="/" className="text-blue-600 hover:underline">
            Go back
          </Link>
        </main>
      </div>
    </>
  );
}