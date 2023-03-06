import { CredentialDerivedProof } from "@/models/credential";
import auth from "@/services/auth";
import Head from "next/head";
import { useEffect } from "react";

export default function Auth() {
  useEffect(() => {
    async function verify() {
      const url = window.location.href;
      console.log(url);

      // try {
        await auth.signinRedirect();
      // } catch (error) {}

      const user = await auth.getUser();
      
      if (user && user.profile._vp_token) {
        const credential = user.profile._vp_token as CredentialDerivedProof;
        console.log(credential);

        //! Uncomment this, and comment the previous line to test the verification actually works.
        // const verifyResp = await verifyCredentialAsync({
        //     derivedProof: {
        //         ...credential,
        //         proof: { ...credential.proof, nonce: "" },
        //     },
        // });
      
      }
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