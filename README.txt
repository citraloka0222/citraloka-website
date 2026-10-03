================================================================
  CITRALOKA WEBSITE
  Karya Tradisi, Sentuhan Masa Kini
  Versi: v2.3  |  Dikemas kini: 3 Oktober 2026
================================================================

Website katalog beg tangan anyaman buatan tangan CITRALOKA,
Kota Marudu, Sabah. Website satu halaman (single page),
dwibahasa (BM / EN), pesanan melalui WhatsApp.


----------------------------------------------------------------
1. STRUKTUR FAIL
----------------------------------------------------------------

  index.html    Kandungan & struktur halaman (semua produk di sini)
  style.css     Reka bentuk, warna, layout & responsive
  script.js     Fungsi interaktif (bahasa, menu, filter, animasi)
  README.txt    Fail ini
  images/       Semua gambar (sedia ada dalam repository GitHub)

  Nota: Nama fail utama ialah "index.html" (bukan "index (1).html").
  Pastikan fail lama digantikan dalam repository.


----------------------------------------------------------------
2. GAMBAR YANG DIPERLUKAN (folder images/)
----------------------------------------------------------------

  Umum      : title.jpg, cover-photo.jpg, logo-citraloka.jpg,
              profile amirah alisha.jpg
  Ikon      : icon-1.jpg, icon-2.jpg, icon-3.jpg, icon-4.jpg,
              icon-6.jpg, icon-7.jpg, icon-hand.jpg,
              icon-material.jpg, icon-sabah.jpg, icon-value.jpg
  Sosial    : logo-ws.jpg, logo-insta.jpg, logo-tiktok.jpg,
              logo-fb.jpg
  Produk    : randavi.png, sumuni-1.jpg, sumuni-2.jpg,
              sumuni-3.jpg, sumuni-4.jpg, sumuni-5.png,
              sumuni-6.jpg, sumuni-7.png, sumuni-8.jpg,
              nginolitan-1.png, nginolitan-2.jpg, nginolitan-3.jpg,
              nginolitan-6.jpg, nginolitan-7.jpg, nginolitan-8.jpg,
              nginolitan-8.png, badu-sipak.png, olos-1.jpg,
              sinipak-1.jpg, sinipak-2.jpg, sinuangga-1.jpg,
              sinuangga-2.jpg, sukob-beg.jpg, kubamban.png,
              kedayan.jpg, orikos-1.jpg, orikos-2.jpg, orikos-3.jpg

  PENTING: Nama fail sensitif huruf besar/kecil & sambungan
  (.jpg / .png). Nama mesti sama tepat dengan dalam kod.


----------------------------------------------------------------
3. SUSUNAN HALAMAN
----------------------------------------------------------------

  1. Header      Logo, menu, butang ENG/BM, butang WhatsApp
                 (menu hamburger di mobile)
  2. Hero        Cover photo di belakang tagline (bahagian tengah
                 gambar), butang CTA & statistik
  3. Keistimewaan  "Kenapa Pilih Produk Ini" (4 kad; ikon & subtajuk
                   di tengah, teks penerangan rata kiri)
  4. Koleksi     Menu filter melekat (sticky) + kad produk
                 Desktop: grid  |  Mobile: leret (carousel)
  5. Cara Tempahan  4 langkah + Kaedah Penghantaran
  6. Tentang Kami   Jenama & pengasas
  7. Hubungi Kami   WhatsApp, Instagram, TikTok, Facebook
  8. Footer      ID Lesen Perniagaan & hak cipta
  +  Butang WhatsApp terapung (muncul selepas scroll)


----------------------------------------------------------------
4. CARA TAMBAH PRODUK BARU
----------------------------------------------------------------

  1. Buka index.html, cari bahagian  id="productGrid"
  2. Salin SATU blok penuh:
       <article class="product-card reveal" data-cat="...">
         ...
       </article>
  3. Tampal di tempat yang dikehendaki, kemudian tukar:

     data-cat     Kategori filter (pilih satu):
                    rungus | bajau-samah | kadazan-dusun |
                    kedayan | wristlet-pouch
     <img src>    Laluan gambar, contoh: images/nama-baru.jpg
     alt          Nama produk (untuk SEO & aksesibiliti)
     pc-badge     Standard / Mini / Limited Edition
                  (Limited Edition guna class "pc-badge is-limited")
     pc-name      Nama produk
     pc-code      Kod corak, contoh: RGS01
     Motif        Nama motif
     Saiz         Contoh: P:22cm x L:9cm x T:22cm
     Warna        Isi kedua-dua <span class="ms"> dan <span class="en">
     --sw         Warna bulatan swatch (lihat Seksyen 5)
     Link WA      Tukar nama produk & kod dalam teks mesej

  4. Simpan. Jumlah produk (statistik hero & nombor pada butang
     filter) akan dikira AUTOMATIK. Tak perlu ubah nombor.

  Untuk sembunyikan produk tanpa padam, balut blok dengan:
     <!--  ...blok article...  -->


