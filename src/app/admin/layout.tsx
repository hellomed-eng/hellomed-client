import { getServerSession } from "next-auth";
import { SignOutButton } from "@/ui/admin/auth-components";
import Image from "next/image";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  const menus = [
    {
      name: "View check-ins",
      key: "check-in-view",
    },
    { name: "Change hours", key: "change-hours" },
    {
      name: "Manage carousel",
      key: "manage-carousel",
    },
    {
      name: "Manage admins",
      key: "manage-admins",
    },
  ];

  return (
    <main>
      <header className="w-full bg-sky-500 flex justify-between text-white">
        <h1 className="flex text-3xl font-extrabold items-center ml-4">
          <Link href="/admin">Admin page</Link>
        </h1>
        <div className="flex items-center space-x-4 px-4 py-2 bg-slate-700">
          <span className="font-bold">{session?.user?.email}</span>
          <Image
            className="rounded-full"
            src={session?.user?.image!}
            width={60}
            height={60}
            priority
            alt="Google session image"
          />
          <div className="font-bold bg-slate-500 hover:bg-slate-400 p-2 rounded-lg">
            <SignOutButton />
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100svh-76px)]">
        {/* sidebar */}
        <div className="bg-slate-700 w-[15%] min-w-[11rem] shrink-0 p-4 sm:p-6">
          <ul className="space-y-3 sm:space-y-4">
            {menus.map((menu) => (
              <li key={menu.key}>
                <Link href={`/admin/${menu.key}`} className="block">
                  <span className="text-white underline hover:font-semibold whitespace-nowrap text-[clamp(0.875rem,1.35vw,1.125rem)] leading-snug">
                    {menu.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* main content */}
        <div className="flex-1 min-w-0 p-6 sm:p-10">{children}</div>
      </div>
    </main>
  );
}
