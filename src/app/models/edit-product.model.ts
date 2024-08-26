export interface Product {
  _id: string;
  Urunler_Adi: string;
  Urunler_Aciklama: string;
  Urunler_Fiyat: number;
  Stok_Adet: string;
  Kategori_id: Category;
  IndirimOrani: number;
  Resim_URL: string;
}

export interface Category {
  _id: string;
  Kategori_Adi: string;
  UstKategori_id: string;
}
