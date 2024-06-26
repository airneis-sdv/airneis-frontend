'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { postCallApi } from '../api/post';

const Navbar = () => {
  const ENDPOINT_FOR_LOGOUT = '/auth/logout';
  const { isLoggedIn, setIsLoggedIn, logout, user } = useAuth();
  const { shoppingCart, setShoppingCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClickForLogout = async () => {
    const result = await postCallApi(ENDPOINT_FOR_LOGOUT);
    if (result.success) {
      logout();
      setShoppingCart({ items: [], total: 0 });
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const quantity =
    shoppingCart?.items?.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0,
    ) || 0;

  useEffect(() => {
    if (isLoggedIn && user) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, user]);

  if (usePathname().startsWith("/dashboard")) return;

  return (
    <div className="fixed w-full z-10">
      <div className="navbar border border-gray-300 bg-base-100 shadow rounded-2xl mt-8 w-5/6 md:w-4/6 lg:w-3/5 mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl flex items-center">
            <Image
              src="/favicon.ico"
              alt="Airneis"
              width={40}
              height={40}
              className="me-2"
            />
            <span>Airneis</span>
          </Link>
          <div className='sm:hidden flex-1 flex justify-end'>
            <button
              className="btn btn-ghost text-xl"
              onClick={handleClick}
            >
            <i className="fa-solid fa-bars"></i>
          </button>
            </div>
          {isOpen && (
            <div className="absolute top-full right-0 mr-8 bg-white shadow-lg rounded-lg p-4 flex flex-col items-start sm:hidden z-50">
              <Link href="/produits" className="hover:text-gray-400">
                Produits
              </Link>
              <Link
                href="/rechercher"
                className="hover:text-gray-400 hover:font-bold"
              >
                Rechercher
              </Link>
              <Link
                href="/panier"
                className="hover:text-gray-400 hover:font-bold"
              >
                Panier
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/mon-compte"
                    className="hover:text-gray-400 hover:font-bold"
                  >
                    Mon compte
                  </Link>
                  <Link
                    href="/commandes"
                    className="hover:text-gray-400 hover:font-bold"
                  >
                    Commandes
                  </Link>
                  {
                    user?.role === 'admin' && (
                      <Link
                        href="/dashboard"
                        className="hover:text-gray-400 hover:font-bold"
                      >
                        Tableau de bord
                      </Link>
                    )
                  }
                  <button onClick={handleClickForLogout}>
                    <Link
                      href="/"
                      className="hover:text-gray-400 hover:font-bold"
                    >
                      Déconnexion
                    </Link>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    className="hover:text-gray-400 hover:font-bold"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/inscription"
                    className="hover:text-gray-400 hover:font-bold"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          )}
          <Link
            role="button"
            className="sm:btn sm:btn-ghost hidden sm:hover:font-bold"
            href="/produits"
          >
            Produits
          </Link>
        </div>
        <div className="hidden sm:block">
          <div className="flex-none">
            <Link
              role="button"
              className="btn btn-ghost rounded-full"
              href="/rechercher"
            >
              <i className="fa-solid fa-magnifying-glass text-xl ms-1"></i>
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle flex flex-col justify-center"
              >
                <div className="indicator">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  <span className="badge badge-sm indicator-item">
                    {quantity}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-6 z-[1] border border-gray-300 card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {quantity} {quantity > 1 ? 'articles' : 'article'}
                  </span>
                  <span className="font-semibold">
                    {shoppingCart?.total
                      ? `Total : ${shoppingCart.total} €`
                      : ''}
                  </span>
                  <div className="card-actions">
                    <Link href="/panier">
                      <button className="btn btn-primary btn-block">
                        Voir mon panier
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar flex flex-col justify-center"
              >
                <i className="fas fa-circle-user text-2xl"></i>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm border border-gray-300 dropdown-content mt-6 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {isLoggedIn && user ? (
                  <>
                    <li>
                      <Link href="/moncompte">Mon compte</Link>
                    </li>
                    <li>
                      <Link href="/mescommandes">Commandes</Link>
                    </li>
                    {user && user.role === 'admin' && (
                      <li>
                        <Link href="/dashboard">Tableau de bord</Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleClickForLogout}>
                        <Link href="/">Se déconnecter</Link>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/connexion" className="hover:text-gray-400">
                        Connexion
                      </Link>
                    </li>
                    <li>
                      <Link href="/inscription" className="hover:text-gray-400">
                        Inscription
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
