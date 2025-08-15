import { router } from "@inertiajs/react";
import React from "react";

// Définition du type pour un lien de pagination
interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

// Définition du type pour la pagination générique
interface Pagination<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Props du composant
interface Props<T> {
  pagination: Pagination<T>;
}

export default function PaginationSimple<T>({ pagination }: Props<T>) {



  return (
    <div className="flex items-center gap-2">
      {pagination.links.map((link: Link, index: number) => (
        <button
          key={index}
          disabled={!link.url}
          className={`px-3 py-1 rounded ${
            link.active ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            if (link.url) {
              router.visit(link.url, { preserveScroll: true });
            }
          }}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}
