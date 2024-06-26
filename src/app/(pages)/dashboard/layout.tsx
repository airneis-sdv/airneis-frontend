"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { title: "Tableau de bord", url: "/dashboard", icon: "fa-dashboard" },
    null,
    { title: "Produits", url: "/dashboard/products", icon: "fa-boxes-stacked" },
    { title: "Catégories", url: "/dashboard/categories", icon: "fa-tags" },
    { title: "Matériaux", url: "/dashboard/materials", icon: "fa-cubes" },
    null,
    { title: "Médias", url: "/dashboard/medias", icon: "fa-photo-film" },
    { title: "Utilisateurs", url: "/dashboard/users", icon: "fa-users" },
    null,
    { title: "Commandes", url: "/dashboard/orders", icon: "fa-dolly" },
  ];

  return (
    <>
      {
        user && user.role === "admin" ? (
          <div className="dashboard w-full">
            <div className="drawer xl:drawer-open">
              <div className="drawer-content h-screen flex flex-col pt-5 lg:px-10 xl:py-10 xl:ps-0 xl:pe-10 overflow-auto">
                <div className="mb-4 ps-5 lg:ps-0 xl:mb-0 xl:ps-0">
                  <label htmlFor="navigation-drawer" className="btn btn-sm border border-gray-200 drawer-button xl:hidden">
                    <i className="fa-solid fa-bars"></i>Navigation
                  </label>
                </div>
                {children}
              </div>

              <input id="navigation-drawer" type="checkbox" className="drawer-toggle" />

              <div className="drawer-side xl:p-10">
                <label htmlFor="navigation-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="h-full p-4 bg-white rounded-e-xl xl:rounded-xl xl:shadow-lg border overflow-auto flex flex-col">
                  <div className="mb-4">
                    <Link href="/" className="btn btn-ghost h-auto flex flex-col p-4">
                      <img src="/favicon.ico" alt="Airneis" className="w-28" />
                      <p className="m-0 text-xl">Airneis</p>
                    </Link>
                  </div>

                  <ul className="menu p-0 min-w-64 text-base-content flex-1">
                    {/* Sidebar content here */}
                    {menuItems.map((item, index) => {
                      if (!item) return <li key={index}></li>;

                      const isActive = item.url === "/dashboard" ? pathName === item.url : pathName.startsWith(item.url);

                      return (
                        <li key={index}>
                          <Link href={item.url} className={isActive ? "active" : ""}>
                            <i className={"fa-solid " + item.icon + " me-2"}></i>{item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8">
                    <Link href="/" className="btn btn-sm btn-ghost mx-1 w-full justify-start"><i className="fa-solid fa-right-from-bracket me-2"></i>Retour au site</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
            <h2 className="text-3xl font-bold">Veuillez vous connecter.</h2>
            <Link href={"/connexion"} className="btn btn-xs no-animation border border-gray-300">
              <i className="fa-solid fa-sign-in"></i>Connexion
            </Link>
          </div>
        )
      }
    </>
  )
}
