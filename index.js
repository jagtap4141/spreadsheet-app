import Head from 'next/head';
import Spreadsheet from '../components/Spreadsheet';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <Head>
        <title>Spreadsheet App</title>
        <meta name="description" content="A simple spreadsheet app built with Next.js and Tailwind CSS" />
      </Head>
      <h1 className="text-4xl font-extrabold text-white mb-6">Spreadsheet App</h1>
      <p className="text-gray-400 mb-4 text-center">A simple spreadsheet with formula support and responsive layout.</p>
      <Spreadsheet />
    </div>
  );
}