----------------------------------------------------------------
5. KOD WARNA SWATCH (--sw)
----------------------------------------------------------------

  Hitam           #141414
  Putih           #f3f1ec
  Light Pink      #f2c4c8
  Lilac           #c9a7d6
  Purple          #6c3f9e
  Aprikot         #f6c7a4
  Coffee          #6f4e37
  Kuning Mustard  #d9a521

  Contoh:  <i class="swatch" style="--sw:#141414"></i>


----------------------------------------------------------------
6. TEKS DWIBAHASA (BM / EN)
----------------------------------------------------------------

  Setiap teks ditulis dua kali:
     <span class="ms">Teks Bahasa Melayu</span>
     <span class="en">English Text</span>

  Butang ENG/BM menukar bahasa. Pilihan pengguna diingat oleh
  pelayar (browser) untuk lawatan seterusnya.


----------------------------------------------------------------
7. WHATSAPP
----------------------------------------------------------------

  Nombor semasa: 60192595039
  Format link:
     https://wa.me/60192595039?text=Mesej%20anda
  (Guna %20 untuk ruang kosong.)

  Jika nombor bertukar, guna "Find & Replace" dalam index.html
  untuk tukar SEMUA "60192595039" sekaligus.


----------------------------------------------------------------
8. DESIGN SYSTEM (style.css, bahagian :root)
----------------------------------------------------------------

  Latar       #0b0907 / #120f0b / #17130e (hitam hangat)
  Emas        #d4af37  (gradient #f6e09c -> #d4af37 -> #a8822c)
  Teks        #f4efe6  |  Teks lembut #b3a998
  Font        Playfair Display (tajuk), Inter (teks)
  Identiti    Tekstur kekisi anyaman + ornamen berlian emas
              pada garisan pemisah seksyen

  Tukar warna di :root untuk ubah seluruh website sekaligus.


----------------------------------------------------------------
9. PANDUAN TETAP (jangan ubah tanpa keputusan baru)
----------------------------------------------------------------

  - Cover photo di belakang tagline (desktop & mobile),
    guna bahagian tengah gambar, dengan overlay gelap.
  - Menu filter koleksi sentiasa kelihatan (sticky) semasa
    scroll senarai produk.
  - Kenapa Pilih Produk Ini: ikon & subtajuk di tengah,
    teks penerangan kekal rata kiri.
  - Semua gambar & ikon dari folder images/ dalam repository.


----------------------------------------------------------------
10. CARA UJI / LANCAR
----------------------------------------------------------------

  Uji di komputer : Buka index.html terus dalam pelayar
                    (pastikan folder images/ berada sebelah).
  Lancar          : Upload index.html, style.css, script.js
                    ke repository GitHub (ganti fail lama).
  Semak selepas lancar:
    [ ] Semua gambar keluar
    [ ] Butang ENG/BM berfungsi
    [ ] Filter koleksi & menu melekat berfungsi
    [ ] Link WhatsApp buka mesej yang betul
    [ ] Paparan mobile (menu hamburger & leret produk)


----------------------------------------------------------------
11. LOG PERUBAHAN
----------------------------------------------------------------

  v2.3  - Kenapa Pilih Produk Ini: ikon & subtajuk dipindah ke
          alignment tengah (desktop & mobile).

  v2.2  - Cover photo dipindah ke belakang tagline (desktop &
          mobile), guna bahagian tengah gambar.

  v2.1  - Menu filter koleksi melekat (sticky) semasa scroll.
        - KDN02: motif dibetulkan kepada "Kedayan".
        - Olos Berangkit: ejaan dalam mesej WhatsApp dibetulkan.
        - RGS04 Coffee: "Nginolitan Beg" -> "Nginolitan".
        - Pembetulan menu aktif & ruang tepi carousel mobile.

  v2.0  - Redevelopment penuh: tema gelap & emas, hero baharu,
          kad produk moden, filter koleksi, menu mobile,
          butang WhatsApp terapung, animasi scroll.
        - Ingatan pilihan bahasa, SEO meta & aksesibiliti.

  Produk disembunyikan (dalam komen kod):
    - Nginolitan (Standard) RGS03 Hitam  - nginolitan-4.png
    - Nginolitan (Standard) RGS02 Putih  - nginolitan-5.jpg


----------------------------------------------------------------
  (c) 2026 CITRALOKA. Hak Cipta Terpelihara.
  ID Lesen Perniagaan: KM/2026/6129
================================================================
