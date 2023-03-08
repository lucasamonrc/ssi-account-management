import { CredentialDerivedProof } from "@/models/credential";
import api from "@/services/api";
import auth, { oidc } from "@/services/auth";
import Head from "next/head";
import { useEffect } from "react";

export default function Auth() {
  useEffect(() => {
    async function verify() {
      const url = window.location.toString();

      const response = await oidc.processSigninResponse(url);

      console.log(response);
    
    }

    verify();
  }, []);

  return (
    <>
      <Head>
        <title>Verifying... | SSI Account Management</title>
      </Head>
      <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
        <main className="w-1/3 bg-white px-8 py-12 rounded shadow">
          <h1 className="mb-1 text-blue-600 text-2xl font-bold">
            Verifying login...
          </h1>
        </main>
      </div>
    </>
  );
}