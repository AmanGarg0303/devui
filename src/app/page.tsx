import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar />
      <h1>Hello world</h1>
      {session && <p>{JSON.stringify(session)}</p>}
    </div>
  );
}
