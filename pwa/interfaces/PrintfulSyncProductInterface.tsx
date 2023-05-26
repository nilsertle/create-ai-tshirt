export interface PrintfulSyncProductInterface {
  sync_product: {
    name: string;
    thumbnail: string;
  };
  sync_variants: {
    retail_price: string;
    variant_id: number;
    files: {
      url: string;
      type?: string;
    }[];
  }[];
}
