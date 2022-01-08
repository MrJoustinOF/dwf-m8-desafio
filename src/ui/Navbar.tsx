import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "./../utils/atoms";

export const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const { loged, user }: any = auth;
  const { email } = user;

  const handleNav = () => {
    const responsiveNav = document.querySelector(".responsiveNav");
    responsiveNav?.classList.toggle("hidden");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");

    setAuth({
      loged: false,
      user: {},
    });
  };

  return (
    <div className="bg-main flex justify-between items-center p-3">
      <Link to="/">
        <img
          src="./img/pawprint.png"
          alt="pawprint-icon"
          className="cursor-pointer"
        />
      </Link>

      {loged ? (
        <>
          <div className="dropdown hidden md:inline-block relative">
            <button className="bg-main font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1">{email}</span>
              <svg
                className="fill-current h-4 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-2 ">
              <li>
                <Link to="me">
                  <p className="meButton cursor-pointer rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                    Mis datos
                  </p>
                </Link>
              </li>
              <li>
                <Link to="mypets">
                  <p className="myPetsButton cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                    Mis mascotas reportadas
                  </p>
                </Link>
              </li>
              <li>
                <Link to="reportpet">
                  <p className="reportPetButton cursor-pointer rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                    Reportar mascota
                  </p>
                </Link>
              </li>
              <li>
                <p
                  onClick={handleLogOut}
                  className="logOutButton cursor-pointer rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  Cerrar sesion
                </p>
              </li>
            </ul>
          </div>

          <img
            src="./img/burguerbtn.png"
            alt="burguer btn"
            className="btnMenu inline-block md:hidden cursor-pointer"
            onClick={handleNav}
          />

          <div className="responsiveNav hidden">
            <div className="grid grid-rows-2 bg-second fixed top-0 left-0 right-0 h-screen">
              <div className="flex items-end justify-center text-center font-semibold">
                <ul>
                  <li>
                    <Link to="me" onClick={handleNav}>
                      <p className="my-2 cursor-pointer">Mis datos</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="mypets" onClick={handleNav}>
                      <p className="my-2 cursor-pointer">
                        Mis mascotas reportadas
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="reportpet" onClick={handleNav}>
                      <p className="my-2 cursor-pointer">Reportar mascota</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center text-center">
                <div>
                  <h3 className="text-xl">{email}</h3>
                  <p
                    onClick={handleLogOut}
                    className="cursor-pointer uppercase text-main underline text-sm"
                  >
                    Cerrar sesion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Link to="signin">
          <p className="cursor-pointer">Acceder</p>
        </Link>
      )}
    </div>
  );
};
