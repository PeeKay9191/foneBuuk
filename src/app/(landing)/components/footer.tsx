import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="text-center justify-center flex items-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} All rights reserved. FoneBuuk
      </p>
    </footer>
  );
}
