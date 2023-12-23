import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "../api/auth/[...nextauth]/authOptions";
import SignOutBtn from "@/components/SignOutBtn";

export default async function ProfilePage() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center space-y-2">
          <h1 className="text-3xl">Hello, {session?.user?.name}</h1>
          <SignOutBtn />
        </div>
      </div>
    </div>
  );
}
