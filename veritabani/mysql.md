# MySQL

**MYSQL**, bir ilişkisel veritabanı yönetim sistemidir. MySQL yönetimi için kullanacağımız kütüphanenin adı **Go-MySQL-Driver**. Kütüphanemizi aşağıdaki gibi komut satırına yazarak indirelim.

> go get -u github.com/go-sql-driver/mysql

MySQL paketlerimizi import edelim.

```go
import "database/sql"
import _ "go-sql-driver/mysql"
```

**MySQL Bağlantısını Yapma**\
Daha sonra **main()** fonksiyonumuz içerisinde MySQL bağlantımızı yapalım.

```go
package main
import "database/sql"
import _ "go-sql-driver/mysql"
func main(){
	db, err := sql.Open("mysql", "kullanici:sifre@(127.0.0.1:3306)/vtismi?parseTime=true")
	err := db.Ping()
}
```

**db** adındaki fonksiyonel değişkenimize MySQL veritabanı bağlantı bilgilerimizi girdik. **kullanici** yeri MySQL kullanıcı adınızı, **sifre** yerine MySQL şifrenizi, **127.0.0.1:3306** yerine MySQL sunucunuzu e **vtismi** yerine de Veritabanı isminizi yazmayı unutmayın.\
Daha sonra veritabanı bağlantı bilgilerimizi doğrulanmak için **db.Ping()** fonksiyonu ile bağlantı denemesi yolluyoruz. Bir hata ile karşılaşıldığında **err** değişkeninin içine hata çıktısını kaydedecektir.\
Kolaylık olsun diye **main()** fonksiyonu dışına hata çıktılarını kontrol eden bir fonksiyon yazalım.

```go
func kontrol(hata error){
    if hata != nil{
        log.Fatal(hata)
    }
}
```

Eğer hata çıktısı almak istemiyorsanız. **err** değişkeni yerine** \_ (alt tire)** koyabilirsiniz. Aynen şu şekilde:

```go
db, _ := sql.Open("mysql", "kullanici:sifre@(127.0.0.1:3306)/vtismi?parseTime=true")
```

**İlk Tabloyu Oluşturma**\
Tablomuz şu şekilde olacak;\


| id | kullanici | sifre | tarih               |
| -- | --------- | ----- | ------------------- |
| 1  | kaan      | 1234  | 2019-08-10 12:30:00 |

Böyle bir tablo yapısını oluşturmak için aşağıdaki sorguyu çalıştırmamız gerekir.

```sql
CREATE TABLE kullanicilar (
    id INT AUTO_INCREMENT,
    kullanici TEXT NOT NULL,
    sifre TEXT NOT NULL,
    tarih DATETIME,
    PRIMARY KEY (id)
);
```

Bu sorguyu Golang tarafında yapmak istersek aşağıdaki gibi yazabiliriz.

```go
sorgu := `
    CREATE TABLE kullanicilar (
        id INT AUTO_INCREMENT,
        kullanici TEXT NOT NULL,
        şifre TEXT NOT NULL,
        tarih DATETIME,
        PRIMARY KEY (id)
    );`
//Sorguyu çalıştırma
_, err := db.Exec(sorgu)
```

Bu işlemle birlikte MySQL veritabanımızda **kullanicilar** adında bir tablomuz oluşacaktır.\
**Tabloya Veri Girme**

```go
kullaniciDegeri := "johndoe"
sifreDegeri := "secret"
tarihDegeri := time.Now()
sonuc, err := db.Exec(`INSERT INTO kullanicilar (kullanici, sifre, tarih) VALUES (?, ?, ?)`, kullaniciDegeri, sifreDegeri, tarihDegeri)
kullaniciID, err := sonuc.LastInsertId()
fmt.Println("Eklenen kullanıcının id'si:", kullaniciID)
```

**Tabloya Sorgu Yapma**

```go
//Tabloyu sorgulayıp sonuçları değişkenlere yazdıralım
sorgu:= `SELECT id, kullanici, sifre, tarih FROM kullanicilar WHERE id = ?`
err := db.QueryRow(sorgu, sorguid).Scan(&id, &kullanici, &sifre, &tarih)
//Çıkan aldığımız verileri ekrana bastıralım
fmt.Println(id, kulanici, sifre, tarih)
```

**Tablodaki Tüm Verileri Sıralama**

