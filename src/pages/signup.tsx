import { AxiosError } from "axios";
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";

import api from "@/services/api";

interface SignUpFormData {
  name: string;
  email: string;
  role: number;
  pictureUrl?: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    role: 0,
  });

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post('/signup', formData);
      alert('Credential issued successfully!');
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.errors);
      } else {
        alert((error as any).message);
      }
      console.error(error)
    }
    setIsLoading(false);
  }

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

          <form className="mb-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-bold mb-1">Name:</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="block w-full bg-white rounded p-2 border"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
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
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">Role:</label>
              <select
                name="role"
                className="block w-full bg-white rounded p-2 border"
                value={formData.role.toString()} 
                onChange={(event) => setFormData({ ...formData, role: Number(event.target.value) })}
                required
              >
                <option value="0">Member</option>
                <option value="1">Moderator</option>
                <option value="2">Admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">Picture:</label>
              <input
                name="pictureUrl"
                type="url"
                placeholder="http://example.com/image.png"
                className="block w-full bg-white rounded p-2 border"
                value={formData.pictureUrl || ''}
                onChange={(event) => setFormData({ ...formData, pictureUrl: event.target.value })}
              />
            </div>

            <button
              type="submit"
              className={`block w-full p-2 rounded ${isLoading ? `bg-white border border-gray-600 text-gray-600` : `bg-blue-600 text-white hover:brightness-90`} font-bold transition`}
              disabled={isLoading}
            >
              {isLoading ? 'Issuing...' : 'Submit'}
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