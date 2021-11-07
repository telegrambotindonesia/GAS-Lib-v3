## Urutan Deploy

### 1. Version

- Ganti `const active`
- Ganti nomor versinya, `lumpia` dan `bapia`

### 2. Config

Pada `.clasp.json` jangan sampai ketukar

- Sesuikan `scriptId` lumpia / bapia

### 3. Docs

Pada folder `/docs`

- Sesuaikan dokumentasi bapia / lumpia

### 4. Readme

sesuikan versi nya

### 5. Clasp

- Cek: `clasp versions`
- Push: `clasp push`
- Release: `clasp version 'komentar'`

### Dev / Main

Setelah selesai, jangan lupa pindah ke posisi branch `dev`

    git checkout dev

### Release

pada github, buat release dan history log