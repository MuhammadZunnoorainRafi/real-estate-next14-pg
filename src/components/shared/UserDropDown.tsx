'use client';
import { logoutUser } from '@/actions/auth/logout-user';
import {
  Avatar,
  AvatarIcon,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { User } from 'next-auth';
import React from 'react';

function UserDropDown({ user }: { user: User }) {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger className="hover:cursor-pointer">
        <Avatar
          icon={<AvatarIcon />}
          classNames={{
            base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
            icon: 'text-black/80',
          }}
        />
      </DropdownTrigger>
      <DropdownMenu disabledKeys={['new', 'copy']} aria-label="Static Actions">
        <DropdownItem key="new">{user.name}</DropdownItem>
        <DropdownItem key="copy">{user.email}</DropdownItem>
        <DropdownItem
          key="delete"
          onClick={async () => await logoutUser()}
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserDropDown;
