import { SignUpModal } from "@/components/SignUpModal";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from 'next/link';
import { useState } from "react";

interface SignUpProps {
  success?: boolean;
}

export default function SignUp({ success }: SignUpProps) {
  const [isOpen, setIsOpen] = useState(!!success);

  return (
    <>
      <Head>
        <title>Sign Up | SSI Account Management</title>
      </Head>

      <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
        <main className="w-1/3 bg-white px-8 py-12 rounded shadow">
          <h1 className="mb-1 text-blue-600 text-2xl font-bold">
            Sign Up for a Credential
          </h1>

          <hr className="mb-4" />

          <p className="text-gray-700 text-lg mb-4">
            Fill the forms below to get a verifiable credential containing you account information to sign in.
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
                disabled={success}
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
                disabled={success}
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.success) {
    return {
      props: {
        success: true,
      },
    };
  }

  return {
    props: {},
  }
}