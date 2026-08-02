"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./button";

interface PaginationProps {
  readonly onPageChange: (page: number) => void;
  readonly page: number;
  readonly totalPages: number;
}

export function Pagination({
  onPageChange,
  page,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 0) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Orders pagination" className="flex items-center gap-1">
      <Button
        variant="secondary"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </Button>
      {pages.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={pageNumber === page ? "primary" : "ghost"}
          size="icon"
          aria-label={`Page ${pageNumber}`}
          aria-current={pageNumber === page ? "page" : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant="secondary"
        size="icon"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight aria-hidden="true" className="size-4" />
      </Button>
    </nav>
  );
}
