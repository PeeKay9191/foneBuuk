import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Mail, Phone, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import DeleteContact from "./delete_contact";

type Props = {
  contact: {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
  };
};

export default function CardComponent({ contact }: Props) {
  return (
    <Card className="2xl:w-[400px]">
      <CardHeader>
        <div className="flex items-center gap-x-4">
          <div className="w-14 h-14 rounded-full">
            <Image
              src={`https://api.dicebear.com/7.x/initials/jpg?seed=${contact.full_name}`}
              alt={contact.full_name}
              width={2000}
              height={2000}
              className="object-cover object-center rounded-full"
            />
          </div>
          <div>
            <CardTitle>{contact.full_name}</CardTitle>
            <CardDescription>{contact.address}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center  gap-x-2">
          <Mail className="text-gray-600" />
          <a href={`mailto:${contact.email}`} className="text-gray-600">
            {contact.email}
          </a>
        </div>
        <div className="flex items-center  gap-x-2">
          <Phone className="text-gray-600" />
          <span className="text-gray-600">{contact.phone_number}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-x-3">
        {/* Edit Icon & Delete */}
        <Link href={`/dashboard/edit/${contact.id}`}>
          <Edit className="text-gray-600 hover:text-gray-400 cursor-pointer" />
        </Link>
        <DeleteContact id={contact.id} />
      </CardFooter>
    </Card>
  );
}
