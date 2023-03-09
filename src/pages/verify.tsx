import Head from "next/head";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { parseCookies, setCookie } from 'nookies';
import Router from "next/router";

import api from "@/services/api";
import oidc from "@/services/oidc";
import { appOptions } from "@/config/env";
import { GetServerSideProps } from "next";

export default function Verify() {
  useEffect(() => {
    async function verify() {
      const url = window.location.toString();
  
      try {
        const response = await oidc.processSigninResponse(url);

        const proof = (response as any).vp_token;
        
        const { data } = await api.post('/verify', { proof });

        setCookie(undefined, appOptions.cookieName, data.token, {
          maxAge: appOptions.cookieMaxAge, // 30 days
        })

        api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

        Router.push('/profile');
      } catch(error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        } else {
          alert('Error processing OIDC response.');
        }

        console.log(error);
        Router.push('/');
      }
    }

    verify();
  }, [])

  return (
    <>
      <Head>
        <title>Verify | SSI Account Management</title>
      </Head>
      <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
        <main className="w-1/4 bg-white px-8 py-12 rounded shadow">
          <h1 className="mb-1 text-blue-600 text-2xl font-bold">
            Verifying credential...
          </h1>
        </main>
      </div>
    </>
  );
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { [appOptions.cookieName]: token } = parseCookies(context);

  if (!!token) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  const query = context.query;
  
  if (Object.keys(query).length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
}