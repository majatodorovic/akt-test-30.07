"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const GenerateBreadCrumbsServer = ({ crumbs }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
};

export default GenerateBreadCrumbsServer;
