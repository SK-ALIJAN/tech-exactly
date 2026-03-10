
/**
 * Lookup data interface
 */
export interface LookupData {
    id: number;
    lookup_type: string;
    lookup_value: string;
    status: boolean;
    created_at: string;
    created_by: string;
    updated_at?: string;
    updated_by?: string;
    lookup_img?: string[];
}
