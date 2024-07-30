"use client";
import React, { useEffect, useState } from "react";
import AddContacts from "./add_contacts";
import Card from "./card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/supabase";

interface Contacts {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
}

type Props = {
  user: string;
  contacts: Contacts[];
};

export default function DashboardView({ user, contacts }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;

  // Calculate the contacts to display
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Calculate total pages
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const handleClick = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const channels = db
      .channel("REALTIME_CONTACTS")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contacts" },
        (payload) => {
          if (payload) {
            console.log("Change received!", payload);
            window.location.reload();
          }
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-semibold md:text-2xl">Hello, {user}👋</h1>
        <h1 className="text-base text-gray-500 font-neutral">
          Below are your contacts lists.
        </h1>
      </div>
      {contacts.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center gap-4">
            {currentContacts.map((contact) => (
              <Card key={contact.id} contact={contact} />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <button
                  disabled={currentPage === 1}
                  className={`flex items-center gap-x-1 hover:bg-gray-200 rounded-lg py-2 px-2 cursor-pointer ${
                    currentPage === 1 && "text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => handleClick(currentPage - 1)}
                >
                  <ChevronLeft
                    size={20}
                    className={`text-gray-600 ${
                      currentPage === 1 && "text-gray-500 cursor-not-allowed"
                    }`}
                  />
                  <span>Previous</span>
                </button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => handleClick(1)}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem></PaginationItem>
              <PaginationItem>
                <div>
                  <button
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-x-1 hover:bg-gray-200 rounded-lg py-2 px-2 cursor-pointer ${
                      currentPage === totalPages &&
                      "text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={() => handleClick(currentPage + 1)}
                  >
                    <span>Next</span>
                    <ChevronRight
                      size={20}
                      className={`text-gray-600 ${
                        currentPage === 1 && "text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </button>
                </div>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no contacts at the moment
            </h3>
            <p className="text-md text-muted-foreground">
              KIndly add a contact to your lists to get started
            </p>
            <AddContacts />
          </div>
        </div>
      )}
    </>
  );
}
