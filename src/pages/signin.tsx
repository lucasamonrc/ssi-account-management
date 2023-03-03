import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";

import oidc from "@/services/oidc";

export default function SignIn() {
  const router = useRouter();

  async function login() {
    const request = await oidc.createSigninRequest({});
    console.log(request);
    window.location.assign(request.url);
  }

  return (
    <>
      <Head>
        <title>Sign In | SSI Account Management</title>
      </Head>
      <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
        <main className="w-1/3 bg-white px-8 py-12 rounded shadow">
          <h1 className="mb-1 text-blue-600 text-2xl font-bold">
            Sign In with a Credential
          </h1>

          <hr className="mb-4" />

          <p className="text-gray-700 text-lg mb-4">
            You will be requested to present your credential by clicking the button below.
          </p>

          <button className="block w-full rounded p-2 text-center bg-blue-600 font-bold text-white transition hover:brightness-90 mb-4" onClick={login}>Sign in with email</button>

          <Link href="/" className="text-blue-600 hover:underline">
            Go back
          </Link>
        </main>
      </div>
    </>
  );
}