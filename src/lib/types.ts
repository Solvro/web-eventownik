export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blocks: {
        Row: {
          blockId: string
          capacity: number | null
          createdAt: string
          eventId: string
          name: string
          parentBlockId: string | null
          updatedAt: string
        }
        Insert: {
          blockId?: string
          capacity?: number | null
          createdAt?: string
          eventId: string
          name: string
          parentBlockId?: string | null
          updatedAt?: string
        }
        Update: {
          blockId?: string
          capacity?: number | null
          createdAt?: string
          eventId?: string
          name?: string
          parentBlockId?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blocks_EventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["eventId"]
          },
          {
            foreignKeyName: "Blocks_ParentBlockId_fkey"
            columns: ["parentBlockId"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["blockId"]
          },
        ]
      }
      events: {
        Row: {
          createdAt: string
          description: string | null
          eventDate: string | null
          eventId: string
          name: string
          organizerName: string
          ownersSlug: string
          updatedAt: string | null
          usersSlug: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          eventDate?: string | null
          eventId?: string
          name: string
          organizerName: string
          ownersSlug: string
          updatedAt?: string | null
          usersSlug: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          eventDate?: string | null
          eventId?: string
          name?: string
          organizerName?: string
          ownersSlug?: string
          updatedAt?: string | null
          usersSlug?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          blockId: string
          createdAt: string
          firstName: string
          lastName: string
          order: number
          reservationId: string
          updatedAt: string
        }
        Insert: {
          blockId: string
          createdAt?: string
          firstName: string
          lastName: string
          order: number
          reservationId?: string
          updatedAt?: string
        }
        Update: {
          blockId?: string
          createdAt?: string
          firstName?: string
          lastName?: string
          order?: number
          reservationId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Reservations_BlockId_fkey"
            columns: ["blockId"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["blockId"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never
