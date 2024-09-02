export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      blocks: {
        Row: {
          blockId: string;
          capacity: number | null;
          createdAt: string;
          eventId: string;
          name: string;
          parentBlockId: string | null;
          updatedAt: string;
        };
        Insert: {
          blockId?: string;
          capacity?: number | null;
          createdAt?: string;
          eventId: string;
          name: string;
          parentBlockId?: string | null;
          updatedAt?: string;
        };
        Update: {
          blockId?: string;
          capacity?: number | null;
          createdAt?: string;
          eventId?: string;
          name?: string;
          parentBlockId?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Blocks_EventId_fkey";
            columns: ["eventId"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["eventId"];
          },
          {
            foreignKeyName: "Blocks_ParentBlockId_fkey";
            columns: ["parentBlockId"];
            isOneToOne: false;
            referencedRelation: "blocks";
            referencedColumns: ["blockId"];
          },
        ];
      };
      events: {
        Row: {
          closingRegistrationAt: string | null;
          content: Json | null;
          createdAt: string;
          description: string | null;
          displayOnEverySection: boolean | null;
          eventDate: string | null;
          eventId: string;
          name: string;
          openingRegistrationAt: string | null;
          organizerName: string;
          ownersSlug: string;
          ownerUUID: string | null;
          participantsSlug: string;
          updatedAt: string | null;
        };
        Insert: {
          closingRegistrationAt?: string | null;
          content?: Json | null;
          createdAt?: string;
          description?: string | null;
          displayOnEverySection?: boolean | null;
          eventDate?: string | null;
          eventId?: string;
          name: string;
          openingRegistrationAt?: string | null;
          organizerName: string;
          ownersSlug: string;
          ownerUUID?: string | null;
          participantsSlug: string;
          updatedAt?: string | null;
        };
        Update: {
          closingRegistrationAt?: string | null;
          content?: Json | null;
          createdAt?: string;
          description?: string | null;
          displayOnEverySection?: boolean | null;
          eventDate?: string | null;
          eventId?: string;
          name?: string;
          openingRegistrationAt?: string | null;
          organizerName?: string;
          ownersSlug?: string;
          ownerUUID?: string | null;
          participantsSlug?: string;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "events_ownerUUID_fkey";
            columns: ["ownerUUID"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      reservations: {
        Row: {
          blockId: string;
          createdAt: string;
          firstName: string;
          lastName: string;
          order: number;
          reservationId: string;
          updatedAt: string;
        };
        Insert: {
          blockId: string;
          createdAt?: string;
          firstName: string;
          lastName: string;
          order: number;
          reservationId?: string;
          updatedAt?: string;
        };
        Update: {
          blockId?: string;
          createdAt?: string;
          firstName?: string;
          lastName?: string;
          order?: number;
          reservationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Reservations_BlockId_fkey";
            columns: ["blockId"];
            isOneToOne: false;
            referencedRelation: "blocks";
            referencedColumns: ["blockId"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_unique_slug: {
        Args: {
          event_name: string;
        };
        Returns: string;
      };
      get_section_data: {
        Args: {
          section_uuid: string;
        };
        Returns: {
          lp: number;
          imie: string;
          nazwisko: string;
          data_dodania: string;
          sekcja_koncowa: string;
          drzewko_sekcji: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
