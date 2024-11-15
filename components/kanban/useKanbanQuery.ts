import type { ICard } from "./kanban.types";

import { useQuery } from "@tanstack/vue-query";
import { KANBAN_DATA } from "./kanban.data";
import { DB_ID, COLLECTIONS_DEALS } from "~~/utils/app.constants";
import type { IDeal } from "~~/types/deals.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTIONS_DEALS),
    select(data) {
      const newBoard = [...KANBAN_DATA];
      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);

        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.customer.name,
            status: deal.status,
          });
        }
      }
      console.log(newBoard);
      return newBoard;
    },
  });
}
