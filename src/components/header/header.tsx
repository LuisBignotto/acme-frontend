import * as React from "react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {
  userLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ userLoggedIn }) => {
  return (
    <header className="h-14 w-full md:h-20 bg-darkblue text-white font-medium flex items-center justify-between px-3 md:px-4 z-40 fixed top-0">
      <Link to="../">
        ACME
      </Link>
      {userLoggedIn ? (
        <nav aria-label="Menu de navegacao" className="flex items-center justify-between gap-2 md:gap-6">
          <NavLink to="../flights">
            Voos
          </NavLink>
          <NavLink to="../baggages">
            Bagagens
          </NavLink>
          <NavLink to="../users">
            Usuários
          </NavLink>
        </nav>
      ) : (<></>)
      }

      {userLoggedIn ? (
        <Link to="../">
          <Button>Configurações</Button>
        </Link>
      ) : (
        <Link to="../">
          <Button>Entrar</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
