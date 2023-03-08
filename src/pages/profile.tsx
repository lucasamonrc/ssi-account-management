/* eslint-disable @next/next/no-img-element */
import { appOptions } from "@/config/env";
import api from "@/services/api";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import { useState } from "react";
import Router from 'next/router';

interface User {
  memberId: string;
  name: string;
  pictureUrl?: string;
  email: string;
  role: number;
}

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const [isLoading, setIsLoading] = useState(false);

  function getRole(role: number) {
    switch (role) {
      case 2:
        return 'Admin';
      case 1:
        return 'Moderator';
      default:
        return 'Member';
    }
  }

  async function handleVerifyAdmin() {
    
  }

  async function logout() {
    destroyCookie(undefined, appOptions.cookieName);
    Router.push('/');
  }
  
  return (
    <>
      <Head>
        <title>Profile | SSI Account Management</title>
      </Head>
      <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
        <main className="w-1/3 bg-white px-8 py-12 rounded shadow">
          <h1 className="mb-1 text-blue-600 text-2xl font-bold">
            User Account Information
          </h1>

          <hr className="mb-4" />

          <p className="text-gray-700 text-lg mb-4">
            Below you will find the account information that was encoded in the auth token.
          </p>

          <section className="mb-8">
            {!!user.pictureUrl && (
              <img 
                src={"https://www.github.com/lucasamonrc.png"} 
                alt=""
                className="block rounded-full w-[200px] h-[200px] mx-auto"
              />
            )}

            <div className="mb-4">
              <label className="block font-bold mb-1">Member ID:</label>
              <input
                name="memberId"
                type="text"
                className="block w-full bg-white rounded p-2 border"
                value={user.memberId}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">Name:</label>
              <input
                name="name"
                type="text"
                className="block w-full bg-white rounded p-2 border"
                value={user.name}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">Email:</label>
              <input
                name="email"
                type="email"
                className="block w-full bg-white rounded p-2 border"
                value={user.email}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">Role:</label>
              <input
                name="role"
                type="text"
                className="block w-full bg-white rounded p-2 border"
                value={getRole(user.role)}
                disabled
              />
            </div>
          </section>
          <button
            className={`mb-2 block w-full p-2 rounded ${isLoading ? `bg-white border border-gray-600 text-gray-600` : `bg-blue-600 text-white hover:brightness-90`} font-bold transition`}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Admin'}
          </button>
          <button className="text-blue-600 hover:underline" onClick={logout}>Sign out</button>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { [appOptions.cookieName]: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data } = await api.get<User>('/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return {
    props: {
      user: data,
    }
  };
}