```go
var (
    id int
    kullanici string
    sifre string
    tarih time.Time
)
tablo, _ := db.Query(`SELECT id, kullanici, sifre, tarih FROM kullanicilar`)
defer tablo.Close() //tabloyu kapamayı unutmuyoruz
for tablo.Next() {
    err := tablo.Scan(&id, &kullanici, &sifre, &tarih)
    kontrol(err)
    fmt.Println(id, kullanici, sifre, tarih) //kullaniciyi ekrana bastır
}
err := tablo.Err()
kontrol(err)
```

Eğer tablodaki verileri ekrana bastırmak yerine bir **diziye** (array) kaydetmek istiyorsak aşağıdaki gibi yapabiliriz.

```go
type kullanici struct {
    id        int
    kullanici  string
    sifre  string
    tarih time.Time
}
tablo, _ := db.Query(`SELECT id, kullanici, sifre, tarih FROM kullanicilar`)
defer rows.Close()
var kullanicilar []kullanici
for tablo.Next() {
    var k kullanici
    err := tablo.Scan(&k.id, &k.kullanici, &k.sifre, &k.tarih)
    kontrol(err)
    kullanicilar = append(kullanicilar, k)
}
err := tablo.Err()
kontrol(err)
```

Bu işlemin sonucunda kullanicilar dizimiz şu şekilde olacaktır.

```jsx
kullanicilar {
    kullanici {
        id:        1,
        kullanici:  "ahmet",
        sifre:  "1234",
        tarih: time.Time{wall: 0x0, ext: 63701044325, loc: (*time.Location)(nil)},
    },
    kullanici {
        id:        2,
        kullanici:  "mehmet",
        sifre:  "5678",
        tarih: time.Time{wall: 0x0, ext: 63701044622, loc: (*time.Location)(nil)},
    },
}
```

**Tablodan Satır Silme**

```go
silineceksatir := 1
_, err := vt.Exec(`DELETE FROM kullanicilar WHERE id = ?`, silineceksatir)
kontrol(err)
```

Gördüğünüz gibi basit bir şekilde MySQL paketi ile veritabanı yönetimi yapabiliyoruz.\
**Hepsi Bir Arada**

```go
package main
import (
	"database/sql"
	"fmt"
	"log"
	"time"
	_ "github.com/go-sql-driver/mysql"
)
func kontrol(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
func main() {
	vt, err := sql.Open("mysql", "kullanici:sifre@(127.0.0.1:3306)/vtismi?parseTime=true")
	if err := db.Ping(); err != nil {
		kontrol(err)
	}
	{ // Yeni tablo oluştur
		sorgu := `
            CREATE TABLE kullanicilar (
                id INT AUTO_INCREMENT,
                kullanici TEXT NOT NULL,
                sifre TEXT NOT NULL,
                tarih DATETIME,
                PRIMARY KEY (id)
            );`
		_, err := db.Exec(sorgu)
		kontrol(err)
	}
	{ // Yeni kayıt ekle
		kullanici := "kaan"
		sifre := "1234"
		tarih := time.Now()
		sonuc, err := db.Exec(`INSERT INTO kullanicilar (kullanici, sifre, tarih) VALUES (?, ?, ?)`, username, password, createdAt)
		kontrol(err)
		eklenenid, err := sonuc.LastInsertId()
		fmt.Println(eklenenid)
	}
	{ //  İstenilen kaydı sorgulama
		var (
			id        int
			kullanici string
			sifre     string
			tarih     time.Time
			sorguid   int = 1
		)
		sorgu := "SELECT id, kullanici, sifre, tarih FROM kullanici WHERE id = ?"
		err := vt.QueryRow(sorgu, sorguid).Scan(&id, &kullanici, &sifre, &tarih)
		kontrol(err)
		fmt.Println(id, kullanici, sifre, tarih)
	}
	{ // Tün kayıtları sorgula
		type kullanici struct {
			id        int
			kullanici string
			sifre     string
			tarih     time.Time
		}
		tablo, err := vt.Query(`SELECT id, kullanici, sifre, tarih FROM kullanicilar`)
		kontrol(err)
		defer tablo.Close()
		var kullanicilar []kullanici
		for tablo.Next() {
			var k kullanici
			err := tablo.Scan(&k.id, &k.kullanici, &k.sifre, &k.tarih)
			kontrol(err)
			kullanici = append(kullanicilar, k)
		}
		err := rows.Err()
		kontrol(err)
		fmt.Printf("%#v", kullanicilar)
	}
	//Kayıt Sil
	{
		silinecekid := 1
		_, err := vt.Exec(`DELETE FROM kullanicilar WHERE id = ?`, silinecekid)
		kontrol(err)
	}
}
```
