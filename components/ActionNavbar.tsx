import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import Logo from "./logo";

export default function ActionNavbar() {
  const router = useRouter();
  return (
    <div className="z-[1000] w-full fixed bg-white border-b border-gray-200">
      <div className="px-3 py-3 mx-auto flex max-w-5xl items-center justify-between w-full">
        <div className="flex items-center">
          <Link href={`/`}>
            <a className="mr-3">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              router.back();
            }}
            className="border-red-300 bg-red-50"
            small
            rounded
            normal
          >
            <span className="text-red-400">Cancel</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
