"use client";
import { useAuth } from "@/contexts/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect } from "react";

const ProfilePanelClient = () => {
  const { user, checkUser } = useAuth();
  useEffect(() => {
    checkUser();
  }, []);
  if (!user) return <p>loading</p>;
  return (
    <div className="flex">
      {user.image ? (
        <Image
          src={user.image}
          alt="profile image"
          height="80"
          width="80"
          className="rounded-full"
        />
      ) : (
        <UserCircleIcon className="h-6 w-6" />
      )}
      <h1 className="text-2xl ml-3">{user.name}</h1>
    </div>
  );
};

export default ProfilePanelClient;
