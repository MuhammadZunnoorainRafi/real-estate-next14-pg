import { useGetUserServer } from '@/lib/hooks/getUserServer';
import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Pagination,
} from '@nextui-org/react';
import Link from 'next/link';
import UserDropDown from './UserDropDown';

async function Header() {
  const user = await useGetUserServer();
  return (
    <Navbar className="bg-slate-950">
      <NavbarBrand as={Link} href="/">
        <RectangleGroupIcon className="h-7 w-7 mr-2" />
        <p className="font-bold text-inherit">Estate</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/add">
            Add Property
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {user ? (
            <UserDropDown user={user} />
          ) : (
            <Button as={Link} color="primary" href="/auth/login" variant="flat">
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
