import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import HomeChoice from "./HomeChoice";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === "teacher") redirect("/teacher");
  if (session?.user?.role === "student") redirect("/student");
  return <HomeChoice />;
}
