import React from "react";
import { router } from "@inertiajs/react";

interface LinkPage {
  label: string; // page number or "..."
  url: string | null;
  active: boolean;
  disabled?: boolean;
}

interface Pagination<T> {
  current_page: number;
  last_page: number;
  path: string;
  data: T[];
}

interface Props<T> {
  pagination: Pagination<T>;
}

export default function PaginationComponent<T>({ pagination }: Props<T>) {
  const { current_page, last_page, path } = pagination;

  // Fonction pour générer les pages avec ellipses
  const generatePages = (): LinkPage[] => {
    const pages: LinkPage[] = [];

    // Helper pour créer un lien de page
    const createPage = (page: number): LinkPage => ({
      label: page.toString(),
      url: `${path}?page=${page}`,
      active: page === current_page,
    });

    if (last_page <= 7) {
      // Affiche toutes les pages si petit nombre
      for (let i = 1; i <= last_page; i++) {
        pages.push(createPage(i));
      }
    } else {
      // Toujours afficher 1 et last_page
      pages.push(createPage(1));

      if (current_page > 4) {
        pages.push({ label: "...", url: null, active: false, disabled: true });
      }

      // Afficher 2 pages avant et après la page courante
      const start = Math.max(2, current_page - 2);
      const end = Math.min(last_page - 1, current_page + 2);

      for (let i = start; i <= end; i++) {
        pages.push(createPage(i));
      }

      if (current_page < last_page - 3) {
        pages.push({ label: "...", url: null, active: false, disabled: true });
      }

      pages.push(createPage(last_page));
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center gap-2">
      {/* Bouton Prev */}
      <button
        onClick={() => current_page > 1 && router.visit(`${path}?page=${current_page - 1}`, { preserveScroll: true })}
        disabled={current_page === 1}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((page, idx) =>
        page.disabled ? (
          <span key={idx} className="px-3 py-1 rounded cursor-default">
            {page.label}
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => router.visit(page.url!, { preserveScroll: true })}
            disabled={page.active}
            className={`px-3 py-1 rounded ${
              page.active ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page.label}
          </button>
        )
      )}

      {/* Bouton Next */}
      <button
        onClick={() => current_page < last_page && router.visit(`${path}?page=${current_page + 1}`, { preserveScroll: true })}
        disabled={current_page === last_page}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
