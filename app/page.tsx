import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/option";
import SignOutButtom from "./components/signOut";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="bg-pink-500 text-3xl p-5 rounded-md mb-5">
          Hello from Your Home Page!
        </h1>
        <p className="mb-3">{JSON.stringify(session)}</p>
        <SignOutButtom />
      </div>
    </>
  );
}
